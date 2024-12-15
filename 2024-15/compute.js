const dirmap = {
  '>': [1, 0],
  '<': [-1, 0],
  v: [0, 1],
  '^': [0, -1],
};

const TEST = true;
function movewithbox(grid, [x, y], [dx, dy], test) {
  const [nx, ny] = [x + dx, y + dy];
  if (grid[ny][nx] === '#') return false;
  if (grid[ny][nx] === '.') {
    if (!test) {
      grid[ny][nx] = grid[y][x];
      grid[y][x] = '.';
    }
    return true;
  }
  if (dx !== 0) {
    // move left/right
    const next = movewithbox(grid, [nx, ny], [dx, dy], test);
    if (!test && next) {
      grid[ny][nx] = grid[y][x];
      grid[y][x] = '.';
    }
    return next;
  }

  // up or down
  if (grid[ny][nx] === '[') {
    const next =
      movewithbox(grid, [nx, ny], [dx, dy], test) &&
      movewithbox(grid, [nx + 1, ny], [dx, dy], test);
    if (!test && next) {
      grid[ny][nx] = grid[y][x];
      grid[y][x] = '.';
    }
    return next;
  }

  if (grid[ny][nx] === ']') {
    const next =
      movewithbox(grid, [nx, ny], [dx, dy], test) &&
      movewithbox(grid, [nx - 1, ny], [dx, dy], test);
    if (!test && next) {
      grid[ny][nx] = grid[y][x];
      grid[y][x] = '.';
    }
    return next;
  }
}

export function move(grid, [x, y], d) {
  const dir = dirmap[d];
  let [nx, ny] = [x + dir[0], y + dir[1]];
  if (grid[ny][nx] === '#') return [x, y];
  if (movewithbox(grid, [x, y], dir, TEST)) {
    movewithbox(grid, [x, y], dir);
    [x, y] = [nx, ny];
  }
  return [x, y];
}
