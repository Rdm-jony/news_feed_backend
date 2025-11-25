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
exports.globalErrorHandler = void 0;
const env_1 = require("../config/env");
const cloudinary_config_1 = require("../config/cloudinary.config");
const ZodError_1 = require("../errorHeplers/ZodError");
const ValidationError_1 = require("../errorHeplers/ValidationError");
const DuplicateError_1 = require("../errorHeplers/DuplicateError");
const CastErroor_1 = require("../errorHeplers/CastErroor");
const AppError_1 = __importDefault(require("../errorHeplers/AppError"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let statusCode = 500;
    let message = "something went wrong!";
    if (req.file) {
        yield (0, cloudinary_config_1.deleteImageFromCLoudinary)(req.file.path);
    }
    if (req.files && Array.isArray(req.files) && req.files.length) {
        const imageUrls = req.files.map(file => file.path);
        yield Promise.all(imageUrls.map(url => (0, cloudinary_config_1.deleteImageFromCLoudinary)(url)));
    }
    let errorSources = [];
    if (err.name === 'ZodError') {
        const simplyfiedError = (0, ZodError_1.handleZodeError)(err);
        statusCode = simplyfiedError.statusCode;
        message = simplyfiedError.message;
        errorSources = simplyfiedError.errorSources;
    }
    else if (err.name === "ValidationError") {
        const simplyfiedError = (0, ValidationError_1.handleValidationError)(err);
        statusCode = simplyfiedError.statusCode;
        message = simplyfiedError.message;
        errorSources = simplyfiedError.errorSources;
    }
    else if (err.code == 11000) {
        const simplyfiedError = (0, DuplicateError_1.handleDuplicateError)(err);
        statusCode = simplyfiedError.statusCode;
        message = simplyfiedError.message;
    }
    else if (err.name === "CastError") {
        const simplyfiedError = (0, CastErroor_1.handleCastError)();
        statusCode = simplyfiedError.statusCode;
        message = simplyfiedError.message;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }
    res.status(statusCode).json({
        message,
        errorSources,
        err: env_1.envVars.NODE_ENV == "development" ? err : null,
        stack: env_1.envVars.NODE_ENV == "development" ? err.stack : null
    });
});
exports.globalErrorHandler = globalErrorHandler;
