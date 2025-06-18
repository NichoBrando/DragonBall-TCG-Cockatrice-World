const formatMarkers = (cards) => {
    return cards.map(card => {
        return {
            name: `${card.code} Energy Marker`,
            text: `At the start of the game, the player who goes second places 1 Energy Marker in their Energy Area.
Removing 1 Energy Marker from the game is equivalent to switching 1 card from your energy (with the same color as your Leader) to Rest Mode.`,
            prop: {
                side: "front",
                pt: "",
                maintype: "Energy Marker",
                manacost: "",
                type: "",
                colors: "ALL",
                coloridentity: 'ALL',
            },
            set: {
                name: "Energy Markers",
                img: `https://www.dbs-cardgame.com/fw/images/cards/card/en/${card.code}.webp`,
            },
            tablerow: 0
        };
    });
};

module.exports = formatMarkers;