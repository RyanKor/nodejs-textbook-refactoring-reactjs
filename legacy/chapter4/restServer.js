const http = require("http");
const fs = require("fs");

const user = {}; // user object

http
  .createServer((req, res) => {
    if (req.method === "GET") {
      if (req.url === "/") {
        return fs.readFile("./restFront.html", (err, data) => {
          if (err) {
            throw err;
          }
          res.end(data);
        });
      } else if (req.url === "/about") {
        return fs.readFile("./about.html", (err, data) => {
          if (err) {
            throw err;
          }
          res.end(data);
        });
      } else if (req.url === "/users") {
        return res.end(JSON.stringify(user));
      }
      return fs.readFile(`.${req.url}`, (err, data) => {
        if (err) {
          res.writeHead(404, "NOT FOUND");
          return res.end("NOT FOUND");
        }
        return res.end(data);
      });
    } else if (req.method === "POST") {
      if (req.url === "/users") {
        let body = "";
        req.on("data", (data) => {
          body += data;
        });
        return req.on("end", () => {
          console.log("PUT body 본문: ", body);
          user[key] = JSON.parse(body).name;
          return res.end(JSON.stringify(user));
        });
      }
    } else if (req.method === "DELETE") {
      if (req.url.startsWith("/users/")) {
        const key = req.url.split("/")[2];
        delete user[key];
        return res.end(JSON.stringify(user));
      }
    }
    res.writeHead(404, "NOT FOUND");
    return res.end("NOT FOUND");
  })
  .listen(8085, () => {
    console.log("8085포트에서 서버 대기 중입니다.");
  });
