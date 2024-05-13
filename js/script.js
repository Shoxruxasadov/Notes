// ========== TOGGLE MODAL ========= \\
const modal = document.querySelector(".modal");
function toggleModal() {
  modal.classList.toggle("active");
}

// ========== CRUD (NO EDITION) ========= \\
const addUserInp = document.getElementById("addUserInp");
const usersBtn = document.getElementById("usersBtn");
const btnSaves = document.getElementById("btnSaves");

let localUser = JSON.parse(localStorage.getItem("users"));
let users = localUser === null ? [] : localUser;
drawUsersBtn();

function pushUsers() {
  if (addUserInp.value === "") {
    return;
  }
  let obj = {
    name: addUserInp.value,
    notes: [],
  };
  users.push(obj);
  addUserInp.value = "";
  drawUsersBtn();
  toggleModal();
}

function drawUsersBtn() {
  let s = "";
  for (let i = 0; i < users.length; i++) {
    s += `<button onclick="user(${i})" class="users-btn">
            ${users[i].name}
            <div onclick="deleteBtn(${i})" class="delete-users">
               <i class="fa-solid fa-trash-can"></i>
            </div>
          </button>`;
  }
  usersBtn.innerHTML = s;
  localStorage.setItem(`users`, JSON.stringify(users));
}

function deleteBtn(i) {
    users.splice(i, 1);
    drawUsersBtn();
  }

// ========== DRAW PAGE USER ========= \\
const notesContent = document.getElementById("notesContent");
const notesAddInp = document.getElementById("notesAddInp");
const note = document.getElementById("note");
const noteTitle = document.querySelector("#noteTitle a h1");

function user(i) {
  note.style.display = "block";
  btnSaves.innerHTML = `<button onclick="saveNote(${i})">save</button>`;
  drawNotes(i);
  title(i);
}

function saveNote(i) {
  if (notesAddInp.value === "") {
    return;
  } else {
    users[i].notes.push(notesAddInp.value);
    drawUsersBtn();
  }
  drawNotes(i);
}

function drawNotes(ind) {
  console.log(users[0]);
  console.log(ind);
  let s = "";
  for (let i = 0; i < users[ind].notes.length; i++) {
    s += `<div class="content"><h1>${users[ind].notes[i]}</h1></div>`;
  }
  notesContent.innerHTML = s;
  notesAddInp.value = "";
}

function title(ind) {
  if (users[ind].name == null) {
    noteTitle.innerHTML = "Note Saver";
  } else {
    noteTitle.innerHTML = `${users[ind].name}'s Notes`;
  }
}


