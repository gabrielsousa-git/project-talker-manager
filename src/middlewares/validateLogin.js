const validateEmail = (email, res) => {
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  const REGEX_EMAIL = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!REGEX_EMAIL.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
};

const validatePassword = (password, res) => {
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
};

const validation = async (req, res, next) => {
  const { email, password } = req.body;
  return validateEmail(email, res)
  || validatePassword(password, res)
  || next();
};

module.exports = {
  validation,
};