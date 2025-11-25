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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const AppError_1 = __importDefault(require("../../errorHeplers/AppError"));
const user_model_1 = require("./user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("../../config/env");
const userTokens_1 = require("../../utils/userTokens");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const email = payload.email;
    const isUserExists = yield user_model_1.User.findOne({ email });
    if (isUserExists) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "user already exists!!");
    }
    const hashPassword = bcryptjs_1.default.hashSync(payload.password, parseInt(env_1.envVars.BCRYPT_SALT));
    const user = yield user_model_1.User.create(Object.assign(Object.assign({}, payload), { password: hashPassword }));
    const _a = user.toObject(), { password } = _a, safeUser = __rest(_a, ["password"]);
    return safeUser;
});
const userLogIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Invalid email or password");
    }
    const isPasswordValid = bcryptjs_1.default.compareSync(payload.password, user.password);
    if (!isPasswordValid) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Invalid email or password");
    }
    const userTokens = (0, userTokens_1.createUserTokens)(user);
    const _a = user.toObject(), { password: _ } = _a, safeUser = __rest(_a, ["password"]);
    return {
        user: safeUser,
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken
    };
});
const getMe = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.User.findById(userId).select("-password");
    if (!isUserExists) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "user not found!");
    }
    return isUserExists;
});
exports.UserService = { createUser, getMe, userLogIn };
