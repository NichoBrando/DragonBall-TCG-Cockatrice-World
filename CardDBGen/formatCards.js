const { convertMdToPlainText } = require("./textConverter");

const cardColor = {
    "Black": "B",
    "Blue": "U",
    "Green": "G",
    "Red": "R",
    "Yellow": "Y"
};

const cardTableRow = {
    "EXTRA": 3,
    "BATTLE": 2,
    "LEADER": 2,
    "ENERGY MARKER": 0
};

const formatName = (name) => {
    return name
        .replaceAll(/\:/g, ' ')
        .replaceAll('?', '')
        .replaceAll('//', ' and ')
        .replaceAll('/', ' and ')
        .replaceAll('  ', ' ')
        .trim();
};

const formatCards = (cards) => {
    const formatedCards = cards.reduce((acc, card) => {
        const versionName = card.card_series;

        const cardNumber = card.card_number;

        const cardType = card.card_type[0] + card.card_type.slice(1).toLowerCase();

        const frontSkill = convertMdToPlainText(card.card_front_skill_unstyled);

        const tableRow = (() => {
            const row = cardTableRow[card.card_type];

            if (row === 3 && frontSkill?.startsWith('[field]'))
            {
                return 2;
            }

            return row;
        })();

        const cardProps = {
            name: formatName(`${cardNumber} ${card.card_front_name}`),
            text: frontSkill,
            prop: {
                side: "front",
                pt: ['BATTLE', 'LEADER'].includes(card.card_type) ? card.card_front_power : undefined,
                maintype: cardType,
                manacost: card.card_energy_cost || 0,
                type: card.card_front_trait,
                colors: card.card_color,
                coloridentity: cardColor[card.card_color],
            },
            set: {
                name: versionName,
                img: `https://dbs-deckplanet.us-southeast-1.linodeobjects.com/deckplanet_card_images/${card.card_number}.png`,
            },
            tablerow: tableRow
        };

        if (card.card_type === "LEADER") {
            return [
                ...acc,   
                {
                    ...cardProps,
                    name: formatName(`${cardNumber} ${card.card_front_name} (Front)`),
                    prop: {
                        ...cardProps.prop,
                        manacost: ""
                    },
                    related: [
                        {
                            attach: 'transform',
                            name: formatName(`${cardNumber} ${card.card_back_name} (Awakened)`),
                        }
                    ]
                },
                {
                    name: formatName(`${cardNumber} ${card.card_back_name} (Awakened)`),
                    text: convertMdToPlainText(card.card_back_skill_unstyled),
                    prop: {
                        side: "back",
                        pt: card.card_back_power,
                        maintype: "Leader",
                        manacost: "",
                        type: card.card_back_trait,
                        colors: card.card_color,
                        coloridentity: cardColor[card.card_color],
                    },
                    set: {
                        name: versionName,
                        img: `https://dbs-deckplanet.us-southeast-1.linodeobjects.com/deckplanet_card_images/${card.card_number}_b.png`,
                    },
                    tablerow: tableRow,
                    related: [
                        {
                            attach: 'transform',
                            name: formatName(`${cardNumber} ${card.card_front_name} (Front)`),
                        }
                    ]
                }
            ];
        }

        return [
            ...acc,
            cardProps
        ];
    }, []);

    return formatCards.map(card => {
        if ((card.text || "").includes('place 1 energy marker'))
        {
            return {
                ...card,
                related: [
                    {
                        name: 'E-01 Energy Marker'
                    },
                    ...(card.related || [])
                ]
            };
        }
        return card;
    })
};

module.exports = formatCards;