import { readFileSync } from 'fs';
import tkit from 'terminal-kit';
import path from 'path';
import { move } from './compute.js';

const term = tkit.terminal;

function getData() {
  const filename = path.join(import.meta.dirname, 'input.txt');
  const raw = readFileSync(filename, 'utf-8');
  const [one, two] = raw.split(/\r?\n\r?\n/);
  const grid = one.split(/\r?\n/).map((l) =>
    l
      // .replaceAll('#', '##')
      // .replaceAll('O', '[]')
      // .replaceAll('.', '..')
      // .replace('@', '@.')
      .split('')
  );
  const dirs = two.replace(/\r?\n/g, '');
  return [grid, dirs];
}

const [grid, dirs] = getData();
let start = [0, 0];
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] === '@') {
      start = [x, y];
      grid[y][x] = '.';
    }
  }
}

function draw(idx, pos) {
  term.saveCursor();
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (x === pos[0] && y === pos[1]) {
        term.blue('@');
      } else if (grid[y][x] === 'O') {
        term.yellow('O');
      } else if (grid[y][x] === '#') {
        term('▉');
      } else {
        term(grid[y][x]);
      }
    }
    term('\n');
  }
  term.blue(idx);
  term.restoreCursor();
}

export default function run() {
  let idx = 0;
  let pos = start;
  const timer = setInterval(() => {
    if (idx === dirs.length) {
      clearInterval(timer);
      term.processExit();
    } else {
      pos = move(grid, pos, dirs[idx]);
      idx++;
    }
    draw(idx, pos);
  }, 10);
}
