const router = require('express').Router();
const bcrypt = require('bcrypt');
const render = require('../lib/render');
const Register = require('../views/UserRegister');
const { User } = require('../db/models');

router.get('/', (req, res) => {
  render(Register, {}, res, req);
});

router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashPass = await bcrypt.hash(password, 10);
    const user = await User.findOrCreate({
      where: { email },
      defaults: { name, password: hashPass },
    });
    if (user[1]) {
      res.json({ msg: 'Пользователь зарегистрирован' });
    } else {
      res.json({ msg: 'Пользователь уже существует' });
    }
  } catch (error) {
    console.log('Ошибка при создании пользователя', error);
  }
});

module.exports = router;
