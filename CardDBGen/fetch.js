const collectionList = require('./collectionList.json');
const energyMarkerList = require('./energyMarker.json');
const formatMarkers = require('./formatMarker');
const generateXML = require('./generateXML');
const getCardList = require('./getCardList');

const fetchCardList = async () => {
    const cardList = [];
    const collectionsToLaunch = [];

    for (const collection of collectionList) {
        console.log(`Processing collection: ${collection.collectionName}`);
        const collectionCards = await getCardList(collection.collectionCode);

        if (collectionCards.length === 0) {
            console.log(`No cards found for collection: ${collection.collectionName}`);
            continue;
        }

        cardList.push(...collectionCards);

        const uniqueCollectionsSet = new Set(collectionCards.filter(item => {
            return item?.set?.name?.includes('-AA-');
        }).map(cur => cur.set.name));

        const newCollections = Array.from(uniqueCollectionsSet).map(name => ({
            name: name,
            longName: `${collection.collectionName} - (Alternate Art V${name.split('-AA-')[1]})`,
            setType: 'DBSFW',
            releaseDate: collection.releaseDate,
        }));

        collectionsToLaunch.push(...[
            ...newCollections,
            {
                name: collection.collectionCode,
                longName: collection.collectionName,
                setType: 'DBSFW',
                releaseDate: collection.releaseDate,
            }
        ]);
    }

    const energyMarkerCards = formatMarkers(energyMarkerList);

    collectionsToLaunch.push({
        name: "Energy Markers",
        longName: "Energy Markers Collection",
        setType: 'DBSFW',
        releaseDate: '2024-11-08'
    });

    cardList.push(
        ...energyMarkerCards
    );

    await generateXML(collectionsToLaunch, cardList);
    return {
        collectionsToLaunch, 
        cardList
    }
};

module.exports = fetchCardList;