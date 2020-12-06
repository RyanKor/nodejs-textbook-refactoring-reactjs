const mongoose = require("mongoose");

module.exports = () => {
  const connect = () => {
    //개발 환경이 아닐대 몽구스가 생성하는 쿼리 내용을 콘솔을 통해 확인 가능한 부분
    if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }
    mongoose.connect(
      "mongodb://root:1234@localhost:27017/admin",
      {
        dbName: "nodejs",
      },
      (error) => {
        if (error) {
          console.log("mongodb error", error);
        } else {
          console.log("mongodb success");
        }
      }
    );
  };
  connect();
  //   mongoose event listener
  mongoose.connection.on("error", (error) => {
    console.error("mongodb error", error);
  });
  mongoose.connection.on("disconnected", () => {
    console.error("mongodb disconnected");
    connect();
  });
  require("./user");
  require("./comment");
};
