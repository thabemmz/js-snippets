function orderWeight(strng) {
    return strng
      .trim()
      .split(/\s+/)
      .map(weight => [weight, weight.split('').reduce((position, digit) => position + parseInt(digit, 10), 0)])
      .sort((a, b) => {
        if (a[1] > b[1]) {
          return 1;
        }
        if (b[1] > a[1]) {
          return -1;
        }

        return a[0].toString() > b[0].toString();
      })
      .map(weightEntry => weightEntry[0])
      .join(' ');
}

console.log(orderWeight('1 2 200 4 4 6 6 7 7 18 27 72 81 9 91 425 31064 7920 67407 96488 34608557 71899703'));
