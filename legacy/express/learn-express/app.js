var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const session = require("express-session");
let flash = require("connect-flash");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Custom Middleware 실습하기
app.use(function (req, res, next) {
  console.log(req.url, "the custom middleware");
  next();
});

app.use(logger("dev"));
app.use(express.json()); //body-parser의 일부 기능이 내장 메소드로 전환됨
app.use(express.urlencoded({ extended: false })); //쿼리스트링 해석
app.use(cookieParser()); //요청에 동봉된 쿠키를 해석해준다.
app.use(express.static(path.join(__dirname, "public"))); //정적 파일 제공
app.use(cookieParser("secret code"));
// 로그인 등에 매우 유용하게 사용되는 session 모듈 -> npm i exress-session
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "secret code",
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(flash());
app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
