// Input

const text = await Deno.readTextFile("./input.txt");

const input = text.split("\r\n");

// Part 1

let sum = 0;

for (const line of input) {
  const [game, data] = line.split(": ");

  const gameId = parseInt(game.split(" ")[1]);

  const check = [true, true, true];

  data.split("; ").forEach((set, index) => {
    const cubeCount: Record<string, { max: number; count: number }> = {
      blue: {
        max: 14,
        count: 0,
      },
      red: {
        max: 12,
        count: 0,
      },
      green: {
        max: 13,
        count: 0,
      },
    };

    for (const roll of set.split(", ")) {
      const [value, color] = roll.split(" ");
      cubeCount[color].count += parseInt(value);
    }

    if (Object.values(cubeCount).some((e) => e.count > e.max))
      check[index] = false;
  });

  if (!check.some((e) => !e)) sum += gameId;
}

console.log(sum);

// Part 2

let sum2 = 0;

for (const line of input) {
  const data = line.split(": ")[1];

  const cubeCount: Record<string, number> = {
    blue: 0,
    red: 0,
    green: 0,
  };

  for (const set of data.split("; ")) {
    const rolls = set.split(", ");

    for (const roll of rolls) {
      const [num, color] = roll.split(" ");

      const value = parseInt(num);
      if (cubeCount[color] < value) cubeCount[color] = value;
    }
  }

  sum2 += Object.values(cubeCount).reduce((a, b) => a * b);
}

console.log(sum2);
