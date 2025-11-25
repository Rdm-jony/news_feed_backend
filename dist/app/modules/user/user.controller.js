"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const user_service_1 = require("./user.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const setCookies_1 = require("../../utils/setCookies");
const createUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = Object.assign(Object.assign({}, req.body), { avatarUrl: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path });
    const user = yield user_service_1.UserService.createUser(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "user create successfully",
        data: user,
    });
}));
const userLogIn = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield user_service_1.UserService.userLogIn(req.body);
    (0, setCookies_1.setAuthCookie)(res, { accessToken: userInfo.accessToken, refreshToken: userInfo.refreshToken });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "user Logged In successfully",
        data: userInfo.user,
    });
}));
const getMe = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    const user = yield user_service_1.UserService.getMe(decodedToken.userId);
    (0, sendResponse_1.sendResponse)(res, {
        data: user,
        message: "user retrived successfully",
        statusCode: http_status_codes_1.default.OK,
        success: true
    });
}));
exports.UserController = { createUser, userLogIn, getMe };
