const placeholder = require('./img/avatar.png');

export const buildImageSource = (url, placeholderUrl = placeholder) => {
    const source = url ? {uri: url} : placeholderUrl;
    return {source, defaultSource: placeholderUrl};
};
