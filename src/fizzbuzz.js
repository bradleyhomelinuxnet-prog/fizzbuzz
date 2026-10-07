// FizzBuzz: count from 1 to n, saying "Fizz" for multiples of 3,
// "Buzz" for multiples of 5, "FizzBuzz" for multiples of both,
// and the number itself otherwise.

/** The classic rules. */
export const CLASSIC = Object.freeze([
  Object.freeze({ divisor: 3, word: 'Fizz' }),
  Object.freeze({ divisor: 5, word: 'Buzz' }),
]);

/**
 * What to say for one number.
 *
 * The words of every rule that divides `n` are joined in rule order, so
 * adding a rule (say 7 → "Bazz") needs no new special case. That is why
 * this checks each rule once instead of testing `n % 15` first.
 *
 * @param {number} n a positive integer
 * @param {{divisor:number, word:string}[]} rules
 * @returns {string}
 */
export function say(n, rules = CLASSIC) {
  if (!Number.isInteger(n) || n < 1) {
    throw new RangeError(`expected a positive integer, got ${n}`);
  }
  let out = '';
  for (const { divisor, word } of rules) {
    if (n % divisor === 0) out += word;
  }
  return out || String(n);
}

/**
 * The sequence from 1 to `count`.
 * @param {number} count
 * @param {{divisor:number, word:string}[]} rules
 * @returns {string[]}
 */
export function fizzbuzz(count = 100, rules = CLASSIC) {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError(`expected a non-negative integer, got ${count}`);
  }
  for (const r of rules) {
    if (!Number.isInteger(r.divisor) || r.divisor < 1) {
      throw new RangeError(`rule divisor must be a positive integer, got ${r.divisor}`);
    }
  }
  return Array.from({ length: count }, (_, i) => say(i + 1, rules));
}
