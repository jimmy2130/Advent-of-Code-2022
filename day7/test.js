const obj = { a: { b: { c: null } } };
let arr = [];
let pointer;
for (let i = 1; i <= 3; i++) {
  if (i === 1) pointer = obj;
  if (i === 2) pointer = pointer.a;
  if (i === 3) {
    pointer = pointer.b;
    pointer.c = 3;
  }
  arr.push(pointer);
}
console.log(arr);

const obj2 = { a: 3 };
const key = 'a';
console.log(obj2[key]);
const number = 10_0000_0000;
console.log(number);
