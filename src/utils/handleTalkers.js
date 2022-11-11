const fs = require('fs').promises;
const path = require('path');

const readTalkersData = async () => {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
    const talkers = JSON.parse(data);
    return talkers;
  } catch (error) {
    console.log(`Erro na leitura do arquivo: ${error}`);
  }
};

const addTalker = async (talker) => {
  const talkers = await readTalkersData();
  const newTalker = { id: talkers.length + 1, ...talker };
  talkers.push(newTalker);
  await fs.writeFile(path.resolve(__dirname, '../talker.json'), JSON.stringify(talkers));
  return newTalker;
};

module.exports = {
  readTalkersData,
  addTalker,
};