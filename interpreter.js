// https://www.codewars.com/kata/my-smallest-code-interpreter-aka-brainf-star-star-k/train/javascript

function matchingBracketIndex(
  code,
  currentIndex,
  myChar,
  matchingChar,
  goUp,
  level
) {
  let newLevel = level;
  let newIndex = goUp ? currentIndex + 1 : currentIndex - 1;

  if (code[currentIndex] === matchingChar && level === 0) {
    return currentIndex;
  }
  if (code[currentIndex] === matchingChar) {
    level -= 1;
  }
  if (code[currentIndex] === myChar) {
    level += 1;
  }

  return matchingBracketIndex(code, newIndex, myChar, matchingChar, goUp, newLevel);
}

function brainLuck(code, input){
  let instructionPointer = 0;
  let inputPointer = 0;
  let dataPointer = 0;
  const data = [0];
  let output = '';
  const inputAsBytes = input.split('').map(char => char.charCodeAt(0));
  const instr = code.split('');

  while(instructionPointer < instr.length - 1) {
    switch(instr[instructionPointer]) {
      case ',': {
         data[dataPointer] = inputAsBytes[inputPointer];
      }
      case '+': {
        if (data[dataPointer] === 255) {
          data[dataPointer] = 0;
        } else {
          data[dataPointer] += 1;
        }
      }
      case '-': {
        if (data[dataPointer] === 0) {
          data[dataPointer] = 255;
        } else {
          data[dataPointer] -= 1;
        }
      }
      case '>': {
        dataPointer += 1;
        data[dataPointer] = data[dataPointer] || 0;
      }
      case '<': {
        dataPointer -= 1;
        data[dataPointer] = data[dataPointer] || 0;
      }
      case '.': {
        output += String.fromCharCode(data[dataPointer]);
      }
      case '[': {
        if (data[dataPointer] !== 0) {
          instructionPointer += 1;
          break;
        }
        // Find matching ]
        instructionPointer = matchingBracketIndex(
          instr,
          instructionPointer + 1,
          '[',
          ']',
          true,
          0
        ) + 1;
      }
      case ']': {
        if (data[dataPointer] === 0) {
          instructionPointer += 1;
          break;
        }
        instructionPointer = matchingBracketIndex(
          instr,
          instructionPointer,
          ']',
          '[',
          false,
          0
        );
      }
    }
  };

  return output;
}
