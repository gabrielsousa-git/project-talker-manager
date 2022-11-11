const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { readTalkersData, addTalker, editTalker } = require('./utils/handleTalkers');
const { validation } = require('./middlewares/validateLogin');
const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('./middlewares/validateNewTalker');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const talkers = await readTalkersData();
  res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const talkers = await readTalkersData();
  const talker = talkers.find((talkerId) => talkerId.id === Number(id));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(talker);
});

app.post('/login', validation, async (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');

  return res.status(200).json({ token });
});

app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const newTalker = await addTalker({ name, age, talk });
    return res.status(201).json(newTalker);
});

app.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talker = await editTalker(Number(id), { name, age, talk });
    return res.status(200).json(talker);
});