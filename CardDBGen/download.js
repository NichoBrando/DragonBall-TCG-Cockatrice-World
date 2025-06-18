const fs = require('fs');

const download = async (collectionsToLaunch, cardList) => {
    const cardImagesToDownload = cardList.map(card => {
        return {
            name: card.name,
            imageUrl: card.set.img,
            folder: card.set.name,
            isMarker: card.prop.maintype === 'Energy Marker'
        }
    });

    const collectionFolders = collectionsToLaunch.map(collection => collection.name);

    // Create folders for each collection
    for (const folder of collectionFolders) {
        const dir = `./DBSFW Card Images/${folder}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`Created directory: ${dir}`);
        }
    }

    // Download images
    for (const card of cardImagesToDownload) {
        const filePath = `./DBSFW Card Images/${card.folder}/${card.name}.${card.isMarker ? 'webp' : 'png'}`;
        if (!fs.existsSync(filePath)) {
            try {
                const response = await fetch(card.imageUrl);
                if (!response.ok) throw new Error(`Failed to fetch image: ${card.imageUrl}`);
                const arrayBuffer = await response.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                fs.writeFileSync(filePath, buffer);
                console.log(`Downloaded image: ${filePath}`);
            } catch (error) {
                console.error(`Error downloading image for ${card.name}:`, error);
            }
        } else {
            console.log(`Image already exists: ${filePath}`);
        }
    }
}

module.exports = download;