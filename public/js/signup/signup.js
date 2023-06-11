
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");

let submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", function(e) {
    if (password.value !== confirmPassword.value) {
        e.preventDefault();
        alert("Both password's should match");
    }
});