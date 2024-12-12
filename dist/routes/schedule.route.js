"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleRoute = void 0;
const express_1 = __importDefault(require("express"));
const scheduleController_1 = require("../controllers/scheduleController");
const authenticate_1 = require("../middlewares/authenticate");
exports.scheduleRoute = express_1.default.Router();
exports.scheduleRoute.post("/create-schedule", authenticate_1.authenticate, scheduleController_1.createSchedule);
exports.scheduleRoute.get("/get-schedule", scheduleController_1.getSchedules);
exports.scheduleRoute.get("/get-schedule-trainer", authenticate_1.authenticate, scheduleController_1.getTrainerSchedules);
