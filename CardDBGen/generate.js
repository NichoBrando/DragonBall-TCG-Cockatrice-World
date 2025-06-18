const fetchCardList = require("./fetch");
const download = require("./download");

const generate = async () => {
    const { collectionsToLaunch, cardList } = await fetchCardList();

    console.log(`Total collections to launch: ${collectionsToLaunch.length}`);
    console.log(`Total cards to process: ${cardList.length}`);

    await download(collectionsToLaunch, cardList);

    console.log('All images downloaded successfully.');
}

generate()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.error('Error during generation:', error);
    });