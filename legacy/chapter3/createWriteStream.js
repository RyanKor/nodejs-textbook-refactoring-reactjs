const fs = require("fs");
const writeStream = fs.createWriteStream("./writeme2.txt");
writeStream.on("finish", () => {
  console.log("파일 쓰기 완료");
});

writeStream.write("write this. \n");
writeStream.write("write this one more.");
writeStream.end();
