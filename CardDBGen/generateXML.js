const fs = require('fs');

const generateCardXML = (card) => {
    const relatedCards = card.related?.map(related => {
        return `\t\t\t<related${related.attach ? ` attach="${related.attach}"` : ' '}>${related.name}</related>`;
    }).filter(Boolean) || [];

    return [
        `\t<card>`,
        `\t\t<name>${card.name}</name>`,
        `\t\t<text>${card.text}\n\t\t</text>`,
        '\t\t<prop>',
        Boolean(card.prop?.pt) && `\t\t\t<pt>${card.prop.pt}</pt>` || null,
        `\t\t\t<side>${card.prop.side}</side>`,
        `\t\t\t<type>${card.prop.type}</type>`,
        `\t\t\t<maintype>${card.prop.maintype}</maintype>`,
        `\t\t\t<manacost>${card.prop.manacost}</manacost>`,
        `\t\t\t<colors>${card.prop.colors}</colors>`,
        `\t\t\t<coloridentity>${card.prop.coloridentity}</coloridentity>`,
        `\t\t</prop>`,
        `\t\t<set picurl="${card.set.img}">${card.set.name}</set>`,
        ...relatedCards,
        `\t\t<tablerow>${card.tablerow}</tablerow>`,
        '\t</card>'
    ].join('\n');
}

const generateSetXML = (collection) => {
    return [
        `\t<set>`,
        `\t\t<name>${collection.name}</name>`,
        `\t\t<longname>${collection.longName}</longname>`,
        `\t\t<settype>${collection.setType}</settype>`,
        `\t\t<releasedate>${collection.releaseDate}</releasedate>`,
        `\t</set>`
    ].join('\n');
};

const generateXML = async (collections, cards) => {
    const xmlData = [
        `<?xml version="1.0" encoding="UTF-8"?>`,
        `<cockatrice_carddatabase version="4">`,
        '',
        '----- DEFINE ALL SETS (START) -----',
        '<sets>',
        ...collections.flat().map(generateSetXML),
        '</sets>',
        '----- DEFINE ALL SETS ( END ) -----',
        '',
        '----- DEFINE ALL CARDS (START) -----',
        '<cards>',
        ...cards.flat().map(generateCardXML),
        '</cards>',
        '--- DEFINE ALL CARDS (END) -----',
        '</cockatrice_carddatabase>'
    ].join('\n');

    try {
        fs.writeFileSync('01.DBSFW.xml', xmlData, 'utf8');
        console.log('XML file generated successfully: dbsfw.xml');
    } catch (error) {
        console.error('Error writing XML file:', error);
    }
};

module.exports = generateXML;