const convertMdToPlainText = (textToConvert) => {
    const convertedText = (textToConvert || '')
        .replace(/\[ul\]/g, '\n')
        .replace(/\[\/ul\]/g, '\n')
        .replace(/\[li\]/g, '- ')
        .replace(/\[\/li\]/g, '\n')
        .replace('--', ':')
        .replace('  ', ' ')
        .replace(/<br>/gi, '\n')
        .replace(/\[br\]/g, '\n')
        .replace(/\[em\]/g, '')
        .replace(/\[\/em\]/g, '')
        .replaceAll('<<', '[')
        .replaceAll('>>', ']')
        .replaceAll('<', '[')
        .replaceAll('>', ']')
        .trim();

    return convertedText
        .split('\n')
        .filter(Boolean)
        .map(item => item.trim())
        .join('\n');
}

module.exports = {
    convertMdToPlainText
};