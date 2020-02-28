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
var axios_1 = require("axios");
var lodash_1 = require("lodash");
var flow = require("dotenv-flow");
flow.config();
var apiKey = process.env.EVERHOUR_API;
var instance = axios_1.default.create({
    baseURL: "https://api.everhour.com/",
    timeout: 50000,
    headers: { "X-Api-Key": apiKey }
});
function getUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, instance.get("/team/users")];
                case 1:
                    data = (_a.sent()).data;
                    return [2 /*return*/, data];
            }
        });
    });
}
function getProjects() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, instance.get("/projects?platform=as")];
                case 1:
                    data = (_a.sent()).data;
                    return [2 /*return*/, data];
            }
        });
    });
}
function getTime(date) {
    return __awaiter(this, void 0, void 0, function () {
        var allowedFieds, now, month, day, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    allowedFieds = ['date', 'user', 'project', 'task'];
                    now = new Date();
                    month = ("0" + (now.getMonth() + 1)).slice(-2);
                    day = ("0" + now.getDate()).slice(-2);
                    return [4 /*yield*/, instance.get("/team/time/export?from=" + date + "&to=" + (now.getFullYear() + "-" + month + "-" + day) + "&fields=" + allowedFieds.join(','))];
                case 1:
                    data = (_a.sent()).data;
                    return [2 /*return*/, data];
            }
        });
    });
}
function getEverhourData(date) {
    return __awaiter(this, void 0, void 0, function () {
        var data, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    data = {
                        users: [],
                        projects: [],
                        time: []
                    };
                    _a = data;
                    return [4 /*yield*/, getUsers()];
                case 1:
                    _a.users = _d.sent();
                    _b = data;
                    return [4 /*yield*/, getTime(date)];
                case 2:
                    _b.time = _d.sent();
                    _c = data;
                    return [4 /*yield*/, getProjects()];
                case 3:
                    _c.projects = _d.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
function getFormattedDataForDatabase(date) {
    return __awaiter(this, void 0, void 0, function () {
        function getProjectRateById(id, userId) {
            var project = data.projects.find(function (el) { return el.id === id; });
            if (project !== undefined &&
                project.rate !== undefined &&
                project.rate.type === "user_rate") {
                return userId in project.rate.userRateOverrides
                    ? project.rate.userRateOverrides[userId]
                    : getUserRateById(userId);
            }
            if (project !== undefined &&
                project.rate !== undefined &&
                project.rate.type === "user_rate") {
                return userId in project.rate.userRateOverrides
                    ? project.rate.userRateOverrides[userId]
                    : getUserRateById(userId);
            }
            return project && project.rate && project.rate.rate ? project.rate.rate : 0;
        }
        function getUserCostById(id) {
            var user = data.users.find(function (el) { return el.id === id; });
            return user !== undefined ? user.cost : 0;
        }
        function getUserRateById(id) {
            var user = data.users.find(function (el) { return el.id === id; });
            return user !== undefined ? user.rate : 0;
        }
        function getBillableAmount(time, projectId, userId) {
            return ((time / 3600) * getProjectRateById(projectId, userId)) / 100;
        }
        function getCost(time, userId) {
            return ((time / 3600) * getUserCostById(userId)) / 100;
        }
        var data, result, i, userName, userId, taskName, projectId, projectName, formattedEntry;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getEverhourData(date)];
                case 1:
                    data = _a.sent();
                    result = [];
                    for (i = 0; i < data.time.length; i++) {
                        userName = lodash_1.get(data, ["time", i, "user", "name"], "No User Name");
                        userId = lodash_1.get(data, ["time", i, "user", "id"], "No User Id");
                        taskName = lodash_1.get(data, ["time", i, "task", "name"], "No Task Name");
                        projectId = lodash_1.get(data, ["time", i, "project", "id"], "No Project Id");
                        projectName = lodash_1.get(data, ["time", i, "project", "name"], "No Project Name");
                        formattedEntry = {
                            member: userName,
                            task: taskName,
                            billable_amount: data.time[i].project
                                ? getBillableAmount(data.time[i].time, projectId, userId)
                                : 0,
                            cost: getCost(data.time[i].time, userId),
                            profit: data.time[i].project
                                ? getBillableAmount(data.time[i].time, projectId, userId) -
                                    getCost(data.time[i].time, userId)
                                : 0,
                            negative_estimation: 0,
                            positive_estimation: 0,
                            task_id: "{data.time[i].task.id}",
                            date: data.time[i].date,
                            time: data.time[i].time / 3600,
                            project_id: projectId,
                            project_name: projectName,
                            member_id: userId
                        };
                        result.push(formattedEntry);
                    }
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.getFormattedDataForDatabase = getFormattedDataForDatabase;
//# sourceMappingURL=everhour.js.map