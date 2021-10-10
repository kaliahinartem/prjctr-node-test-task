const checkParentheses = (str) => {
  const bracketsMap = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  const allBrackets = Object.entries(bracketsMap).reduce(
    (acc, [key, val]) => [...acc, key, val],
    []
  );

  const inputFiltered = str
    .split("")
    .filter((char) => allBrackets.includes(char));

  if (inputFiltered.length % 2 !== 0) return false;

  const bracketsStack = [];

  inputFiltered.forEach((bracket) => {
    const lastOpenedBracket = bracketsStack[bracketsStack.length - 1];

    // if there is a value in the mapper - it's an opening bracket
    if (bracketsMap[bracket]) bracketsStack.push(bracket);
    // if current bracket closes the last one in array - remove last element from array
    else if (bracketsMap[lastOpenedBracket] === bracket) bracketsStack.pop();
    else return false;
  });

  // if every opening bracket was popped from the array - this string is valid
  return bracketsStack.length === 0;
};

console.log(checkParentheses("--()--")); // true
console.log(checkParentheses("-a]--[")); // false
console.log(checkParentheses("dsa{vsfs{ad")); // false
console.log(checkParentheses("j78(g5b]uyg")); // false
console.log(checkParentheses(",m{i987y}hj")); // true
console.log(checkParentheses("dsa[3ed---:]::")); // true
console.log(checkParentheses("dsa[]3ed---:[]::")); // true
console.log(checkParentheses("dsa{[]3ed---:[]}::")); // true
