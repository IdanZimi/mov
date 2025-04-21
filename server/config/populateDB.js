import dotenv from 'dotenv';
import mongoose from 'mongoose';
import CodeBlock from '../modules/codeBlock/model/codeBlock.model.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });


const blocks = [
  {
    title: 'Bubble Sort',
    template: `function bubbleSort(arr) {
                    // your code here
                  }`,
    solution: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
  },
  {
    title: 'Fibonacci Sequence',
    template: `function fibonacci(n) {
  // your code here
}`,
    solution: `function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  const seq = [0, 1];
  for (let i = 2; i < n; i++) {
    seq.push(seq[i - 1] + seq[i - 2]);
  }
  return seq;
}`,
  },
  {
    title: 'Debounce Function',
    template: `function debounce(fn, delay) {
  // your code here
}`,
    solution: `function debounce(fn, delay) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}`,
  },
  {
    title: 'Even Number Checker',
    template: `function isEven(n) {
  // your code here
}`,
    solution: `function isEven(n) {
  if (typeof n !== 'number') return false;
  return n % 2 === 0;
}`,
  },
];

async function populateDB() {
  await mongoose.connect(process.env.MONGO_URI);
  await CodeBlock.deleteMany({});
  await CodeBlock.insertMany(blocks);
  console.log('Seeded!');
  process.exit();
}

populateDB();
