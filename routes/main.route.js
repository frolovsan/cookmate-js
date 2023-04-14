const express = require('express');

const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const router = express.Router();

const render = require('../lib/render');
const Main = require('../views/Main');
const { Recipe } = require('../db/models');

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

router.get('/', async (req, res) => {
  console.log('В РУЧКЕ /');
  const recipes = await Recipe.findAll({
    order: [['updatedAt', 'DESC']],
  });
  const recipesArr = await recipes.map((item) => item.get({ plain: true }));
  const user = req.session.userId;
  render(Main, { recipesArr, user }, res, req);
});

router.put('/edit/:id', async (req, res) => {
  console.log('В РУЧКЕ ИЗМЕНЕНИЙ');
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    await Recipe.update({ name, description }, { where: { id } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  console.log('В РУЧКЕ /ID');
  const { id } = req.params;
  try {
    await Recipe.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post('/theme', async (req, res) => {
  console.log('ПОПАЛИ В РУЧКУ ТЕМЫ');
  try {
    const { theme } = req.body;
    console.log('theme========>', theme)
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `The CSS code for a color like ${theme}:\n\nbackground-color: #`,
      temperature: 0,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: [';'],
    });
    res.status(200).json({
      success: true,
      data: response.data.choices[0].text,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
