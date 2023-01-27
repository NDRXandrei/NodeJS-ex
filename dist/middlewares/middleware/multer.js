"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMulterMiddleware = exports.multerOptions = exports.generatePhotoFilename = void 0;
const multer_1 = __importDefault(require("multer"));
const crypto_1 = require("crypto");
const mime_1 = __importDefault(require("mime"));
const generatePhotoFilename = (mimeType) => {
    const randomFileName = `${(0, crypto_1.randomUUID)()}-${Date.now()}`;
    const fileExtension = mime_1.default.getExtension(mimeType);
    const fileName = `${randomFileName}.${fileExtension}`;
    return fileName;
};
exports.generatePhotoFilename = generatePhotoFilename;
const storage = multer_1.default.diskStorage({
    destination: "uploads/",
    filename: (request, file, callback) => {
        return callback(null, (0, exports.generatePhotoFilename)(file.mimetype));
    },
});
exports.multerOptions = {};
const initMulterMiddleware = () => {
    return (0, multer_1.default)(Object.assign({ storage }, exports.multerOptions));
};
exports.initMulterMiddleware = initMulterMiddleware;
//# sourceMappingURL=multer.js.map