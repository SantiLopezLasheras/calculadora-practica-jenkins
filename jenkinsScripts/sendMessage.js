import TelegramBot from "node-telegram-bot-api";
const chatId = process.argv[2];
const botToken = process.argv[7];
const bot = new TelegramBot(botToken, { polling: true });

// variables con los resultados
const resultadoLinter = process.argv[3];
const resultadoTest = process.argv[4];
const resultadoUpdateReadme = process.argv[5];
const resultadoDeploy = process.argv[6];

const message = `
S'ha executat la pipeline de jenkins amb els següents resultats:
- Linter_stage: ${resultadoLinter}
- Test_stage: ${resultadoTest}
- Update_readme_stage: ${resultadoUpdateReadme}
- Deploy_to_Vercel_stage: ${resultadoDeploy}
`;
bot
  .sendMessage(chatId, message)
  .then(() => {
    console.log(
      "Mensaje de Telegram enviado con los resultados de los stages."
    );
    process.exit(0);
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
