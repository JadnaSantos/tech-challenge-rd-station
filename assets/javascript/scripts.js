const navbarNav = document.querySelector('.navbar-nav');
const navbarToggleBtn = document.querySelector('.nav-toggle-btn');
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const select = document.getElementById('options');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const radio = document.getElementById('radio');
const thankYouMessage = document.querySelector('#thank-you-message');
const buttonCreateAccountBlue = document.getElementById('create-account-blue-button')
const buttonCreateAccountYellow = document.getElementById('create-account-yellow-button')

navbarToggleBtn.addEventListener('click',() => {

  navbarNav.classList.toggle('active');
  this.classList.toggle('active');

});

function checkInputs() {
  const usernameValue = username.value;
  const emailValue = email.value;
  const passwordValue = password.value;
  const passwordConfirmationValue = password2.value;

  if (usernameValue === "") {
    setErrorFor(username, "O nome de usuário é obrigatório.");
  } else {
    setSuccessFor(username);
  }

  if (emailValue === "") {
    setErrorFor(email, "O email é obrigatório.");
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Por favor, insira um email válido.");
  } else {
    setSuccessFor(email);
  }

  if (passwordValue === "") {
    setErrorFor(password, "A senha é obrigatória.");
  } else if (!checkPassword(passwordValue)) {
    setErrorFor(password, "A senha precisa ter no mínimo 6 caracteres a 10 caracteres. Com uma letra maiúscula, minuscula e 1 numero");
  } else {
    setSuccessFor(password);
  }

  if (passwordConfirmationValue !== passwordValue) {
    setErrorFor(password2, "As senhas não conferem.");
  } else {
    setSuccessFor(password2);
  }

  const formControls = form.querySelectorAll(".form-control");

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form-control success";
  });

  if (formIsValid) {
    console.log("O formulário está 100% válido!");
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = message;

  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;

  formControl.className = "form-control success";
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}


function checkPassword(password) {
  return/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W+)(?=^.{6,50}$).*$/g.test(password)
  
}


form.addEventListener("submit", (event) => {
  event.preventDefault();

  const payload = new FormData(form)
  checkInputs();

  thankYouMessage.classList.add('show');

  fetch('https://rdstation-signup-psel.herokuapp.com', {
    method: 'POST',
    body: payload
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

  form.reset();
});


buttonCreateAccountBlue.addEventListener('click', function() {
  window.open("https://app.rdstation.com.br/signup", "_blank")
});


buttonCreateAccountYellow.addEventListener('click', function() {
  window.open("https://app.rdstation.com.br/signup", "_blank")
});



