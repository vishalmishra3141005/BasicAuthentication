
const signOut = document.getElementById("signout");

signOut.addEventListener("click", function(e) {
    fetch("/logout", {
        method: "POST",
    }).then(function(resp) {
        window.open("/", "_self");
    });
});
