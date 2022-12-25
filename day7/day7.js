const fs = require('fs');

function day7() {
  const input = fs.readFileSync('./day7.txt').toString().split('\n');
  let root = {};
  let pointer = root;
  let pointerArray = [pointer];
  for (let i = 0; i < input.length; i++) {
    if (input[i] === '$ cd /' || input[i] === '$ ls') {
      continue;
    }

    if (input[i][0] !== '$') {
      let [size, fileName] = input[i].split(' ');
      if (size === 'dir') {
        pointer[fileName] = {};
      } else {
        pointer[fileName] = parseInt(size);
      }
    } else {
      let [, , dir] = input[i].split(' ');
      if (dir !== '..') {
        pointer = pointer[dir];
        pointerArray.push(pointer);
      } else {
        pointerArray.pop();
        pointer = pointerArray[pointerArray.length - 1];
      }
    }
  }
  // console.log(root);
  let dirSizeArr = [];
  pointer = root;
  dfs(dirSizeArr, pointer);
  // console.log(dirSizeArr);
  let ans = dirSizeArr.reduce((acc, cur) => {
    if (cur <= 10_0000) acc += cur;
    return acc;
  }, 0);
  console.log('part 1');
  console.log(ans);

  let usedSpace = Math.max(...dirSizeArr);
  let unUsedSpace = 7000_0000 - usedSpace;
  let neededSpace = 3000_0000 - unUsedSpace;
  let possible = dirSizeArr.filter(size => size >= neededSpace);
  console.log('part 2');
  console.log(Math.min(...possible));
}

function dfs(dirSizeArr, pointer) {
  let sum = 0;
  let keys = Object.keys(pointer);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (typeof pointer[key] === 'number') {
      sum += pointer[key];
    } else {
      sum += dfs(dirSizeArr, pointer[key]);
    }
  }
  dirSizeArr.push(sum);
  return sum;
}

day7();
