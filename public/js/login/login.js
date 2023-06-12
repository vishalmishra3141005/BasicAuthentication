
const googleLogin = document.getElementById("google-login");

googleLogin.addEventListener("click", function(e) {
    window.open("/auth/google", "_self");
});
