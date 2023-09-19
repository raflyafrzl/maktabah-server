const generateID = () => {
  const letterNumber =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
  const temp = letterNumber.split("");
  let result = "";
  for (let i = 0; i < 4; i++) {
    const randIndex = Math.floor(Math.random() * (61 - 0 + 1)) + 0;
    result += temp[randIndex];
  }

  return result;
};

module.exports = {
  generateID,
};
