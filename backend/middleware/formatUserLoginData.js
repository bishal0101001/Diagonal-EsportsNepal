module.exports = function (req, res, next) {
  let { email, password } = req.body;

  if (email) req.body.email = email.toLowerCase().trim();
  if (password) req.body.password = password.trim();

  next();
};
