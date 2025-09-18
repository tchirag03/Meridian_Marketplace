
const stopwords = new Set([
    'a', 'an', 'and', 'the', 'is', 'in', 'it', 'of', 'for', 'on', 'with', 'at', 'by',
    'this', 'that', 'to', 'was', 'were', 'he', 'she', 'they', 'i', 'you', 'we',
    'store', 'shop', 'online', 'buy', 'sell', 'product', 'products',
    'tumakuru', 'karnataka'
]);


export const generateKeywords = (inputText) => {
    if (!inputText) {
        return [];
    }

    const words = inputText.toLowerCase().split(/\s+/);

    const keywords = words.filter(word => !stopwords.has(word.trim()));

    return [...new Set(keywords)];
};