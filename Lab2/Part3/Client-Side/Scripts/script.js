document.getElementById("myForm").addEventListener("submit", function (event) {
  var name = document.getElementById("name").value.trim();
  var mobile = document.getElementById("mobile").value.trim();
  var email = document.getElementById("email").value.trim();
  var address = document.getElementById("address").value.trim();

  var nameError = document.getElementById("nameError");
  var mobileError = document.getElementById("mobileError");
  var emailError = document.getElementById("emailError");
  var addressError = document.getElementById("addressError");

  nameError.textContent = "";
  mobileError.textContent = "";
  emailError.textContent = "";
  addressError.textContent = "";

  if (!/^[a-zA-Z\s]+$/.test(name)) {
    nameError.textContent = "Name can only contain letters and spaces";
    event.preventDefault();
  }

  if (!/^\d{11}$/.test(mobile)) {
    mobileError.textContent = "Mobile number must be exactly 11 digits";
    event.preventDefault();
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    emailError.textContent = "Invalid email format";
    event.preventDefault();
  }

  if (address.length < 5) {
    addressError.textContent = "Address must be at least 5 characters";
    event.preventDefault();
  }
});
