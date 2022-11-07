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

module.exports = {
  readTalkersData,
};