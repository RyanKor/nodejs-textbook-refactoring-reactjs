const fs = require("fs");

fs.access(
  "./order",
  fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK,
  (err) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.log("No Folder");
        fs.mkdir("./folder", (err) => {
          if (err) {
            throw err;
          }
          console.log("Making Folder Success");
          fs.open("./folder/file.js", "w", (err, fd) => {
            if (err) {
              throw err;
            }
            console.log("Success empty file", fd);
            fs.rename("./folder/file.js", "./folder/newfile.js", (err) => {
              if (err) {
                throw err;
              }
              console.log("successfully changed name");
            });
          });
        });
      } else {
        throw err;
      }
    } else {
      console.log("already folder exists");
    }
  }
);
