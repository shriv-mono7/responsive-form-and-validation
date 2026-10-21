const form = document.querySelector("#contactForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const messageInput = document.querySelector("#message");
const formStatus = document.querySelector("#formStatus");
const characterCount = document.querySelector("#characterCount");

const fields = [nameInput, emailInput, phoneInput, messageInput];

function setError(input, message) {
  const errorElement = document.querySelector(`#${input.id}Error`);
  input.setAttribute("aria-invalid", message ? "true" : "false");
  if (errorElement) errorElement.textContent = message;
}

function clearStatus() {
  formStatus.textContent = "";
  formStatus.className = "form-status";
}

function validateName() {
  const value = nameInput.value.trim();
  if (!value) return setError(nameInput, "Please enter your name."), false;
  if (value.length < 2) return setError(nameInput, "Your name must be at least 2 characters."), false;
  setError(nameInput, "");
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!value) return setError(emailInput, "Please enter your email address."), false;
  if (!emailPattern.test(value)) return setError(emailInput, "Enter a valid email, like alex@example.com."), false;
  setError(emailInput, "");
  return true;
}

function validatePhone() {
  const value = phoneInput.value.trim();
  const digits = value.replace(/\D/g, "");
  if (!value) return setError(phoneInput, "Please enter your phone number."), false;
  if (/[a-z]/i.test(value)) return setError(phoneInput, "Phone number can contain digits, spaces and + ( ) - only."), false;
  if (digits.length < 7 || digits.length > 15) return setError(phoneInput, "Enter a phone number with 7 to 15 digits."), false;
  setError(phoneInput, "");
  return true;
}

function validateMessage() {
  const value = messageInput.value.trim();
  if (!value) return setError(messageInput, "Please add a message."), false;
  if (value.length < 10) return setError(messageInput, "Your message must be at least 10 characters."), false;
  if (value.length > 500) return setError(messageInput, "Your message must be 500 characters or fewer."), false;
  setError(messageInput, "");
  return true;
}

const validators = {
  name: validateName,
  email: validateEmail,
  phone: validatePhone,
  message: validateMessage
};

fields.forEach((input) => {
  const validator = validators[input.id];
  input.addEventListener("blur", () => {
    validator();
  });
  input.addEventListener("input", () => {
    if (input.getAttribute("aria-invalid") === "true") validator();
    clearStatus();
  });
});

messageInput.addEventListener("input", () => {
  characterCount.textContent = `${messageInput.value.length} / 500`;
  characterCount.style.color = messageInput.value.length >= 450 ? "#b64242" : "";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearStatus();

  const valid = [validateName(), validateEmail(), validatePhone(), validateMessage()].every(Boolean);

  if (!valid) {
    formStatus.textContent = "A few details need attention. Check the highlighted fields and try again.";
    formStatus.classList.add("failure");
    const firstInvalid = fields.find((input) => input.getAttribute("aria-invalid") === "true");
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  formStatus.textContent = `Thanks, ${nameInput.value.trim()}! Your form passed validation. This demo does not send or store your information.`;
  formStatus.classList.add("success");
  form.reset();
  fields.forEach((input) => setError(input, ""));
  characterCount.textContent = "0 / 500";
  characterCount.style.color = "";
});

document.querySelector("#year").textContent = new Date().getFullYear();
fields.forEach((input) => input.setAttribute("aria-invalid", "false"));
