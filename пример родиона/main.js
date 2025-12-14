let name = document.getElementById("name");
let age = document.getElementById("age");
let email = document.getElementById("email");
let message = document.getElementById("message");
let inputs = document.querySelectorAll("input, textarea");

let form = document.querySelector("form");
let button = document.getElementById("button");

let sideBar = document.getElementById("side-bar");
let allowForm = true;

function sendForm() {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "") {
      allowForm = false;
      break;
    }
  }

  if (!allowForm) {
    alert("Пожалуйста, введите все данные");
  } else {
    console.log(name.value, age.value, email.value, message.value);

    for (let k = 0; k < inputs.length; k++) {
      inputs[k].value = "";
    }

    form.innerHTML = `<h1>Сообщение отправлено!</h1>`;
    button.style.display = "none";
  }
}

function openSideBar() {
  sideBar.style.right = "0";
}

function closeSideBar() {
  sideBar.style.right = "-200px";
}
