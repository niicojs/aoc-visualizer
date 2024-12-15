import tkit from 'terminal-kit';
import cfonts from 'cfonts';
import run from './run.js';

const term = tkit.terminal;
term.clear();

const title = cfonts.render(`AOC 2024 15`, {});
term(title.string);

term.hideCursor();

const end = () => {
  term.clear();
  term.processExit();
};
process.once('SIGINT', end);
process.once('SIGTERM', end);

run();
