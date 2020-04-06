const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

//show error

const showError = (input, message) => {
  const formControl = input.parentNode;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerHTML = message;
};

// show success
const showSuccess = (input) => {
  const formControl = input.parentNode;
  formControl.className = "form-control success";
};

//validate email

const isValidEmail = (inputEmail) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(inputEmail.value.trim()).toLowerCase())) {
    showSuccess(inputEmail);
  } else {
    showError(inputEmail, `${getFieldName(inputEmail)} is an invalid email`);
  }
};

const checkRequired = (inputArray) => {
  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

const checkInputLenth = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} should have at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} should have a maximum of ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};
const checkPasswordMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    return showError(
      password2,
      "This password should match with the first one"
    );
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkInputLenth(username, 3, 15);
  checkInputLenth(password, 6, 20);
  isValidEmail(email);
  checkPasswordMatch(password, password2);
});
