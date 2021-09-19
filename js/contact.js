const form = document.querySelector("#contactForm");
const fullName = document.querySelector("#fullName");
const fullNameError = document.querySelector("#fullNameError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const address = document.querySelector("#address");
const addressError = document.querySelector("#addressError");
const fullFormValidation = document.querySelector(".formValidation");

const validateForm = (event) => {
  event.preventDefault();

  if (checkLength(fullName.value, 0)) {
    fullNameError.style.display = "none";
    fullName.style.border = "2px solid  rgb(0, 255, 110)";
    fullName.style.backgroundColor = "rgba(0, 255, 110,.1)";
  } else {
    fullNameError.style.display = "block";
    fullName.style.border = "2px solid rgb(255, 12, 60)";
    fullName.style.backgroundColor = "rgba(255, 12, 60, .1)";
  }

  if (checkLength(subject.value, 10)) {
    subjectError.style.display = "none";
    subject.style.border = "2px solid  rgb(0, 255, 110)";
    subject.style.backgroundColor = "rgba(0, 255, 110,.1)";
  } else {
    subjectError.style.display = "block";
    subject.style.border = "2px solid rgb(255, 12, 60)";
    subject.style.backgroundColor = "rgba(255, 12, 60, .1)";
  }

  if (checkLength(address.value, 25)) {
    addressError.style.display = "none";
    address.style.border = "2px solid  rgb(0, 255, 110)";
    address.style.backgroundColor = "rgba(0, 255, 110,.1)";
  } else {
    addressError.style.display = "block";
    address.style.border = "2px solid rgb(255, 12, 60)";
    address.style.backgroundColor = "rgba(255, 12, 60, .1)";
  }

  if (validateEmail(email.value)) {
    emailError.style.display = "none";
    email.style.border = "2px solid  rgb(0, 255, 110)";
    email.style.backgroundColor = "rgba(0, 255, 110,.1)";
  } else {
    emailError.style.display = "block";
    email.style.border = "2px solid rgb(255, 12, 60)";
    email.style.backgroundColor = "rgba(255, 12, 60, .1)";
  }

  // Checks if whole form is a success
  if (
    checkLength(fullName.value, 0) &&
    checkLength(address.value, 25) &&
    checkLength(subject.value, 10) &&
    validateEmail(email.value)
  ) {
    console.log("Success");
    fullFormValidation.style.display = "block";
  } else {
    console.log("Fail");
    fullFormValidation.style.display = "none";
  }
};

const checkLength = (value, len) => {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
};

const validateEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
};

form.addEventListener("submit", validateForm);
