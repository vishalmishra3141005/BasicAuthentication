
module.exports.login = function(req, res) {
    res.render("login", { title: "Login" });
}

module.exports.signup = function(req, res) {
    res.render("signup", { title: "SignUp" });
}

module.exports.profile = function(req, res) {
    res.render("profile", { title: "Profile" });
}

