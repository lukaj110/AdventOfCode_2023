// Input

const text = await Deno.readTextFile("./input.txt");

const input = text.split("\r\n");

// Part 1

let sum = 0;

for (const line of input) {
  const numbers = line.split("").filter((e) => !isNaN(parseInt(e)));

  if (numbers.length === 0) continue;

  const [firstNumber, lastNumber] = [numbers[0], numbers[numbers.length - 1]];

  const fullNumber = parseInt(`${firstNumber}${lastNumber}`);

  sum += fullNumber;
}

console.log(sum);

// Part 2

let sum2 = 0;

const numbers = Array.from({ length: 9 }, (_, e) => e + 1);

const numberDictionary: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

for (const line of input) {
  const numbersIndices = numbers
    .map((e) => line.indexOf(e.toString()))
    .map((e) => {
      if (e === -1) return 999;
      return e;
    });

  const lowestNumberIndex = Math.min(...numbersIndices);

  const textNumbersIndices = Object.keys(numberDictionary)
    .map((e) => line.indexOf(e))
    .map((e) => {
      if (e === -1) return 999;
      return e;
    });

  const lowestTextNumberIndex = Math.min(...textNumbersIndices);

  let lowestNumber = 0;

  if (lowestNumberIndex < lowestTextNumberIndex) {
    lowestNumber =
      lowestNumberIndex !== 999
        ? numbers[numbersIndices.indexOf(lowestNumberIndex)]
        : Object.values(numberDictionary)[
            textNumbersIndices.indexOf(lowestTextNumberIndex)
          ];
  } else {
    lowestNumber =
      lowestTextNumberIndex !== 999
        ? Object.values(numberDictionary)[
            textNumbersIndices.indexOf(lowestTextNumberIndex)
          ]
        : numbers[numbersIndices.indexOf(lowestNumberIndex)];
  }

  const numbersIndicesHighest = numbers.map((e) =>
    line.lastIndexOf(e.toString())
  );

  const highestNumberIndex = Math.max(...numbersIndicesHighest);

  const textNumbersIndicesHighest = Object.keys(numberDictionary).map((e) =>
    line.lastIndexOf(e)
  );

  const highestTextNumberIndex = Math.max(...textNumbersIndicesHighest);

  let highestNumber = 0;

  if (highestNumberIndex > highestTextNumberIndex) {
    highestNumber = numbers[numbersIndicesHighest.indexOf(highestNumberIndex)];
  } else {
    highestNumber =
      Object.values(numberDictionary)[
        textNumbersIndicesHighest.indexOf(highestTextNumberIndex)
      ];
  }

  const finalNumber = parseInt(`${lowestNumber}${highestNumber}`);

  sum2 += finalNumber;
}

console.log(sum2);
