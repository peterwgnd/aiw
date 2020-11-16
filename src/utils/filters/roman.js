// transform integers to roman numerals

module.exports = (x) => {
  const roman = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
  let result = roman[x-1];
  return result;
};

