function getUser() {
  //loading할 때 사용자가 가져오는 함수
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      let users = JSON.parse(xhr.responseText);
      let list = document.getElementById("list");
      list.innerHTML = "";
      Object.keys(users).map(function (key) {
        let userDiv = document.createElement("div");
        let span = document.createElement("span");
        span.textContent = users[key];
        let edit = document.createElement("button");
        edit.textContent = "edit";
        edit.addEventListener("click", function () {
          let name = prompt("Enter your name : ");
          if (!name) {
            return alert("you must enter your name");
          }
          let xhr = new XMLHttpRequest();
          xhr.onload = function () {
            if (xhr.status === 200) {
              console.log(xhr.responseText);
              getUser();
            } else {
              console.error(xhr.responseText);
            }
          };
          xhr.open("PUT", "/users/" + key); //수정 버튼
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(JSON.stringify({ name: name }));
        });
        let remove = document.createElement("button");
        remove.textContent = "delete";
        remove.addEventListener("click", function () {
          let xhr = new XMLHttpRequest();
          xhr.onload = function () {
            if (xhr.status === 200) {
              console.log(xhr.responseText);
              getUser();
            } else {
              console.error(xhr.responseText);
            }
          };
          xhr.open("DELETE", "/users/" + key); //삭제 버튼
          xhr.send();
        });
        userDiv.appendChild(span);
        userDiv.appendChild(edit);
        userDiv.appendChild(remove);
        list.appendChild(userDiv);
      });
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open("GET", "/users"); //페이지가 로딩되면, GET /users로 사용자 목록을 가져온다.
  xhr.send();
}
window.onload = getUser; // loading할 때 user info 가져옴

// form submit
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  let name = e.target.username.value;
  if (!name) {
    return alert("Enter your Name");
  }
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 201) {
      console.log(xhr.responseText);
      getUser();
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open("POST", "/users");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({ name: name }));
  e.target.username.value = "";
});
