const formatCards = require("./formatCards");

const getCardList = async (collectionName) => {

    const cardList = [];

    let currentResponse = [];
    let currentOffset = 0;

    do {
        const request = await  fetch(
            `https://dbs-deckplanet-api.com/customCardSearch/fw_cards?limit=50&offset=${currentOffset}&search=&filter={%22_and%22:[{},{},{},{},{},{},{%22_or%22:[{%22card_series%22:{%22_contains%22:%22${collectionName}%22}}]},{%22_or%22:[{},{}]},{%22_or%22:[{},{}]},{%22_or%22:[{},{}]},{%22_or%22:[{},{}]},{%22_or%22:[{%22card_color%22:{%22_nempty%22:true}}]},{%22_or%22:[{%22card_front_skill%22:{%22_nempty%22:true}}]},{%22_or%22:[{%22variant_of%22:{%22id%22:{%22_neq%22:null}}},{%22variant_of%22:{%22card_front_name%22:{%22_empty%22:true}}}]}]}&meta=filter_count&sort=relevancy`
        );

        if (!request.ok) {
            throw new Error(`HTTP error! status: ${request.status}`);
        }

        const response = await request.json();

        if (!response?.data) {
            throw new Error('Invalid response data');
        }

        currentResponse = response.data;
        currentOffset += currentResponse.length;
        
        const formattedCards = formatCards(currentResponse);

        if (formattedCards.length) {
            cardList.push(...formattedCards);
        };
    } while (currentResponse.length > 0 && currentResponse.length >= 50);

    return cardList;
};

module.exports = getCardList;