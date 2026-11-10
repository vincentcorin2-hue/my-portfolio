const form = document.getElementById("contact-form");
const success = document.getElementById("form-success");

// Show or clear an error message under a field
function setError(id, message) {
  document.getElementById(id + "-error").textContent = message;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();               // stop the form from submitting

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  let valid = true;
  success.textContent = "";

  // 1. Name must not be empty
  if (name === "") {
    setError("name", "Please enter your name.");
    valid = false;
  } else {
    setError("name", "");
  }

  // 2. Email must not be empty and must match a basic email pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    setError("email", "Please enter your email address.");
    valid = false;
  } else if (!emailPattern.test(email)) {
    setError("email", "Please enter a valid email address.");
    valid = false;
  } else {
    setError("email", "");
  }

  // 3. Phone must not be empty and must contain digits only
  const digitsOnly = /^[0-9]+$/;
  if (phone === "") {
    setError("phone", "Please enter your phone number.");
    valid = false;
  } else if (!digitsOnly.test(phone)) {
    setError("phone", "Phone number must contain digits only.");
    valid = false;
  } else {
    setError("phone", "");
  }

  // 4. Message must not be empty
  if (message === "") {
    setError("message", "Please enter a message.");
    valid = false;
  } else {
    setError("message", "");
  }

  // If everything passed, show success and reset the form
  if (valid) {
    success.textContent = "Thank you, " + name + "! Your message has been sent.";
    form.reset();
  }
});