BOT_TOKEN =
  process.env.BOT_TOKEN || "6352877186:AAGY3B9vdgQ0QKx-Y7UiC1oqLtBYxAeiC_U";

const TelegramBot = require("node-telegram-bot-api");

const adminChatID = 630296946;
const token = BOT_TOKEN;
const url =
  process.env.WEBHOOK_URL ||
  "https://cdd75bf8-2389-4e96-b79e-501f39c017eb-botdemo-lt.ctdn.net/webhook";

const bot = new TelegramBot(
  token
  // { polling: true }
);

bot.setWebHook(url);

// Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   console.log("Chat ID = " + chatId)
//   const resp = match[1]; // the captured "whatever"

// //   bot.sendMessage(chatId, resp);
//     bot.sendMessage(chatId, "Your ID: " + chatId)
// });

const books = [
  {
    title: "ABC Book",
    description: "This is a book",
  },
  {
    title: "ABC Book 2",
    description: "This is a book 2",
  },
];

// console.log("Bot server is running...")
// Listen for any kind of message. There are different kinds of
// messages.
// bot.on("message", (msg) => {
//   const chatId = msg.chat.id;
//   const command = msg.text

//   if (command.startsWith("/getid")) {
//     bot.sendMessage(chatId, "Your ID is: " + chatId)
//     return;
//   }

//   if (command.startsWith("/menglang")) {
//     bot.sendMessage(chatId, "I'm Menglang")
//     return;
//   }

//   if (command.startsWith("/books")) {
//     let str = ""
//     for (b in books) {
//         str += '\nTitle: ' + b.title;
//     }
//     bot.sendMessage(chatId, str)
//     return;
//   }

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, "Received your message");
// //   bot.sendMessage(298903145, "New message: " + msg.text)
// });

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("", (req, res) => {
  res.send("ok");
});

app.post("/webhook", (req, res) => {
  const data = req.body;
  console.log("Payload", data);
  const chatId = data.message.chat.id;

  const msgId = data.message.message_id;
  const text = data.message.text || "";

  if (text?.startsWith("/books")) {
    str = "";
    books.forEach((b) => {
      str += "\nTitle: " + b.title;
    });

    bot.sendMessage(chatId, str);
  } else {
    //bot.sendMessage(chatId, "Ok I'm received");
    // bot.forwardMessage(-964340751, 630296946, 57)
    bot.sendMessage(chatId, "I'm received, thanks!");

    // forward to admin chat
    bot.forwardMessage(adminChatID, chatId, msgId);
  }

  bot.send;
  res.send("ok");
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log("Server is listening on " + port);
});
