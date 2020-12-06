const buffer = Buffer.from("change me to buffer");
console.log("from() :", buffer); // 문자열을 buffer로 변경해준다.
console.log("length :", buffer.length); // 버퍼의 크기를 환산한다.
console.log("toString() :", buffer.toString());
const array = [
  Buffer.from("space"),
  Buffer.from("space"),
  Buffer.from("one more space"),
]; // 배열 안에 든 버퍼들을 하나로 합칩니다.

const buffer2 = Buffer.concat(array);
console.log("concat(): ", buffer2.toString());
const buffer3 = Buffer.alloc(5); // 빈 버퍼를 하나 생성합니다.
console.log("alloc(): ", buffer3);

// from() : <Buffer 63 68 61 6e 67 65 20 6d 65 20 74 6f 20 62 75 66 66 65 72>
// length : 19
// toString() : change me to buffer
// concat():  spacespaceone more space
// alloc():  <Buffer 00 00 00 00 00>
