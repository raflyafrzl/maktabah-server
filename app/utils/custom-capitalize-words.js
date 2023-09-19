const capitalizeWords = (words) => {
  const temp = words.split(" ");
  const capitalizedWords = temp.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1);
    return firstLetter + restOfWord;
  });
  return capitalizedWords.join(" ");
};

module.exports = capitalizeWords;
