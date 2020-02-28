"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var rp = require("request-promise");
var flow = require("dotenv-flow");
var TelegramBot = require("node-telegram-bot-api");
var dayjs = require("dayjs");
var customParseFormat = require("dayjs/plugin/customParseFormat");
var script_1 = require("../script");
flow.config();
dayjs.extend(customParseFormat);
function sendToUser(chat_id, text) {
    return __awaiter(this, void 0, void 0, function () {
        var options;
        return __generator(this, function (_a) {
            options = {
                method: "GET",
                uri: "https://api.telegram.org/bot765715761:AAHQujjcLGjy7xt5rV07mVo43TrJr7I3fLM/sendMessage",
                qs: {
                    chat_id: chat_id,
                    text: text
                }
            };
            return [2 /*return*/, rp(options)];
        });
    });
}
exports.sendToUser = sendToUser;
function initiateBot() {
    var _this = this;
    var bot = new TelegramBot("765715761:AAHQujjcLGjy7xt5rV07mVo43TrJr7I3fLM", {
        polling: true
    });
    bot.onText(/\/sync (.+)/, function (msg, match) { return __awaiter(_this, void 0, void 0, function () {
        var chatId, startDateDayJS, formattedDate, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    chatId = msg.chat.id;
                    startDateDayJS = dayjs(match[1], 'YYYY-MM-DD');
                    if (!!startDateDayJS.isValid()) return [3 /*break*/, 1];
                    sendToUser(chatId, '⚠️ ERROR: Wrong date format. Pleae Use YYYY-MM-DD');
                    return [3 /*break*/, 3];
                case 1:
                    formattedDate = startDateDayJS.format('YYYY-MM-DD');
                    sendToUser(chatId, "\u2699\uFE0F Start Date is " + formattedDate + ". Doing sync...");
                    return [4 /*yield*/, script_1.sync(formattedDate)];
                case 2:
                    result = _a.sent();
                    sendToUser(chatId, result);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); });
    bot.on("message", function (msg) {
        var chatId = msg.chat.id;
        bot.sendMessage(chatId, "Received your message, thanks.");
    });
}
exports.initiateBot = initiateBot;
//# sourceMappingURL=bot.js.map