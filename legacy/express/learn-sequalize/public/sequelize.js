// redirect comment when user name is clicked
document.querySelectorAll("#user-list tr").forEach(function (el) {
  el.addEventListener("click", function () {
    let id = el.querySelector("td").textContent;
    getComment(id);
  });
});
// User Loading
function getUser() {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      let users = JSON.parse(xhr.responseText);
      console.log(users);
      let tbody = document.querySelector("#user-list tbody");
      tbody.innerHTML = "";
      users.map(function (user) {
        let row = document.createElement("tr");
        row.addEventListener("click", function () {
          getComment(user.id);
        });
        let td = document.createElement("td");
        td.textContent = user.id;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = user.name;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = user.age;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = user.married ? "Married" : "Not Married";
        row.appendChild(td);
        tbody.appendChild(row);
      });
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open("GET", "/users");
  xhr.send();
}

//comment loading, 댓글 불러오기

function getComment(id) {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      let comments = JSON.parse(xhr.responseText);
      //A valid JSON string. Converts a JavaScript Object Notation (JSON) string into an object.
      let tbody = document.querySelector("#comment-list tbody");
      tbody.innerHTML = "";
      comments.map(function (comment) {
        let row = document.createElement("tr");
        let td = document.createElement("td");
        td.textContent = comment.id;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = comment.user.name;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = comment.comment;
        row.appendChild(td);
        let edit = document.createElement("button");
        edit.textContent = "수정";
        edit.addEventListener("click", function () {
          let newComment = prompt("바꿀 내용을 입력하세요");
          if (!newComment) {
            return alert("내용을 반드시 입력해야합니다.");
          }
          let xhr = new XMLHttpRequest();
          xhr.onload = function () {
            if (xhr.status === 200) {
              console.log(xhr.responseText);
              getComment(id);
            } else {
              console.error(xhr.responseText);
            }
          };
          xhr.open("PATCH", "/comments/" + comment.id);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(JSON.stringify({ comment: newComment }));
        });
        let remove = document.createElement("button");
        remove.textContent = "삭제";
        remove.addEventListener("click", function () {
          let xhr = new XMLHttpRequest();
          xhr.onload = function () {
            if (xhr.status === 200) {
              console.log(xhr.responseText);
              getComment(id);
            } else {
              console.error(xhr.responseText);
            }
          };
          xhr.open("DELETE", "/commnets/" + comment.id);
          xhr.send();
        });
        td = document.createElement("td");
        td.appendChild(edit);
        row.appendChild(td);
        td = document.createElement("td");
        td.appendChild(remove);
        row.appendChild(td);
        tbody.appendChild(row);
      });
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open("GET", "/comments/" + id); // 오타갖고 한참 찾았네!
  xhr.send();
}

//사용자 정보 등록하기
document.getElementById("user-form").addEventListener("submit", function (e) {
  //preventDefault 설명자료
  //http://megaton111.cafe24.com/2015/04/30/preventdefault-%EC%99%80-stoppropagation-%EC%B0%A8%EC%9D%B4/?ckattempt=1
  e.preventDefault();
  let name = e.target.username.value;
  let age = e.target.age.value;
  let married = e.target.married.checked;
  if (!name) {
    return alert("Enter your name");
  }
  if (!age) {
    return alert("Enter your age");
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
  xhr.send(JSON.stringify({ name: name, age: age, married: married }));
  e.target.username.value = "";
  e.target.age.value = "";
  e.target.married.checked = false;
});

//댓글 정보 등록하기
document.getElementById("comment-form").addEventListener("submit", function (e) {
    e.preventDefault();
    let id = e.target.userid.value;
    let comment = e.target.comment.value;
    if (!id) {
      return alert("Enter your ID");
    }
    if (!comment) {
      return alert("Enter Comment");
    }
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status === 201) {
        console.log(xhr.responseText);
        getComment(id);
      } else {
        console.error(xhr.responseText);
      }
    };
    xhr.open("POST", "/comments");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ id: id, comment: comment }));
    e.target.userid.value = "";
    e.target.comment.value = "";
  });
