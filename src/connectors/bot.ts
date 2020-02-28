import * as rp from "request-promise";
import * as flow from "dotenv-flow";
import * as TelegramBot from "node-telegram-bot-api";
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

import { sync } from '../script';

flow.config();
dayjs.extend(customParseFormat);

export async function sendToUser(chat_id, text) {
  const options = {
    method: "GET",
    uri: `https://api.telegram.org/bot765715761:AAHQujjcLGjy7xt5rV07mVo43TrJr7I3fLM/sendMessage`,
    qs: {
      chat_id,
      text
    }
  };

  return rp(options);
}

export function initiateBot() {
  const bot = new TelegramBot("765715761:AAHQujjcLGjy7xt5rV07mVo43TrJr7I3fLM", {
    polling: true
  });

  bot.onText(/\/sync (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const startDateDayJS = dayjs(match[1], 'YYYY-MM-DD');
    if(!startDateDayJS.isValid()) {
      sendToUser(chatId, '⚠️ ERROR: Wrong date format. Pleae Use YYYY-MM-DD');
    } else {
      const formattedDate = startDateDayJS.format('YYYY-MM-DD');
      sendToUser(chatId, `⚙️ Start Date is ${formattedDate}. Doing sync...`);
      const result = await sync(formattedDate);
      sendToUser(chatId, result);
    }
  });


  bot.on("message", msg => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Received your message, thanks.");
  });
}
