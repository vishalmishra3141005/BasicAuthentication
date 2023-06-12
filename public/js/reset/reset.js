
const pass = document.getElementById("pass");
const conPass = document.getElementById("con-pass");

const submit = document.getElementById("submit");

submit.addEventListener("click", function(e) {
   if (pass.value !== conPass.value) {
       e.preventDefault();
       alert("Password should be same");
   }
});