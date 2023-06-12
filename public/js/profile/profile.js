
const signOut = document.getElementById("signout");
const resetPass = document.getElementById("reset-pass");

signOut.addEventListener("click", function(e) {
    fetch("/logout", {
        method: "POST",
    }).then(function(resp) {
        window.open("/", "_self");
    });
});

resetPass.addEventListener("click", function(e) {
    window.open("/pass-change", "_self");
})



