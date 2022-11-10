const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { readTalkersData } = require('./utils/handleTalkers');

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

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const token = crypto.randomBytes(8).toString('hex');

  if (!email || !password) {
    return res.status(400).json({ message: 'O email e a senha são obrigatórios' });
  } 

  return res.status(200).json({ token });
});