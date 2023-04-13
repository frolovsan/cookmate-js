const router = require('express').Router();
const bcrypt = require('bcrypt');
const render = require('../lib/render');
const Login = require('../views/UserLogin');
const { User } = require('../db/models');

router.get('/', (req, res) => {
  render(Login, {}, res, req);
});

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      const passCheck = await bcrypt.compare(password, user.password);
      if (passCheck) {
        req.session.user = user.name;
        req.session.userId = user.id;
        res.json({ msg: 'Успешно вошли в систему!', name: user.name });
      } else {
        res.json({ msg: 'Неверный пароль!' });
      }
    } else {
      res.json({ msg: 'Такой юзер не найден, зарегистрируйтесь' });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
