#!/usr/bin/env node
// Usage:
//   node src/cli.js            -> 1 to 100
//   node src/cli.js 30         -> 1 to 30
//   node src/cli.js 30 7=Bazz  -> add a rule
import { fizzbuzz, CLASSIC } from './fizzbuzz.js';

const [countArg, ...ruleArgs] = process.argv.slice(2);
const count = countArg === undefined ? 100 : Number(countArg);
const rules = [...CLASSIC];
for (const arg of ruleArgs) {
  const m = /^(\d+)=(.+)$/.exec(arg);
  if (!m) {
    console.error(`bad rule ${JSON.stringify(arg)}: use divisor=Word, like 7=Bazz`);
    process.exit(2);
  }
  rules.push({ divisor: Number(m[1]), word: m[2] });
}

try {
  console.log(fizzbuzz(count, rules).join('\n'));
} catch (e) {
  console.error(e.message);
  process.exit(2);
}
