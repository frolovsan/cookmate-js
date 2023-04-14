const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/images/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
  fieldname: 'image',
});

const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 10, // 10 MB
  },
  dest: 'public/images/',
  storage,
});
const render = require('../lib/render');
const NewRecipe = require('../views/NewRecipe');
const { Recipe } = require('../db/models');

router.get('/', (req, res) => {
  render(NewRecipe, {}, res, req);
});

router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const { filename } = req.file;
    const image = `images/${filename}`;
    const recipe = await Recipe.create({
      name,
      description,
      image,
      userId: req.session.userId,
    });
    if (recipe) {
      res.json({ msg: 'Рецепт добавлен!' });
    } else {
      res.json({ msg: 'Рецепт не добавлен, повторите попытку' });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
