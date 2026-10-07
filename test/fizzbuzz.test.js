import { test } from 'node:test';
import assert from 'node:assert/strict';
import { say, fizzbuzz, CLASSIC } from '../src/fizzbuzz.js';

test('the first fifteen', () => {
  assert.deepEqual(fizzbuzz(15), [
    '1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz',
    '11', 'Fizz', '13', '14', 'FizzBuzz',
  ]);
});

test('matches the textbook definition for 1 to 10,000', () => {
  const out = fizzbuzz(10000);
  out.forEach((got, i) => {
    const n = i + 1;
    const want = n % 15 === 0 ? 'FizzBuzz' : n % 3 === 0 ? 'Fizz' : n % 5 === 0 ? 'Buzz' : String(n);
    assert.equal(got, want, `n = ${n}`);
  });
});

test('one to a hundred has the right counts', () => {
  const out = fizzbuzz();
  assert.equal(out.length, 100);
  assert.equal(out.filter((s) => s === 'Fizz').length, 27);
  assert.equal(out.filter((s) => s === 'Buzz').length, 14);
  assert.equal(out.filter((s) => s === 'FizzBuzz').length, 6);
});

test('extra rules combine without special cases', () => {
  const rules = [...CLASSIC, { divisor: 7, word: 'Bazz' }];
  assert.equal(say(7, rules), 'Bazz');
  assert.equal(say(21, rules), 'FizzBazz');
  assert.equal(say(35, rules), 'BuzzBazz');
  assert.equal(say(105, rules), 'FizzBuzzBazz');
  assert.equal(say(11, rules), '11');
});

test('words follow rule order', () => {
  assert.equal(say(15, [{ divisor: 5, word: 'Buzz' }, { divisor: 3, word: 'Fizz' }]), 'BuzzFizz');
});

test('no rules means plain numbers', () => {
  assert.deepEqual(fizzbuzz(3, []), ['1', '2', '3']);
});

test('zero gives an empty list', () => {
  assert.deepEqual(fizzbuzz(0), []);
});

test('rejects bad input', () => {
  for (const bad of [0, -1, 1.5, NaN, '3']) assert.throws(() => say(bad), RangeError);
  for (const bad of [-1, 2.5, NaN]) assert.throws(() => fizzbuzz(bad), RangeError);
  assert.throws(() => fizzbuzz(5, [{ divisor: 0, word: 'Zero' }]), RangeError);
});
