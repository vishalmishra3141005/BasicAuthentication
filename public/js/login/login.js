
const googleLogin = document.getElementById("google-login");

googleLogin.addEventListener("click", function(e) {
    window.open("/auth/google", "_self");
});


const signupButton = document.querySelector(".signup-button");

signupButton.addEventListener("click", function(e) {
    window.open("/signup", "_self");
})