const asciiMapping = require('./ascii-mapping');
const lineBreakingRegex = require('./line-breaking-regex');

const SPECIAL_REGEX = /^_+$/g;
const asciiMappingKeys = [...asciiMapping.keys()];
const regex = new RegExp(`[${asciiMappingKeys.join('')}]`, 'ug');

const asciifolding = (str = '') => (
  str.replace(regex, character => asciiMapping.get(character) || character)
);

const asciiFoldingTokenizer = (str = '') => {
  try {
    const folded = asciifolding(str.toLowerCase());
    const tokens = folded.match(lineBreakingRegex) || [];

    return tokens.filter(token => !token.match(SPECIAL_REGEX));
  } catch (err) {
    console.error(err);
    return [str];
  }
};

const standardTokenizer = (str = '') => {
  try {
    const tokens = str.toLowerCase().match(lineBreakingRegex) || [];

    return tokens.filter(token => !token.match(SPECIAL_REGEX));
  } catch (err) {
    console.error(err);
    return [str];
  }
};

module.exports = {
  standardTokenizer,
  asciiFoldingTokenizer,
};