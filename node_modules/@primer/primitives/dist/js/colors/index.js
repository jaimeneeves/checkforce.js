"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const light_1 = __importDefault(require("./light"));
const light_high_contrast_1 = __importDefault(require("./light_high_contrast"));
const light_colorblind_1 = __importDefault(require("./light_colorblind"));
const dark_1 = __importDefault(require("./dark"));
const dark_dimmed_1 = __importDefault(require("./dark_dimmed"));
const dark_high_contrast_1 = __importDefault(require("./dark_high_contrast"));
const dark_colorblind_1 = __importDefault(require("./dark_colorblind"));
exports.default = { light: light_1.default, light_high_contrast: light_high_contrast_1.default, light_colorblind: light_colorblind_1.default, dark: dark_1.default, dark_dimmed: dark_dimmed_1.default, dark_high_contrast: dark_high_contrast_1.default, dark_colorblind: dark_colorblind_1.default };
