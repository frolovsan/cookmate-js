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
  const recipes = await Recipe.findAll();
  const recipesArr = await recipes.map((item) => item.get({ plain: true }));
  const user = req.session.userId;
  render(Main, { recipesArr, user }, res, req);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Recipe.destroy({ where: { id } });
  } catch (error) {
    console.log(error);
  }
});

// route.post('/result', async (req, res) => {
//   try {
//     const response = await openai.createCompletion({
//       model: 'text-davinci-003',
//       prompt: 'What are 3 key points I should know when studying Python?',
//       temperature: 0.3,
//       max_tokens: 150,
//       top_p: 1.0,
//       frequency_penalty: 0.0,
//       presence_penalty: 0.0,
//     });
//     return res.status(200).json({
//       success: true,
//       data: response.data.choices[0].text,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
