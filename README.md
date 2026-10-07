# FizzBuzz

[![tests](https://github.com/bradleyhomelinuxnet-prog/fizzbuzz/actions/workflows/test.yml/badge.svg)](https://github.com/bradleyhomelinuxnet-prog/fizzbuzz/actions/workflows/test.yml)

**Live demo: [bradleyhomelinuxnet-prog.github.io/fizzbuzz](https://bradleyhomelinuxnet-prog.github.io/fizzbuzz/)**

Count from 1 to 100. For multiples of 3 say **Fizz**, for multiples of 5 say **Buzz**, for multiples of both say **FizzBuzz**, and otherwise say the number.

## The approach

```js
export function say(n, rules = CLASSIC) {
  let out = '';
  for (const { divisor, word } of rules) {
    if (n % divisor === 0) out += word;
  }
  return out || String(n);
}
```

There is no `n % 15` special case. Each rule adds its word when it divides `n`, so "FizzBuzz" falls out of Fizz + Buzz, and a new rule like `7 → Bazz` works with no extra code (105 says `FizzBuzzBazz`).

## Use it

```js
import { fizzbuzz, say, CLASSIC } from './src/fizzbuzz.js';

fizzbuzz(15);                                     // ['1', '2', 'Fizz', ..., 'FizzBuzz']
say(21, [...CLASSIC, { divisor: 7, word: 'Bazz' }]); // 'FizzBazz'
```

From the command line:

```bash
node src/cli.js 15
node src/cli.js 30 7=Bazz
```

## Tests

```bash
npm test
```

The tests check the first fifteen by hand, compare 1 to 10,000 against the textbook definition, count the words in 1 to 100 (27 Fizz, 14 Buzz, 6 FizzBuzz), and cover extra rules, rule order and bad input. They use Node's built-in test runner, and CI runs them on Node 18, 20 and 22.
