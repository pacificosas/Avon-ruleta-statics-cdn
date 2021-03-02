/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./typescript/avonRoulette.ts":
/*!************************************!*\
  !*** ./typescript/avonRoulette.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.avonRoulette = void 0;
var appChain_pattern_1 = __webpack_require__(/*! ./patterns/appChain.pattern */ "./typescript/patterns/appChain.pattern.ts");
var roulete_getter_middelware_1 = __webpack_require__(/*! ./middlewares/roulete-getter.middelware */ "./typescript/middlewares/roulete-getter.middelware.ts");
var roulette_trigger_middleware_1 = __webpack_require__(/*! ./middlewares/roulette-trigger.middleware */ "./typescript/middlewares/roulette-trigger.middleware.ts");
var req_model_1 = __webpack_require__(/*! ./models/req.model */ "./typescript/models/req.model.ts");
var cupon_getter_middleware_1 = __webpack_require__(/*! ./middlewares/cupon-getter.middleware */ "./typescript/middlewares/cupon-getter.middleware.ts");
var roulette_iu_middleware_1 = __webpack_require__(/*! ./middlewares/roulette-iu.middleware */ "./typescript/middlewares/roulette-iu.middleware.ts");
var cupon_alert_middlerware_1 = __webpack_require__(/*! ./middlewares/cupon-alert.middlerware */ "./typescript/middlewares/cupon-alert.middlerware.ts");
var cupon_checkout_middleware_1 = __webpack_require__(/*! ./middlewares/cupon-checkout.middleware */ "./typescript/middlewares/cupon-checkout.middleware.ts");
var styles_middleware_1 = __webpack_require__(/*! ./middlewares/styles.middleware */ "./typescript/middlewares/styles.middleware.ts");
var devLog_tool_1 = __webpack_require__(/*! ./tools/devLog.tool */ "./typescript/tools/devLog.tool.ts");
var cupon_input_middleware_1 = __webpack_require__(/*! ./middlewares/cupon-input.middleware */ "./typescript/middlewares/cupon-input.middleware.ts");
function avonRoulette() {
    var app = new appChain_pattern_1.AppChain();
    devLog_tool_1.devLog("avon roulette injected");
    app.use("^/cart/?$", styles_middleware_1.styles);
    app.use("^/cart/?$", roulete_getter_middelware_1.getRoulette);
    app.use("^/cart/?$", roulette_trigger_middleware_1.rouletteTrigger);
    app.use("^/cart/?$", cupon_alert_middlerware_1.cuponAlert);
    app.use("^/cart/?$", cupon_input_middleware_1.cuponInput);
    app.use("^/cart/?$", cupon_getter_middleware_1.cuponGetter);
    app.use("^/cart/?$", roulette_iu_middleware_1.rouletteUi);
    app.use("^/checkoutdirectdelivery/.*", cupon_checkout_middleware_1.cuponCheckout);
    var appconfig = new req_model_1.ReqModel();
    appconfig.view = window.location.pathname;
    app.run(appconfig);
}
exports.avonRoulette = avonRoulette;


/***/ }),

/***/ "./typescript/environment.ts":
/*!***********************************!*\
  !*** ./typescript/environment.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.environment = void 0;
var imgStore_1 = __webpack_require__(/*! ./tools/imgStore */ "./typescript/tools/imgStore.ts");
exports.environment = {
    production: true,
    apiUrl: "https://ruleta.avoncpe.com/api/",
    staticsUrl: "https://cdn.jsdelivr.net/gh/pacificosas/avon-ruleta-statics-cdn@1/img/",
    styles: [
        "https://cdn.jsdelivr.net/gh/pacificosas/avon-ruleta-statics-cdn@1/dist/css/index.css"
    ],
    // apiUrl: "https://localhost:5001/api/",
    // staticsUrl:"http://127.0.0.1:5500/img/",
    // styles:[
    //     "http://127.0.0.1:5500/dist/css/index.css"
    // ],
    get currentCountry() {
        switch (window.location.hostname) {
            case "www.avon.co":
                return "co";
                break;
            case "www.avon.com.ec":
                return "ec";
            case "www.avon.com.pe":
                return "pe";
            default:
                break;
        }
    },
    get winPositions() {
        return Object.keys(this.wheel.winTypesPositions);
    },
    imgStore: new imgStore_1.ImgStore(),
    wheel: {
        sides: 12,
        winTypesPositions: {
            0: "100%",
            2: "30%",
            4: "20%",
            6: "50%",
            8: "30%",
            10: "40%"
        }
    }
};


/***/ }),

/***/ "./typescript/middlewares/cupon-alert.middlerware.ts":
/*!***********************************************************!*\
  !*** ./typescript/middlewares/cupon-alert.middlerware.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cuponAlert = void 0;
var popup_tool_1 = __webpack_require__(/*! ../tools/popup.tool */ "./typescript/tools/popup.tool.ts");
function cuponAlert(req, res, next) {
    var btn = document.querySelector("a.vi-btn--secondary:nth-child(2)");
    var body = document.body;
    var popup = new popup_tool_1.Popup;
    btn.addEventListener("click", function () {
        console.log(req);
        var card = document.createElement("div");
        card.classList.add("cupon-alert-popup");
        card.innerHTML = "\n            <h2>\n                Recuerda que debes estar seguro de tu compra antes de proceder al pago\n            </h2>\n        ";
        //anadir boton de continuar
        var btn = document.createElement("button");
        btn.classList.add("roulette-btn");
        btn.innerText = "Continuar";
        btn.addEventListener('click', function () { popup.close(); });
        card.append(btn);
        popup.build()
            .open();
        popup.card.append(card);
        popup.atatch(body);
    });
    next();
}
exports.cuponAlert = cuponAlert;


/***/ }),

/***/ "./typescript/middlewares/cupon-checkout.middleware.ts":
/*!*************************************************************!*\
  !*** ./typescript/middlewares/cupon-checkout.middleware.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cuponCheckout = void 0;
var servicesSingleton_pattern_1 = __webpack_require__(/*! ../patterns/servicesSingleton.pattern */ "./typescript/patterns/servicesSingleton.pattern.ts");
var devLog_tool_1 = __webpack_require__(/*! ../tools/devLog.tool */ "./typescript/tools/devLog.tool.ts");
var cuponService = servicesSingleton_pattern_1.ServiceSingleton.cupon;
var storageService = servicesSingleton_pattern_1.ServiceSingleton.storage;
function cuponCheckout() {
    // console.log("checkout");
    var cupon = JSON.parse(storageService.get("cupon", false));
    var cuponInput = storageService.get("cuponInput") || "";
    console.log(cupon);
    // console.log(cupon,cupon.code.trim(),cuponInput.trim(),cupon.code.trim() == cuponInput.trim());
    if (cupon && cupon.code && cupon.code.trim() == cuponInput.trim()) {
        devLog_tool_1.devLog('cupon checkout', "use");
        cuponService.use(cupon);
    }
    else {
        devLog_tool_1.devLog("cupon checkout", 'nothing to do');
    }
}
exports.cuponCheckout = cuponCheckout;


/***/ }),

/***/ "./typescript/middlewares/cupon-getter.middleware.ts":
/*!***********************************************************!*\
  !*** ./typescript/middlewares/cupon-getter.middleware.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cuponGetter = void 0;
var servicesSingleton_pattern_1 = __webpack_require__(/*! ../patterns/servicesSingleton.pattern */ "./typescript/patterns/servicesSingleton.pattern.ts");
var devLog_tool_1 = __webpack_require__(/*! ../tools/devLog.tool */ "./typescript/tools/devLog.tool.ts");
var cuponService = servicesSingleton_pattern_1.ServiceSingleton.cupon;
var storageService = servicesSingleton_pattern_1.ServiceSingleton.storage;
function cuponGetter(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var cupon;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!req.roulette || !req.playRoulette) {
                        console.log("asdasdasdasd");
                        return [2 /*return*/];
                    }
                    cupon = JSON.parse(storageService.get("cupon", false));
                    if (cupon && (!cupon.from || !cupon.code)) {
                        req.cupon = cupon;
                        next();
                    }
                    if (!(cupon == null || cupon.from !== req.roulette.id)) return [3 /*break*/, 2];
                    devLog_tool_1.devLog("get new", cupon);
                    return [4 /*yield*/, cuponService.getCupon(req.roulette.id)];
                case 1:
                    cupon = _a.sent();
                    if (cupon) {
                        devLog_tool_1.devLog("save cupon", cupon);
                        storageService.longSave('cupon', JSON.stringify(cupon));
                        req.cupon = cupon;
                        return [2 /*return*/, next()];
                    }
                    devLog_tool_1.devLog('no cupon');
                    return [2 /*return*/, next()];
                case 2:
                    req.cupon = cupon;
                    next();
                    return [2 /*return*/];
            }
        });
    });
}
exports.cuponGetter = cuponGetter;


/***/ }),

/***/ "./typescript/middlewares/cupon-input.middleware.ts":
/*!**********************************************************!*\
  !*** ./typescript/middlewares/cupon-input.middleware.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cuponInput = void 0;
var servicesSingleton_pattern_1 = __webpack_require__(/*! ../patterns/servicesSingleton.pattern */ "./typescript/patterns/servicesSingleton.pattern.ts");
var storageService = servicesSingleton_pattern_1.ServiceSingleton.storage;
function cuponInput(req, res, next) {
    var input = document.querySelector("#couponcode");
    input.addEventListener("change", function (e) {
        var target = e.target;
        req.cuponInput = target.value;
        storageService.shortSave("cuponInput", target.value);
    });
    next();
}
exports.cuponInput = cuponInput;


/***/ }),

/***/ "./typescript/middlewares/roulete-getter.middelware.ts":
/*!*************************************************************!*\
  !*** ./typescript/middlewares/roulete-getter.middelware.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRoulette = void 0;
var servicesSingleton_pattern_1 = __webpack_require__(/*! ../patterns/servicesSingleton.pattern */ "./typescript/patterns/servicesSingleton.pattern.ts");
var devLog_tool_1 = __webpack_require__(/*! ../tools/devLog.tool */ "./typescript/tools/devLog.tool.ts");
var storageService = servicesSingleton_pattern_1.ServiceSingleton.storage;
var rouletteService = servicesSingleton_pattern_1.ServiceSingleton.roulette;
function getRoulette(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var existingRoulette, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    existingRoulette = storageService.roulette;
                    devLog_tool_1.devLog(existingRoulette);
                    if (!!existingRoulette) return [3 /*break*/, 2];
                    _a = req;
                    return [4 /*yield*/, rouletteService.getRouletteData()];
                case 1:
                    _a.roulette = _b.sent();
                    if (!req.roulette) {
                        return [2 /*return*/];
                    }
                    storageService.roulette = req.roulette;
                    return [3 /*break*/, 3];
                case 2:
                    req.roulette = existingRoulette;
                    if (!req.roulette) {
                        return [2 /*return*/];
                    }
                    _b.label = 3;
                case 3:
                    next();
                    return [2 /*return*/];
            }
        });
    });
}
exports.getRoulette = getRoulette;


/***/ }),

/***/ "./typescript/middlewares/roulette-iu.middleware.ts":
/*!**********************************************************!*\
  !*** ./typescript/middlewares/roulette-iu.middleware.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rouletteUi = void 0;
var environment_1 = __webpack_require__(/*! ../environment */ "./typescript/environment.ts");
var uiData_model_1 = __webpack_require__(/*! ../models/uiData.model */ "./typescript/models/uiData.model.ts");
var noWinPosition_tool_1 = __webpack_require__(/*! ../tools/noWinPosition.tool */ "./typescript/tools/noWinPosition.tool.ts");
var uiGenerator_tool_1 = __webpack_require__(/*! ../tools/uiGenerator.tool */ "./typescript/tools/uiGenerator.tool.ts");
function rouletteUi(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var root, uidata, ui, ui, winTarget, winPositions, key, val;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!req.playRoulette) {
                        next();
                    }
                    root = document.querySelector("body");
                    uidata = new uiData_model_1.UiData(req.roulette.img, req.roulette.initContent, req.roulette.finalContent);
                    ui = new uiGenerator_tool_1.uiGenerator(root, req.cupon, uidata);
                    return [4 /*yield*/, ui.generate()];
                case 1:
                    ui = _a.sent();
                    ui.
                        attatch()
                        .open();
                    winPositions = environment_1.environment.winPositions;
                    if (req.cupon && req.cupon.type && req.cupon.code) {
                        for (key in environment_1.environment.wheel.winTypesPositions) {
                            val = environment_1.environment.wheel.winTypesPositions[key];
                            if (req.cupon.type.trim() === val) {
                                winTarget = Number(key);
                                break;
                            }
                        }
                        if (winTarget === null) {
                            winTarget = noWinPosition_tool_1.noWinPosition(environment_1.environment.wheel.sides, winPositions);
                        }
                    }
                    else if (!req.cupon || !winTarget) {
                        winTarget = noWinPosition_tool_1.noWinPosition(environment_1.environment.wheel.sides, winPositions);
                    }
                    ui.winTarget = winTarget;
                    return [2 /*return*/];
            }
        });
    });
}
exports.rouletteUi = rouletteUi;


/***/ }),

/***/ "./typescript/middlewares/roulette-trigger.middleware.ts":
/*!***************************************************************!*\
  !*** ./typescript/middlewares/roulette-trigger.middleware.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rouletteTrigger = void 0;
var servicesSingleton_pattern_1 = __webpack_require__(/*! ../patterns/servicesSingleton.pattern */ "./typescript/patterns/servicesSingleton.pattern.ts");
var checkoutReader_tool_1 = __webpack_require__(/*! ../tools/checkoutReader.tool */ "./typescript/tools/checkoutReader.tool.ts");
var productMatcher_tool_1 = __webpack_require__(/*! ../tools/productMatcher.tool */ "./typescript/tools/productMatcher.tool.ts");
var storageService = servicesSingleton_pattern_1.ServiceSingleton.storage;
var productsContainerSelector = ".Cart-Products";
var productsContainer;
var productList = new Array();
function rouletteTrigger(req, res, next) {
    var observer = new MutationObserver(function (m) {
        productsContainer = document.querySelector(productsContainerSelector);
        if (!productsContainer) {
            return;
        }
        productList = checkoutReader_tool_1.checkoutReader(productsContainer);
        var match = productMatcher_tool_1.productMatcher(productList);
        if (match) {
            req.playRoulette = true;
        }
        observer.disconnect();
        next();
    });
    observer.observe(document.body, {
        childList: true, subtree: true
    });
}
exports.rouletteTrigger = rouletteTrigger;


/***/ }),

/***/ "./typescript/middlewares/styles.middleware.ts":
/*!*****************************************************!*\
  !*** ./typescript/middlewares/styles.middleware.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.styles = void 0;
var environment_1 = __webpack_require__(/*! ../environment */ "./typescript/environment.ts");
function styles(req, res, next) {
    var classIdentifier = "roulette-styles";
    if (document.querySelectorAll(classIdentifier).length > 0) {
        next();
    }
    environment_1.environment.styles.forEach(function (url) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;
        link.classList.add(classIdentifier);
        document.body.prepend(link);
    });
    next();
}
exports.styles = styles;


/***/ }),

/***/ "./typescript/models/req.model.ts":
/*!****************************************!*\
  !*** ./typescript/models/req.model.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReqModel = void 0;
var ReqModel = /** @class */ (function () {
    function ReqModel(view, roulette, playRoulette, route, cupon, cuponInput) {
        if (view === void 0) { view = null; }
        if (roulette === void 0) { roulette = null; }
        if (playRoulette === void 0) { playRoulette = null; }
        if (route === void 0) { route = null; }
        if (cupon === void 0) { cupon = null; }
        if (cuponInput === void 0) { cuponInput = null; }
        this.view = view;
        this.roulette = roulette;
        this.playRoulette = playRoulette;
        this.route = route;
        this.cupon = cupon;
        this.cuponInput = cuponInput;
    }
    return ReqModel;
}());
exports.ReqModel = ReqModel;


/***/ }),

/***/ "./typescript/models/uiData.model.ts":
/*!*******************************************!*\
  !*** ./typescript/models/uiData.model.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UiData = void 0;
var UiData = /** @class */ (function () {
    function UiData(img, initContent, endContent) {
        if (img === void 0) { img = ""; }
        if (initContent === void 0) { initContent = ""; }
        if (endContent === void 0) { endContent = ""; }
        this.img = img;
        this.initContent = initContent;
        this.endContent = endContent;
    }
    return UiData;
}());
exports.UiData = UiData;


/***/ }),

/***/ "./typescript/patterns/appChain.pattern.ts":
/*!*************************************************!*\
  !*** ./typescript/patterns/appChain.pattern.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppChain = void 0;
var req_model_1 = __webpack_require__(/*! ../models/req.model */ "./typescript/models/req.model.ts");
var AppChain = /** @class */ (function () {
    // private setend;
    function AppChain() {
        this.middelwares = [];
    }
    ;
    AppChain.prototype.use = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length == 1) {
            this.middelwares.push({ func: args[0] });
        }
        else if (args.length == 2) {
            this.middelwares.push({ func: args[1], route: args[0] });
        }
    };
    AppChain.prototype.run = function (req, res, end) {
        if (req === void 0) { req = new req_model_1.ReqModel(); }
        if (res === void 0) { res = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _loop_1, this_1, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _loop_1 = function (i) {
                            var currentMiddleware;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        currentMiddleware = this_1.middelwares[i];
                                        req.route = currentMiddleware.route;
                                        if (!(window.location.pathname.match(new RegExp(req.route)) ||
                                            req.route == "*" ||
                                            req.route == "" ||
                                            !req.route)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, currentMiddleware.func(req, res, resolve)];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); })];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.middelwares.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AppChain;
}());
exports.AppChain = AppChain;


/***/ }),

/***/ "./typescript/patterns/servicesSingleton.pattern.ts":
/*!**********************************************************!*\
  !*** ./typescript/patterns/servicesSingleton.pattern.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceSingleton = void 0;
var cupon_service_1 = __webpack_require__(/*! ../services/cupon.service */ "./typescript/services/cupon.service.ts");
var roulette_service_1 = __webpack_require__(/*! ../services/roulette.service */ "./typescript/services/roulette.service.ts");
var storage_service_1 = __webpack_require__(/*! ../services/storage.service */ "./typescript/services/storage.service.ts");
var rouletteService;
var cuponService;
var storageService;
var ServiceSingleton = /** @class */ (function () {
    function ServiceSingleton() {
    }
    Object.defineProperty(ServiceSingleton, "roulette", {
        get: function () {
            if (!rouletteService) {
                rouletteService = new roulette_service_1.RouletteService();
            }
            return rouletteService;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServiceSingleton, "cupon", {
        get: function () {
            if (!cuponService) {
                cuponService = new cupon_service_1.CuponService();
            }
            return cuponService;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServiceSingleton, "storage", {
        get: function () {
            if (!storageService) {
                storageService = new storage_service_1.StorageService();
            }
            return storageService;
        },
        enumerable: false,
        configurable: true
    });
    return ServiceSingleton;
}());
exports.ServiceSingleton = ServiceSingleton;


/***/ }),

/***/ "./typescript/services/cupon.service.ts":
/*!**********************************************!*\
  !*** ./typescript/services/cupon.service.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CuponService = void 0;
var environment_1 = __webpack_require__(/*! ../environment */ "./typescript/environment.ts");
var CuponService = /** @class */ (function () {
    function CuponService() {
        this.serviceUrl = environment_1.environment.apiUrl + "cupons/";
    }
    CuponService.prototype.getCupon = function (rouletteId) {
        return __awaiter(this, void 0, void 0, function () {
            var raw, res, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(this.serviceUrl + ("deliver/" + rouletteId))];
                    case 1:
                        raw = _a.sent();
                        return [4 /*yield*/, raw.json()];
                    case 2:
                        res = _a.sent();
                        data = res.data;
                        console.log(res);
                        return [2 /*return*/, data];
                    case 3:
                        error_1 = _a.sent();
                        console.error("request roulette cupon fails");
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CuponService.prototype.use = function (cupon) {
        return __awaiter(this, void 0, void 0, function () {
            var raw, res, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(this.serviceUrl + ("use/" + cupon.code), { method: "post" })];
                    case 1:
                        raw = _a.sent();
                        return [4 /*yield*/, raw.json()];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res.success];
                    case 3:
                        error_2 = _a.sent();
                        console.error("request roulette cupon fails");
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return CuponService;
}());
exports.CuponService = CuponService;


/***/ }),

/***/ "./typescript/services/roulette.service.ts":
/*!*************************************************!*\
  !*** ./typescript/services/roulette.service.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RouletteService = void 0;
var environment_1 = __webpack_require__(/*! ../environment */ "./typescript/environment.ts");
var RouletteService = /** @class */ (function () {
    function RouletteService() {
        this.currentCountry = environment_1.environment.currentCountry || "co";
        this.serviceUrl = environment_1.environment.apiUrl + "roulette/";
    }
    RouletteService.prototype.getRouletteData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var raw, res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(this.serviceUrl + this.currentCountry + "/available")];
                    case 1:
                        raw = _a.sent();
                        return [4 /*yield*/, raw.json()];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                    case 3:
                        error_1 = _a.sent();
                        console.error("request roulette data fails");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return RouletteService;
}());
exports.RouletteService = RouletteService;


/***/ }),

/***/ "./typescript/services/storage.service.ts":
/*!************************************************!*\
  !*** ./typescript/services/storage.service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageService = void 0;
var StorageService = /** @class */ (function () {
    function StorageService() {
        this.baseKey = "roulette-data-";
    }
    Object.defineProperty(StorageService.prototype, "roulette", {
        get: function () {
            try {
                return JSON.parse(this.get("roulette"));
            }
            catch (_a) {
                return null;
            }
        },
        set: function (data) {
            this.shortSave("roulette", JSON.stringify(data));
        },
        enumerable: false,
        configurable: true
    });
    StorageService.prototype.shortSave = function (key, data) {
        sessionStorage.setItem("" + this.baseKey + key, data);
    };
    StorageService.prototype.get = function (key, short) {
        if (short === void 0) { short = true; }
        return short ?
            sessionStorage.getItem("" + this.baseKey + key) :
            localStorage.getItem("" + this.baseKey + key);
    };
    StorageService.prototype.longSave = function (key, data) {
        localStorage.setItem("" + this.baseKey + key, data);
    };
    return StorageService;
}());
exports.StorageService = StorageService;


/***/ }),

/***/ "./typescript/testMain.ts":
/*!********************************!*\
  !*** ./typescript/testMain.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var avonRoulette_1 = __webpack_require__(/*! ./avonRoulette */ "./typescript/avonRoulette.ts");
avonRoulette_1.avonRoulette();


/***/ }),

/***/ "./typescript/tools/checkoutReader.tool.ts":
/*!*************************************************!*\
  !*** ./typescript/tools/checkoutReader.tool.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkoutReader = void 0;
function checkoutReader(productsContainer) {
    var productList = new Array();
    productsContainer.querySelectorAll(".Cart-ProductName a").forEach(function (item) {
        productList.push(item.innerText);
    });
    return productList;
}
exports.checkoutReader = checkoutReader;


/***/ }),

/***/ "./typescript/tools/devLog.tool.ts":
/*!*****************************************!*\
  !*** ./typescript/tools/devLog.tool.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.devLog = void 0;
var environment_1 = __webpack_require__(/*! ../environment */ "./typescript/environment.ts");
function devLog() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (!environment_1.environment.production) {
        console.log.apply(console, args);
    }
}
exports.devLog = devLog;


/***/ }),

/***/ "./typescript/tools/imgStore.ts":
/*!**************************************!*\
  !*** ./typescript/tools/imgStore.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImgStore = void 0;
var devLog_tool_1 = __webpack_require__(/*! ./devLog.tool */ "./typescript/tools/devLog.tool.ts");
var ImgStore = /** @class */ (function () {
    function ImgStore() {
        this.images = new Array();
    }
    ImgStore.prototype.get = function (label) {
        var item = this.images.find(function (i) { return i.name == label; });
        devLog_tool_1.devLog("get imgStorage", item ? item.blob : null);
        return item ? item.blob : null;
    };
    ImgStore.prototype.add = function (label, url) {
        return __awaiter(this, void 0, void 0, function () {
            var blob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        devLog_tool_1.devLog("add imgStorage", "url, label", url, label);
                        if (this.get(label)) {
                            throw new Error("ImgStorage Error - trying to add new img: label " + label + " already exists");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.load(url)];
                    case 1:
                        blob = _a.sent();
                        this.images.push({
                            name: label,
                            blob: blob,
                            url: url
                        });
                        return [2 /*return*/, true];
                }
            });
        });
    };
    ImgStore.prototype.remove = function (label) {
        var target = this.images.find(function (i) { i.name == label; });
        window.URL.revokeObjectURL(target.blob);
        this.images.splice(this.images.indexOf(target), 1);
    };
    ImgStore.prototype.load = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var res, blob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.blob()];
                    case 2:
                        blob = _a.sent();
                        devLog_tool_1.devLog("fetch imgStorage", "url,blob", url, blob);
                        return [4 /*yield*/, URL.createObjectURL(blob)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ImgStore;
}());
exports.ImgStore = ImgStore;


/***/ }),

/***/ "./typescript/tools/noWinPosition.tool.ts":
/*!************************************************!*\
  !*** ./typescript/tools/noWinPosition.tool.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.noWinPosition = void 0;
function noWinPosition(wheelSides, winPositions) {
    var positions = new Array();
    var _loop_1 = function (i) {
        if (!winPositions.find(function (x) { return x == i.toString(); })) {
            positions.push(i);
        }
    };
    for (var i = 0; i < wheelSides; i++) {
        _loop_1(i);
    }
    var random = Math.round(Math.random() * positions.length);
    return positions[random];
}
exports.noWinPosition = noWinPosition;


/***/ }),

/***/ "./typescript/tools/popup.tool.ts":
/*!****************************************!*\
  !*** ./typescript/tools/popup.tool.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Popup = void 0;
var Popup = /** @class */ (function () {
    function Popup() {
    }
    Popup.prototype.build = function () {
        var overlay = document.createElement('div');
        overlay.classList.add("popup-overlay");
        var container = document.createElement('div');
        container.classList.add("popup");
        var closeBtn = document.createElement("div");
        closeBtn.classList.add("popup-closer");
        closeBtn.innerHTML = "&#xd7;";
        var card = document.createElement('div');
        card.classList.add("popup-card");
        container.append(card);
        container.append(closeBtn);
        this.overlay = overlay;
        this.container = container;
        this.card = card;
        this.eventListenners();
        return this;
    };
    Popup.prototype.atatch = function (parent) {
        parent.append(this.overlay);
        parent.append(this.container);
    };
    Popup.prototype.eventListenners = function () {
        var _this = this;
        this.container.querySelector('.popup-closer').addEventListener("click", function () {
            _this.close();
            if (_this.onClose) {
                _this.onClose();
            }
        });
        // this.overlay.addEventListener("click",()=>{
        //     this.close()
        // })
    };
    Popup.prototype.open = function () {
        window.scrollTo(0, 0);
        this.container.classList.remove("popup-close");
        this.container.classList.add("popup-open");
        this.overlay.classList.remove("popup-close");
        this.overlay.classList.add("popup-open");
        document.body.classList.add("no-scroll");
        return this;
    };
    Popup.prototype.close = function () {
        var _this = this;
        this.container.classList.remove("popup-open");
        this.container.classList.add("popup-close");
        this.overlay.classList.remove("popup-open");
        this.overlay.classList.add("popup-close");
        document.body.classList.remove("no-scroll");
        setTimeout(function () {
            _this.container.remove();
            _this.overlay.remove();
        }, 300);
        return this;
    };
    return Popup;
}());
exports.Popup = Popup;


/***/ }),

/***/ "./typescript/tools/productMatcher.tool.ts":
/*!*************************************************!*\
  !*** ./typescript/tools/productMatcher.tool.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.productMatcher = void 0;
var servicesSingleton_pattern_1 = __webpack_require__(/*! ../patterns/servicesSingleton.pattern */ "./typescript/patterns/servicesSingleton.pattern.ts");
var storageService = servicesSingleton_pattern_1.ServiceSingleton.storage;
function productMatcher(productList) {
    var _loop_1 = function (i) {
        var product = productList[i];
        match = storageService.roulette.products.find(function (item) {
            return item.matcher == product;
        });
        if (match) {
            return { value: match };
        }
    };
    var match;
    for (var i = 0; i < productList.length; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
}
exports.productMatcher = productMatcher;


/***/ }),

/***/ "./typescript/tools/uiGenerator.tool.ts":
/*!**********************************************!*\
  !*** ./typescript/tools/uiGenerator.tool.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uiGenerator = void 0;
var environment_1 = __webpack_require__(/*! ../environment */ "./typescript/environment.ts");
var devLog_tool_1 = __webpack_require__(/*! ./devLog.tool */ "./typescript/tools/devLog.tool.ts");
var noWinPosition_tool_1 = __webpack_require__(/*! ./noWinPosition.tool */ "./typescript/tools/noWinPosition.tool.ts");
var popup_tool_1 = __webpack_require__(/*! ./popup.tool */ "./typescript/tools/popup.tool.ts");
var uiGenerator = /** @class */ (function (_super) {
    __extends(uiGenerator, _super);
    function uiGenerator(parent, cupon, uidata) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.cupon = cupon;
        _this.uidata = uidata;
        _this.gameOver = false;
        return _this;
        // this.onClose=()=>{
        //     var input:HTMLInputElement=document.querySelector("#couponcode")
        //     if(input && cupon && cupon.code && this.gameOver){
        //         input.value=cupon.code
        //     }
        // }
    }
    Object.defineProperty(uiGenerator.prototype, "html", {
        get: function () {
            return this.container;
        },
        enumerable: false,
        configurable: true
    });
    uiGenerator.prototype.attatch = function () {
        _super.prototype.atatch.call(this, this.parent);
        return this;
    };
    uiGenerator.prototype.runRoulette = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.winTarget !== null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.play(this.winTarget)];
                    case 1:
                        _a.sent();
                        setTimeout(function () {
                            _this.gameOver = true;
                            _this.endGameContent();
                        }, 500);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    uiGenerator.prototype.generate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var card, col_1, col_2, roulette, roulettePin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadImages()];
                    case 1:
                        _a.sent();
                        _super.prototype.build.call(this);
                        card = document.createElement('div');
                        card.classList.add("roulette-card");
                        col_1 = document.createElement('div');
                        col_1.classList.add('col');
                        col_2 = document.createElement('div');
                        col_2.classList.add('col');
                        col_2.classList.add('data');
                        this.initContent(col_2);
                        roulette = document.createElement("img");
                        roulette.src = environment_1.environment.imgStore.get("rouletteWheel");
                        roulette.classList.add('roulette-wheel');
                        roulettePin = document.createElement("img");
                        roulettePin.src = environment_1.environment.imgStore.get("roulettePin");
                        roulettePin.classList.add('roulette-wheel-pin');
                        col_1.append(roulette);
                        col_1.append(roulettePin);
                        card.append(col_1);
                        card.append(col_2);
                        this.card.append(card);
                        this.roulette = roulette;
                        this.content = col_2;
                        return [2 /*return*/, this];
                }
            });
        });
    };
    uiGenerator.prototype.loadImages = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, environment_1.environment.imgStore.add("initTitle", this.uidata.img)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, environment_1.environment.imgStore.add("endTitle", environment_1.environment.staticsUrl + "title-end.png")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, environment_1.environment.imgStore.add("rouletteWheel", environment_1.environment.staticsUrl + "ruleta.png")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, environment_1.environment.imgStore.add("roulettePin", environment_1.environment.staticsUrl + "ruleta-pin.png")];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    uiGenerator.prototype.initContent = function (container) {
        container = container || this.content;
        container.innerHTML += "<img class=\"roulette-title-img\" src=\"" + (environment_1.environment.imgStore.get("initTitle") || "") + "\" alt=\"Ruleta Avon\"/>";
        container.innerHTML += this.getPercentTag();
        container.innerHTML += "\n            <div class=\"roulette-init-content\">\n                " + (this.uidata.initContent || "") + "\n            </div>\n        ";
        var btn = document.createElement("button");
        btn.innerText = "Gira la ruleta para ganar";
        btn.classList.add("roulette-btn");
        btn.addEventListener("click", this.runRoulette.bind(this));
        container.append(btn);
        return this;
    };
    uiGenerator.prototype.endGameContent = function () {
        var _this = this;
        var cupon = this.cupon;
        var container = this.content;
        var content;
        if (cupon.code) {
            content = "\n                <img src=\"" + environment_1.environment.imgStore.get("endTitle") + "\" class=\"roulette-final-title\">\n                \n                <p class=\"roulette-end-subtitle\"> Felicitaciones! Ganaste un cup\u00F3n por el <span class=\"accent\">" + cupon.type + "</span>  de descuento en tu compra \u00A1Corre a usarlo!<p>\n\n                <h2 class=\"roulette-cupon\"> <span>" + cupon.code + " </span>\n                    <svg class=\"icon\" id=\"Capa_1\" data-name=\"Capa 1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 53.63 61.28\"><defs><style>.cls-1{fill:#fff;}</style></defs><polygon class=\"cls-1\" points=\"12.59 0 12.59 9.13 41.58 9.13 41.58 52.07 53.63 52.07 53.63 0 12.59 0\"/><rect class=\"cls-1\" y=\"12.78\" width=\"38.22\" height=\"48.5\"/></svg>\n                </h2>\n                \n                <span class=\"roulette-bold\">*Este es tu c\u00F3digo. Ingr\u00E9salo y apl\u00EDcalo</span>\n\n                <div class=\"roulette-end-content \">\n                   " + (this.uidata.endContent || "") + "\n                </div>\n            ";
            container.innerHTML = content;
            container.querySelector(".icon").addEventListener("click", function () {
                var i = document.createElement("input");
                i.style.opacity = "0";
                i.style.position = "absolute";
                i.value = cupon.code;
                document.body.append(i);
                i.select();
                i.setSelectionRange(0, 99999);
                document.execCommand("copy");
                alert("Cupón copiado en portapapeles");
                i.remove();
            });
        }
        else {
            content = "\n                <h4 style=\"font-size:15px\"> Casi lo logras \u00A1Te deseamos una mejor suerte la pr\u00F3xima vez!</h4>\n            ";
            container.innerHTML = content;
        }
        var btn = document.createElement("button");
        btn.classList.add("roulette-btn");
        btn.innerText = "Continuar";
        btn.addEventListener('click', function () { _this.close(); });
        container.append(btn);
        return this;
    };
    uiGenerator.prototype.fixSize = function (container) {
        var height = window.getComputedStyle(container).getPropertyValue("height");
        var width = window.getComputedStyle(container).getPropertyValue("width");
        devLog_tool_1.devLog("fix-size: container, h, w", container, height, ",", width);
        container.style.height = height;
        container.style.width = width;
    };
    uiGenerator.prototype.play = function (targetZone, duration) {
        var _this = this;
        if (targetZone === void 0) { targetZone = 0; }
        if (duration === void 0) { duration = 3000; }
        var targetZone = targetZone;
        this.fixSize(this.container.querySelector(".col"));
        this.fixSize(this.container);
        return new Promise(function (resolve, reject) {
            var stop = false;
            var transform = window.innerWidth > 552 ? "translate(-45%, -50%)" : " translate(-50%, -50%)";
            var degrees = 0;
            if (targetZone >= environment_1.environment.wheel.sides || targetZone < 0) {
                reject(new Error("la zona de caida en ruleta solo puede ir desde 0 hasta un lados de la ruleta -1"));
            }
            setTimeout(function () {
                stop = true;
            }, duration);
            var stopAt = 360 - ((360 / environment_1.environment.wheel.sides) * targetZone);
            if (window.innerWidth <= 552) {
                stopAt = stopAt + 90 > 360 ? stopAt - 90 : stopAt + 90;
            }
            if (stopAt < 0) {
                targetZone = noWinPosition_tool_1.noWinPosition(environment_1.environment.wheel.sides, environment_1.environment.winPositions);
                var stopAt = ((360 / environment_1.environment.wheel.sides) * targetZone);
            }
            var timer = setInterval(function () {
                if (stop) {
                    if (Math.abs(degrees) % 360 == stopAt) {
                        clearInterval(timer);
                        resolve(true);
                    }
                }
                var transformValue = transform + ("rotateZ(" + degrees + "deg)");
                _this.roulette.style.transform = transformValue;
                _this.roulette.style.webkitTransform = transformValue;
                degrees += (360 / environment_1.environment.wheel.sides);
            }, 150);
        });
    };
    uiGenerator.prototype.getPercentTag = function () {
        var cupon = this.cupon;
        var percent = "\n        <p>" + cupon.percentDelivered + "% de cupones entregados hoy</p>\n        <div class='roulette-percent'>\n            <div class='roulette-percent-val' style=\"width:" + cupon.percentDelivered + "%;\"></div>\n        </div>\n        ";
        return percent;
    };
    return uiGenerator;
}(popup_tool_1.Popup));
exports.uiGenerator = uiGenerator;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./typescript/testMain.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hdm9uLXJ1bGV0YS1jZG4vLi90eXBlc2NyaXB0L2F2b25Sb3VsZXR0ZS50cyIsIndlYnBhY2s6Ly9hdm9uLXJ1bGV0YS1jZG4vLi90eXBlc2NyaXB0L2Vudmlyb25tZW50LnRzIiwid2VicGFjazovL2F2b24tcnVsZXRhLWNkbi8uL3R5cGVzY3JpcHQvbWlkZGxld2FyZXMvY3Vwb24tYWxlcnQubWlkZGxlcndhcmUudHMiLCJ3ZWJwYWNrOi8vYXZvbi1ydWxldGEtY2RuLy4vdHlwZXNjcmlwdC9taWRkbGV3YXJlcy9jdXBvbi1jaGVja291dC5taWRkbGV3YXJlLnRzIiwid2VicGFjazovL2F2b24tcnVsZXRhLWNkbi8uL3R5cGVzY3JpcHQvbWlkZGxld2FyZXMvY3Vwb24tZ2V0dGVyLm1pZGRsZXdhcmUudHMiLCJ3ZWJwYWNrOi8vYXZvbi1ydWxldGEtY2RuLy4vdHlwZXNjcmlwdC9taWRkbGV3YXJlcy9jdXBvbi1pbnB1dC5taWRkbGV3YXJlLnRzIiwid2VicGFjazovL2F2b24tcnVsZXRhLWNkbi8uL3R5cGVzY3JpcHQvbWlkZGxld2FyZXMvcm91bGV0ZS1nZXR0ZXIubWlkZGVsd2FyZS50cyIsIndlYnBhY2s6Ly9hdm9uLXJ1bGV0YS1jZG4vLi90eXBlc2NyaXB0L21pZGRsZXdhcmVzL3JvdWxldHRlLWl1Lm1pZGRsZXdhcmUudHMiLCJ3ZWJwYWNrOi8vYXZvbi1ydWxldGEtY2RuLy4vdHlwZXNjcmlwdC9taWRkbGV3YXJlcy9yb3VsZXR0ZS10cmlnZ2VyLm1pZGRsZXdhcmUudHMiLCJ3ZWJwYWNrOi8vYXZvbi1ydWxldGEtY2RuLy4vdHlwZXNjcmlwdC9taWRkbGV3YXJlcy9zdHlsZXMubWlkZGxld2FyZS50cyIsIndlYnBhY2s6Ly9hdm9uLXJ1bGV0YS1jZG4vLi90eXBlc2NyaXB0L21vZGVscy9yZXEubW9kZWwudHMiLCJ3ZWJwYWNrOi8vYXZvbi1ydWxldGEtY2RuLy4vdHlwZXNjcmlwdC9tb2RlbHMvdWlEYXRhLm1vZGVsLnRzIiwid2VicGFjazovL2F2b24tcnVsZXRhLWNkbi8uL3R5cGVzY3JpcHQvcGF0dGVybnMvYXBwQ2hhaW4ucGF0dGVybi50cyIsIndlYnBhY2s6Ly9hdm9uLXJ1bGV0YS1jZG4vLi90eXBlc2NyaXB0L3BhdHRlcm5zL3NlcnZpY2VzU2luZ2xldG9uLnBhdHRlcm4udHMiLCJ3ZWJwYWNrOi8vYXZvbi1ydWxldGEtY2RuLy4vdHlwZXNjcmlwdC9zZXJ2aWNlcy9jdXBvbi5zZXJ2aWNlLnRzIiwid2VicGFjazovL2F2b24tcnVsZXRhLWNkbi8uL3R5cGVzY3JpcHQvc2VydmljZXMvcm91bGV0dGUuc2VydmljZS50cyIsIndlYnBhY2s6Ly9hdm9uLXJ1bGV0YS1jZG4vLi90eXBlc2NyaXB0L3NlcnZpY2VzL3N0b3JhZ2Uuc2VydmljZS50cyIsIndlYnBhY2s6Ly9hdm9uLXJ1bGV0YS1jZG4vLi90eXBlc2NyaXB0L3Rlc3RNYWluLnRzIiwid2VicGFjazovL2F2b24tcnVsZXRhLWNkbi8uL3R5cGVzY3JpcHQvdG9vbHMvY2hlY2tvdXRSZWFkZXIudG9vbC50cyIsIndlYnBhY2s6Ly9hdm9uLXJ1bGV0YS1jZG4vLi90eXBlc2NyaXB0L3Rvb2xzL2RldkxvZy50b29sLnRzIiwid2VicGFjazovL2F2b24tcnVsZXRhLWNkbi8uL3R5cGVzY3JpcHQvdG9vbHMvaW1nU3RvcmUudHMiLCJ3ZWJwYWNrOi8vYXZvbi1ydWxldGEtY2RuLy4vdHlwZXNjcmlwdC90b29scy9ub1dpblBvc2l0aW9uLnRvb2wudHMiLCJ3ZWJwYWNrOi8vYXZvbi1ydWxldGEtY2RuLy4vdHlwZXNjcmlwdC90b29scy9wb3B1cC50b29sLnRzIiwid2VicGFjazovL2F2b24tcnVsZXRhLWNkbi8uL3R5cGVzY3JpcHQvdG9vbHMvcHJvZHVjdE1hdGNoZXIudG9vbC50cyIsIndlYnBhY2s6Ly9hdm9uLXJ1bGV0YS1jZG4vLi90eXBlc2NyaXB0L3Rvb2xzL3VpR2VuZXJhdG9yLnRvb2wudHMiLCJ3ZWJwYWNrOi8vYXZvbi1ydWxldGEtY2RuL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2F2b24tcnVsZXRhLWNkbi93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELG9CQUFvQjtBQUNwQix5QkFBeUIsbUJBQU8sQ0FBQyw4RUFBNkI7QUFDOUQsa0NBQWtDLG1CQUFPLENBQUMsc0dBQXlDO0FBQ25GLG9DQUFvQyxtQkFBTyxDQUFDLDBHQUEyQztBQUN2RixrQkFBa0IsbUJBQU8sQ0FBQyw0REFBb0I7QUFDOUMsZ0NBQWdDLG1CQUFPLENBQUMsa0dBQXVDO0FBQy9FLCtCQUErQixtQkFBTyxDQUFDLGdHQUFzQztBQUM3RSxnQ0FBZ0MsbUJBQU8sQ0FBQyxrR0FBdUM7QUFDL0Usa0NBQWtDLG1CQUFPLENBQUMsc0dBQXlDO0FBQ25GLDBCQUEwQixtQkFBTyxDQUFDLHNGQUFpQztBQUNuRSxvQkFBb0IsbUJBQU8sQ0FBQyw4REFBcUI7QUFDakQsK0JBQStCLG1CQUFPLENBQUMsZ0dBQXNDO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjs7Ozs7Ozs7Ozs7QUM3QlA7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsbUJBQW1CO0FBQ25CLGlCQUFpQixtQkFBTyxDQUFDLHdEQUFrQjtBQUMzQyxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzVDYTtBQUNiLDhD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QSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNmxCQUE2bEIsV0FBVztBQUN4bUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsZUFBZSxFQUFFO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxnQkFBZ0I7QUFDcEQsa0NBQWtDLGlCQUFpQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHVPQUF1TztBQUN2TztBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsbUJBQW1COzs7Ozs7O1VDaFFuQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7O1VDckJBO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImluZGV4LXRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmF2b25Sb3VsZXR0ZSA9IHZvaWQgMDtcclxudmFyIGFwcENoYWluX3BhdHRlcm5fMSA9IHJlcXVpcmUoXCIuL3BhdHRlcm5zL2FwcENoYWluLnBhdHRlcm5cIik7XHJcbnZhciByb3VsZXRlX2dldHRlcl9taWRkZWx3YXJlXzEgPSByZXF1aXJlKFwiLi9taWRkbGV3YXJlcy9yb3VsZXRlLWdldHRlci5taWRkZWx3YXJlXCIpO1xyXG52YXIgcm91bGV0dGVfdHJpZ2dlcl9taWRkbGV3YXJlXzEgPSByZXF1aXJlKFwiLi9taWRkbGV3YXJlcy9yb3VsZXR0ZS10cmlnZ2VyLm1pZGRsZXdhcmVcIik7XHJcbnZhciByZXFfbW9kZWxfMSA9IHJlcXVpcmUoXCIuL21vZGVscy9yZXEubW9kZWxcIik7XHJcbnZhciBjdXBvbl9nZXR0ZXJfbWlkZGxld2FyZV8xID0gcmVxdWlyZShcIi4vbWlkZGxld2FyZXMvY3Vwb24tZ2V0dGVyLm1pZGRsZXdhcmVcIik7XHJcbnZhciByb3VsZXR0ZV9pdV9taWRkbGV3YXJlXzEgPSByZXF1aXJlKFwiLi9taWRkbGV3YXJlcy9yb3VsZXR0ZS1pdS5taWRkbGV3YXJlXCIpO1xyXG52YXIgY3Vwb25fYWxlcnRfbWlkZGxlcndhcmVfMSA9IHJlcXVpcmUoXCIuL21pZGRsZXdhcmVzL2N1cG9uLWFsZXJ0Lm1pZGRsZXJ3YXJlXCIpO1xyXG52YXIgY3Vwb25fY2hlY2tvdXRfbWlkZGxld2FyZV8xID0gcmVxdWlyZShcIi4vbWlkZGxld2FyZXMvY3Vwb24tY2hlY2tvdXQubWlkZGxld2FyZVwiKTtcclxudmFyIHN0eWxlc19taWRkbGV3YXJlXzEgPSByZXF1aXJlKFwiLi9taWRkbGV3YXJlcy9zdHlsZXMubWlkZGxld2FyZVwiKTtcclxudmFyIGRldkxvZ190b29sXzEgPSByZXF1aXJlKFwiLi90b29scy9kZXZMb2cudG9vbFwiKTtcclxudmFyIGN1cG9uX2lucHV0X21pZGRsZXdhcmVfMSA9IHJlcXVpcmUoXCIuL21pZGRsZXdhcmVzL2N1cG9uLWlucHV0Lm1pZGRsZXdhcmVcIik7XHJcbmZ1bmN0aW9uIGF2b25Sb3VsZXR0ZSgpIHtcclxuICAgIHZhciBhcHAgPSBuZXcgYXBwQ2hhaW5fcGF0dGVybl8xLkFwcENoYWluKCk7XHJcbiAgICBkZXZMb2dfdG9vbF8xLmRldkxvZyhcImF2b24gcm91bGV0dGUgaW5qZWN0ZWRcIik7XHJcbiAgICBhcHAudXNlKFwiXi9jYXJ0Lz8kXCIsIHN0eWxlc19taWRkbGV3YXJlXzEuc3R5bGVzKTtcclxuICAgIGFwcC51c2UoXCJeL2NhcnQvPyRcIiwgcm91bGV0ZV9nZXR0ZXJfbWlkZGVsd2FyZV8xLmdldFJvdWxldHRlKTtcclxuICAgIGFwcC51c2UoXCJeL2NhcnQvPyRcIiwgcm91bGV0dGVfdHJpZ2dlcl9taWRkbGV3YXJlXzEucm91bGV0dGVUcmlnZ2VyKTtcclxuICAgIGFwcC51c2UoXCJeL2NhcnQvPyRcIiwgY3Vwb25fYWxlcnRfbWlkZGxlcndhcmVfMS5jdXBvbkFsZXJ0KTtcclxuICAgIGFwcC51c2UoXCJeL2NhcnQvPyRcIiwgY3Vwb25faW5wdXRfbWlkZGxld2FyZV8xLmN1cG9uSW5wdXQpO1xyXG4gICAgYXBwLnVzZShcIl4vY2FydC8/JFwiLCBjdXBvbl9nZXR0ZXJfbWlkZGxld2FyZV8xLmN1cG9uR2V0dGVyKTtcclxuICAgIGFwcC51c2UoXCJeL2NhcnQvPyRcIiwgcm91bGV0dGVfaXVfbWlkZGxld2FyZV8xLnJvdWxldHRlVWkpO1xyXG4gICAgYXBwLnVzZShcIl4vY2hlY2tvdXRkaXJlY3RkZWxpdmVyeS8uKlwiLCBjdXBvbl9jaGVja291dF9taWRkbGV3YXJlXzEuY3Vwb25DaGVja291dCk7XHJcbiAgICB2YXIgYXBwY29uZmlnID0gbmV3IHJlcV9tb2RlbF8xLlJlcU1vZGVsKCk7XHJcbiAgICBhcHBjb25maWcudmlldyA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcclxuICAgIGFwcC5ydW4oYXBwY29uZmlnKTtcclxufVxyXG5leHBvcnRzLmF2b25Sb3VsZXR0ZSA9IGF2b25Sb3VsZXR0ZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5lbnZpcm9ubWVudCA9IHZvaWQgMDtcclxudmFyIGltZ1N0b3JlXzEgPSByZXF1aXJlKFwiLi90b29scy9pbWdTdG9yZVwiKTtcclxuZXhwb3J0cy5lbnZpcm9ubWVudCA9IHtcclxuICAgIHByb2R1Y3Rpb246IHRydWUsXHJcbiAgICBhcGlVcmw6IFwiaHR0cHM6Ly9ydWxldGEuYXZvbmNwZS5jb20vYXBpL1wiLFxyXG4gICAgc3RhdGljc1VybDogXCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvZ2gvcGFjaWZpY29zYXMvYXZvbi1ydWxldGEtc3RhdGljcy1jZG5AMS9pbWcvXCIsXHJcbiAgICBzdHlsZXM6IFtcclxuICAgICAgICBcImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9naC9wYWNpZmljb3Nhcy9hdm9uLXJ1bGV0YS1zdGF0aWNzLWNkbkAxL2Rpc3QvY3NzL2luZGV4LmNzc1wiXHJcbiAgICBdLFxyXG4gICAgLy8gYXBpVXJsOiBcImh0dHBzOi8vbG9jYWxob3N0OjUwMDEvYXBpL1wiLFxyXG4gICAgLy8gc3RhdGljc1VybDpcImh0dHA6Ly8xMjcuMC4wLjE6NTUwMC9pbWcvXCIsXHJcbiAgICAvLyBzdHlsZXM6W1xyXG4gICAgLy8gICAgIFwiaHR0cDovLzEyNy4wLjAuMTo1NTAwL2Rpc3QvY3NzL2luZGV4LmNzc1wiXHJcbiAgICAvLyBdLFxyXG4gICAgZ2V0IGN1cnJlbnRDb3VudHJ5KCkge1xyXG4gICAgICAgIHN3aXRjaCAod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ3d3cuYXZvbi5jb1wiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY29cIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwid3d3LmF2b24uY29tLmVjXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJlY1wiO1xyXG4gICAgICAgICAgICBjYXNlIFwid3d3LmF2b24uY29tLnBlXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJwZVwiO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdldCB3aW5Qb3NpdGlvbnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMud2hlZWwud2luVHlwZXNQb3NpdGlvbnMpO1xyXG4gICAgfSxcclxuICAgIGltZ1N0b3JlOiBuZXcgaW1nU3RvcmVfMS5JbWdTdG9yZSgpLFxyXG4gICAgd2hlZWw6IHtcclxuICAgICAgICBzaWRlczogMTIsXHJcbiAgICAgICAgd2luVHlwZXNQb3NpdGlvbnM6IHtcclxuICAgICAgICAgICAgMDogXCIxMDAlXCIsXHJcbiAgICAgICAgICAgIDI6IFwiMzAlXCIsXHJcbiAgICAgICAgICAgIDQ6IFwiMjAlXCIsXHJcbiAgICAgICAgICAgIDY6IFwiNTAlXCIsXHJcbiAgICAgICAgICAgIDg6IFwiMzAlXCIsXHJcbiAgICAgICAgICAgIDEwOiBcIjQwJVwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmN1cG9uQWxlcnQgPSB2b2lkIDA7XHJcbnZhciBwb3B1cF90b29sXzEgPSByZXF1aXJlKFwiLi4vdG9vbHMvcG9wdXAudG9vbFwiKTtcclxuZnVuY3Rpb24gY3Vwb25BbGVydChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdmFyIGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJhLnZpLWJ0bi0tc2Vjb25kYXJ5Om50aC1jaGlsZCgyKVwiKTtcclxuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keTtcclxuICAgIHZhciBwb3B1cCA9IG5ldyBwb3B1cF90b29sXzEuUG9wdXA7XHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXEpO1xyXG4gICAgICAgIHZhciBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoXCJjdXBvbi1hbGVydC1wb3B1cFwiKTtcclxuICAgICAgICBjYXJkLmlubmVySFRNTCA9IFwiXFxuICAgICAgICAgICAgPGgyPlxcbiAgICAgICAgICAgICAgICBSZWN1ZXJkYSBxdWUgZGViZXMgZXN0YXIgc2VndXJvIGRlIHR1IGNvbXByYSBhbnRlcyBkZSBwcm9jZWRlciBhbCBwYWdvXFxuICAgICAgICAgICAgPC9oMj5cXG4gICAgICAgIFwiO1xyXG4gICAgICAgIC8vYW5hZGlyIGJvdG9uIGRlIGNvbnRpbnVhclxyXG4gICAgICAgIHZhciBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwicm91bGV0dGUtYnRuXCIpO1xyXG4gICAgICAgIGJ0bi5pbm5lclRleHQgPSBcIkNvbnRpbnVhclwiO1xyXG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHsgcG9wdXAuY2xvc2UoKTsgfSk7XHJcbiAgICAgICAgY2FyZC5hcHBlbmQoYnRuKTtcclxuICAgICAgICBwb3B1cC5idWlsZCgpXHJcbiAgICAgICAgICAgIC5vcGVuKCk7XHJcbiAgICAgICAgcG9wdXAuY2FyZC5hcHBlbmQoY2FyZCk7XHJcbiAgICAgICAgcG9wdXAuYXRhdGNoKGJvZHkpO1xyXG4gICAgfSk7XHJcbiAgICBuZXh0KCk7XHJcbn1cclxuZXhwb3J0cy5jdXBvbkFsZXJ0ID0gY3Vwb25BbGVydDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5jdXBvbkNoZWNrb3V0ID0gdm9pZCAwO1xyXG52YXIgc2VydmljZXNTaW5nbGV0b25fcGF0dGVybl8xID0gcmVxdWlyZShcIi4uL3BhdHRlcm5zL3NlcnZpY2VzU2luZ2xldG9uLnBhdHRlcm5cIik7XHJcbnZhciBkZXZMb2dfdG9vbF8xID0gcmVxdWlyZShcIi4uL3Rvb2xzL2RldkxvZy50b29sXCIpO1xyXG52YXIgY3Vwb25TZXJ2aWNlID0gc2VydmljZXNTaW5nbGV0b25fcGF0dGVybl8xLlNlcnZpY2VTaW5nbGV0b24uY3Vwb247XHJcbnZhciBzdG9yYWdlU2VydmljZSA9IHNlcnZpY2VzU2luZ2xldG9uX3BhdHRlcm5fMS5TZXJ2aWNlU2luZ2xldG9uLnN0b3JhZ2U7XHJcbmZ1bmN0aW9uIGN1cG9uQ2hlY2tvdXQoKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcImNoZWNrb3V0XCIpO1xyXG4gICAgdmFyIGN1cG9uID0gSlNPTi5wYXJzZShzdG9yYWdlU2VydmljZS5nZXQoXCJjdXBvblwiLCBmYWxzZSkpO1xyXG4gICAgdmFyIGN1cG9uSW5wdXQgPSBzdG9yYWdlU2VydmljZS5nZXQoXCJjdXBvbklucHV0XCIpIHx8IFwiXCI7XHJcbiAgICBjb25zb2xlLmxvZyhjdXBvbik7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhjdXBvbixjdXBvbi5jb2RlLnRyaW0oKSxjdXBvbklucHV0LnRyaW0oKSxjdXBvbi5jb2RlLnRyaW0oKSA9PSBjdXBvbklucHV0LnRyaW0oKSk7XHJcbiAgICBpZiAoY3Vwb24gJiYgY3Vwb24uY29kZSAmJiBjdXBvbi5jb2RlLnRyaW0oKSA9PSBjdXBvbklucHV0LnRyaW0oKSkge1xyXG4gICAgICAgIGRldkxvZ190b29sXzEuZGV2TG9nKCdjdXBvbiBjaGVja291dCcsIFwidXNlXCIpO1xyXG4gICAgICAgIGN1cG9uU2VydmljZS51c2UoY3Vwb24pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZGV2TG9nX3Rvb2xfMS5kZXZMb2coXCJjdXBvbiBjaGVja291dFwiLCAnbm90aGluZyB0byBkbycpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuY3Vwb25DaGVja291dCA9IGN1cG9uQ2hlY2tvdXQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmN1cG9uR2V0dGVyID0gdm9pZCAwO1xyXG52YXIgc2VydmljZXNTaW5nbGV0b25fcGF0dGVybl8xID0gcmVxdWlyZShcIi4uL3BhdHRlcm5zL3NlcnZpY2VzU2luZ2xldG9uLnBhdHRlcm5cIik7XHJcbnZhciBkZXZMb2dfdG9vbF8xID0gcmVxdWlyZShcIi4uL3Rvb2xzL2RldkxvZy50b29sXCIpO1xyXG52YXIgY3Vwb25TZXJ2aWNlID0gc2VydmljZXNTaW5nbGV0b25fcGF0dGVybl8xLlNlcnZpY2VTaW5nbGV0b24uY3Vwb247XHJcbnZhciBzdG9yYWdlU2VydmljZSA9IHNlcnZpY2VzU2luZ2xldG9uX3BhdHRlcm5fMS5TZXJ2aWNlU2luZ2xldG9uLnN0b3JhZ2U7XHJcbmZ1bmN0aW9uIGN1cG9uR2V0dGVyKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGN1cG9uO1xyXG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVxLnJvdWxldHRlIHx8ICFyZXEucGxheVJvdWxldHRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYXNkYXNkYXNkYXNkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGN1cG9uID0gSlNPTi5wYXJzZShzdG9yYWdlU2VydmljZS5nZXQoXCJjdXBvblwiLCBmYWxzZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXBvbiAmJiAoIWN1cG9uLmZyb20gfHwgIWN1cG9uLmNvZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5jdXBvbiA9IGN1cG9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKGN1cG9uID09IG51bGwgfHwgY3Vwb24uZnJvbSAhPT0gcmVxLnJvdWxldHRlLmlkKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgZGV2TG9nX3Rvb2xfMS5kZXZMb2coXCJnZXQgbmV3XCIsIGN1cG9uKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBjdXBvblNlcnZpY2UuZ2V0Q3Vwb24ocmVxLnJvdWxldHRlLmlkKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgY3Vwb24gPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cG9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldkxvZ190b29sXzEuZGV2TG9nKFwic2F2ZSBjdXBvblwiLCBjdXBvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JhZ2VTZXJ2aWNlLmxvbmdTYXZlKCdjdXBvbicsIEpTT04uc3RyaW5naWZ5KGN1cG9uKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5jdXBvbiA9IGN1cG9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbmV4dCgpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZGV2TG9nX3Rvb2xfMS5kZXZMb2coJ25vIGN1cG9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIG5leHQoKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxLmN1cG9uID0gY3Vwb247XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5jdXBvbkdldHRlciA9IGN1cG9uR2V0dGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmN1cG9uSW5wdXQgPSB2b2lkIDA7XHJcbnZhciBzZXJ2aWNlc1NpbmdsZXRvbl9wYXR0ZXJuXzEgPSByZXF1aXJlKFwiLi4vcGF0dGVybnMvc2VydmljZXNTaW5nbGV0b24ucGF0dGVyblwiKTtcclxudmFyIHN0b3JhZ2VTZXJ2aWNlID0gc2VydmljZXNTaW5nbGV0b25fcGF0dGVybl8xLlNlcnZpY2VTaW5nbGV0b24uc3RvcmFnZTtcclxuZnVuY3Rpb24gY3Vwb25JbnB1dChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdmFyIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb3Vwb25jb2RlXCIpO1xyXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcclxuICAgICAgICByZXEuY3Vwb25JbnB1dCA9IHRhcmdldC52YWx1ZTtcclxuICAgICAgICBzdG9yYWdlU2VydmljZS5zaG9ydFNhdmUoXCJjdXBvbklucHV0XCIsIHRhcmdldC52YWx1ZSk7XHJcbiAgICB9KTtcclxuICAgIG5leHQoKTtcclxufVxyXG5leHBvcnRzLmN1cG9uSW5wdXQgPSBjdXBvbklucHV0O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5nZXRSb3VsZXR0ZSA9IHZvaWQgMDtcclxudmFyIHNlcnZpY2VzU2luZ2xldG9uX3BhdHRlcm5fMSA9IHJlcXVpcmUoXCIuLi9wYXR0ZXJucy9zZXJ2aWNlc1NpbmdsZXRvbi5wYXR0ZXJuXCIpO1xyXG52YXIgZGV2TG9nX3Rvb2xfMSA9IHJlcXVpcmUoXCIuLi90b29scy9kZXZMb2cudG9vbFwiKTtcclxudmFyIHN0b3JhZ2VTZXJ2aWNlID0gc2VydmljZXNTaW5nbGV0b25fcGF0dGVybl8xLlNlcnZpY2VTaW5nbGV0b24uc3RvcmFnZTtcclxudmFyIHJvdWxldHRlU2VydmljZSA9IHNlcnZpY2VzU2luZ2xldG9uX3BhdHRlcm5fMS5TZXJ2aWNlU2luZ2xldG9uLnJvdWxldHRlO1xyXG5mdW5jdGlvbiBnZXRSb3VsZXR0ZShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBleGlzdGluZ1JvdWxldHRlLCBfYTtcclxuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1JvdWxldHRlID0gc3RvcmFnZVNlcnZpY2Uucm91bGV0dGU7XHJcbiAgICAgICAgICAgICAgICAgICAgZGV2TG9nX3Rvb2xfMS5kZXZMb2coZXhpc3RpbmdSb3VsZXR0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhZXhpc3RpbmdSb3VsZXR0ZSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgX2EgPSByZXE7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcm91bGV0dGVTZXJ2aWNlLmdldFJvdWxldHRlRGF0YSgpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBfYS5yb3VsZXR0ZSA9IF9iLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlcS5yb3VsZXR0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0b3JhZ2VTZXJ2aWNlLnJvdWxldHRlID0gcmVxLnJvdWxldHRlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDNdO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIHJlcS5yb3VsZXR0ZSA9IGV4aXN0aW5nUm91bGV0dGU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXEucm91bGV0dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDM7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5nZXRSb3VsZXR0ZSA9IGdldFJvdWxldHRlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5yb3VsZXR0ZVVpID0gdm9pZCAwO1xyXG52YXIgZW52aXJvbm1lbnRfMSA9IHJlcXVpcmUoXCIuLi9lbnZpcm9ubWVudFwiKTtcclxudmFyIHVpRGF0YV9tb2RlbF8xID0gcmVxdWlyZShcIi4uL21vZGVscy91aURhdGEubW9kZWxcIik7XHJcbnZhciBub1dpblBvc2l0aW9uX3Rvb2xfMSA9IHJlcXVpcmUoXCIuLi90b29scy9ub1dpblBvc2l0aW9uLnRvb2xcIik7XHJcbnZhciB1aUdlbmVyYXRvcl90b29sXzEgPSByZXF1aXJlKFwiLi4vdG9vbHMvdWlHZW5lcmF0b3IudG9vbFwiKTtcclxuZnVuY3Rpb24gcm91bGV0dGVVaShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciByb290LCB1aWRhdGEsIHVpLCB1aSwgd2luVGFyZ2V0LCB3aW5Qb3NpdGlvbnMsIGtleSwgdmFsO1xyXG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVxLnBsYXlSb3VsZXR0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB1aWRhdGEgPSBuZXcgdWlEYXRhX21vZGVsXzEuVWlEYXRhKHJlcS5yb3VsZXR0ZS5pbWcsIHJlcS5yb3VsZXR0ZS5pbml0Q29udGVudCwgcmVxLnJvdWxldHRlLmZpbmFsQ29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdWkgPSBuZXcgdWlHZW5lcmF0b3JfdG9vbF8xLnVpR2VuZXJhdG9yKHJvb3QsIHJlcS5jdXBvbiwgdWlkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB1aS5nZW5lcmF0ZSgpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICB1aSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB1aS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0YXRjaCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vcGVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luUG9zaXRpb25zID0gZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC53aW5Qb3NpdGlvbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcS5jdXBvbiAmJiByZXEuY3Vwb24udHlwZSAmJiByZXEuY3Vwb24uY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGtleSBpbiBlbnZpcm9ubWVudF8xLmVudmlyb25tZW50LndoZWVsLndpblR5cGVzUG9zaXRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSBlbnZpcm9ubWVudF8xLmVudmlyb25tZW50LndoZWVsLndpblR5cGVzUG9zaXRpb25zW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxLmN1cG9uLnR5cGUudHJpbSgpID09PSB2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5UYXJnZXQgPSBOdW1iZXIoa2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luVGFyZ2V0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5UYXJnZXQgPSBub1dpblBvc2l0aW9uX3Rvb2xfMS5ub1dpblBvc2l0aW9uKGVudmlyb25tZW50XzEuZW52aXJvbm1lbnQud2hlZWwuc2lkZXMsIHdpblBvc2l0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIXJlcS5jdXBvbiB8fCAhd2luVGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpblRhcmdldCA9IG5vV2luUG9zaXRpb25fdG9vbF8xLm5vV2luUG9zaXRpb24oZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC53aGVlbC5zaWRlcywgd2luUG9zaXRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdWkud2luVGFyZ2V0ID0gd2luVGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5yb3VsZXR0ZVVpID0gcm91bGV0dGVVaTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5yb3VsZXR0ZVRyaWdnZXIgPSB2b2lkIDA7XHJcbnZhciBzZXJ2aWNlc1NpbmdsZXRvbl9wYXR0ZXJuXzEgPSByZXF1aXJlKFwiLi4vcGF0dGVybnMvc2VydmljZXNTaW5nbGV0b24ucGF0dGVyblwiKTtcclxudmFyIGNoZWNrb3V0UmVhZGVyX3Rvb2xfMSA9IHJlcXVpcmUoXCIuLi90b29scy9jaGVja291dFJlYWRlci50b29sXCIpO1xyXG52YXIgcHJvZHVjdE1hdGNoZXJfdG9vbF8xID0gcmVxdWlyZShcIi4uL3Rvb2xzL3Byb2R1Y3RNYXRjaGVyLnRvb2xcIik7XHJcbnZhciBzdG9yYWdlU2VydmljZSA9IHNlcnZpY2VzU2luZ2xldG9uX3BhdHRlcm5fMS5TZXJ2aWNlU2luZ2xldG9uLnN0b3JhZ2U7XHJcbnZhciBwcm9kdWN0c0NvbnRhaW5lclNlbGVjdG9yID0gXCIuQ2FydC1Qcm9kdWN0c1wiO1xyXG52YXIgcHJvZHVjdHNDb250YWluZXI7XHJcbnZhciBwcm9kdWN0TGlzdCA9IG5ldyBBcnJheSgpO1xyXG5mdW5jdGlvbiByb3VsZXR0ZVRyaWdnZXIocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgcHJvZHVjdHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHByb2R1Y3RzQ29udGFpbmVyU2VsZWN0b3IpO1xyXG4gICAgICAgIGlmICghcHJvZHVjdHNDb250YWluZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm9kdWN0TGlzdCA9IGNoZWNrb3V0UmVhZGVyX3Rvb2xfMS5jaGVja291dFJlYWRlcihwcm9kdWN0c0NvbnRhaW5lcik7XHJcbiAgICAgICAgdmFyIG1hdGNoID0gcHJvZHVjdE1hdGNoZXJfdG9vbF8xLnByb2R1Y3RNYXRjaGVyKHByb2R1Y3RMaXN0KTtcclxuICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgcmVxLnBsYXlSb3VsZXR0ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICBuZXh0KCk7XHJcbiAgICB9KTtcclxuICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xyXG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5yb3VsZXR0ZVRyaWdnZXIgPSByb3VsZXR0ZVRyaWdnZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuc3R5bGVzID0gdm9pZCAwO1xyXG52YXIgZW52aXJvbm1lbnRfMSA9IHJlcXVpcmUoXCIuLi9lbnZpcm9ubWVudFwiKTtcclxuZnVuY3Rpb24gc3R5bGVzKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB2YXIgY2xhc3NJZGVudGlmaWVyID0gXCJyb3VsZXR0ZS1zdHlsZXNcIjtcclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNsYXNzSWRlbnRpZmllcikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIG5leHQoKTtcclxuICAgIH1cclxuICAgIGVudmlyb25tZW50XzEuZW52aXJvbm1lbnQuc3R5bGVzLmZvckVhY2goZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XHJcbiAgICAgICAgbGluay5yZWwgPSBcInN0eWxlc2hlZXRcIjtcclxuICAgICAgICBsaW5rLmhyZWYgPSB1cmw7XHJcbiAgICAgICAgbGluay5jbGFzc0xpc3QuYWRkKGNsYXNzSWRlbnRpZmllcik7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5wcmVwZW5kKGxpbmspO1xyXG4gICAgfSk7XHJcbiAgICBuZXh0KCk7XHJcbn1cclxuZXhwb3J0cy5zdHlsZXMgPSBzdHlsZXM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuUmVxTW9kZWwgPSB2b2lkIDA7XHJcbnZhciBSZXFNb2RlbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFJlcU1vZGVsKHZpZXcsIHJvdWxldHRlLCBwbGF5Um91bGV0dGUsIHJvdXRlLCBjdXBvbiwgY3Vwb25JbnB1dCkge1xyXG4gICAgICAgIGlmICh2aWV3ID09PSB2b2lkIDApIHsgdmlldyA9IG51bGw7IH1cclxuICAgICAgICBpZiAocm91bGV0dGUgPT09IHZvaWQgMCkgeyByb3VsZXR0ZSA9IG51bGw7IH1cclxuICAgICAgICBpZiAocGxheVJvdWxldHRlID09PSB2b2lkIDApIHsgcGxheVJvdWxldHRlID0gbnVsbDsgfVxyXG4gICAgICAgIGlmIChyb3V0ZSA9PT0gdm9pZCAwKSB7IHJvdXRlID0gbnVsbDsgfVxyXG4gICAgICAgIGlmIChjdXBvbiA9PT0gdm9pZCAwKSB7IGN1cG9uID0gbnVsbDsgfVxyXG4gICAgICAgIGlmIChjdXBvbklucHV0ID09PSB2b2lkIDApIHsgY3Vwb25JbnB1dCA9IG51bGw7IH1cclxuICAgICAgICB0aGlzLnZpZXcgPSB2aWV3O1xyXG4gICAgICAgIHRoaXMucm91bGV0dGUgPSByb3VsZXR0ZTtcclxuICAgICAgICB0aGlzLnBsYXlSb3VsZXR0ZSA9IHBsYXlSb3VsZXR0ZTtcclxuICAgICAgICB0aGlzLnJvdXRlID0gcm91dGU7XHJcbiAgICAgICAgdGhpcy5jdXBvbiA9IGN1cG9uO1xyXG4gICAgICAgIHRoaXMuY3Vwb25JbnB1dCA9IGN1cG9uSW5wdXQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVxTW9kZWw7XHJcbn0oKSk7XHJcbmV4cG9ydHMuUmVxTW9kZWwgPSBSZXFNb2RlbDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5VaURhdGEgPSB2b2lkIDA7XHJcbnZhciBVaURhdGEgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBVaURhdGEoaW1nLCBpbml0Q29udGVudCwgZW5kQ29udGVudCkge1xyXG4gICAgICAgIGlmIChpbWcgPT09IHZvaWQgMCkgeyBpbWcgPSBcIlwiOyB9XHJcbiAgICAgICAgaWYgKGluaXRDb250ZW50ID09PSB2b2lkIDApIHsgaW5pdENvbnRlbnQgPSBcIlwiOyB9XHJcbiAgICAgICAgaWYgKGVuZENvbnRlbnQgPT09IHZvaWQgMCkgeyBlbmRDb250ZW50ID0gXCJcIjsgfVxyXG4gICAgICAgIHRoaXMuaW1nID0gaW1nO1xyXG4gICAgICAgIHRoaXMuaW5pdENvbnRlbnQgPSBpbml0Q29udGVudDtcclxuICAgICAgICB0aGlzLmVuZENvbnRlbnQgPSBlbmRDb250ZW50O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFVpRGF0YTtcclxufSgpKTtcclxuZXhwb3J0cy5VaURhdGEgPSBVaURhdGE7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkFwcENoYWluID0gdm9pZCAwO1xyXG52YXIgcmVxX21vZGVsXzEgPSByZXF1aXJlKFwiLi4vbW9kZWxzL3JlcS5tb2RlbFwiKTtcclxudmFyIEFwcENoYWluID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gcHJpdmF0ZSBzZXRlbmQ7XHJcbiAgICBmdW5jdGlvbiBBcHBDaGFpbigpIHtcclxuICAgICAgICB0aGlzLm1pZGRlbHdhcmVzID0gW107XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICBBcHBDaGFpbi5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhcmdzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXJncy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLm1pZGRlbHdhcmVzLnB1c2goeyBmdW5jOiBhcmdzWzBdIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhcmdzLmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWlkZGVsd2FyZXMucHVzaCh7IGZ1bmM6IGFyZ3NbMV0sIHJvdXRlOiBhcmdzWzBdIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBBcHBDaGFpbi5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHJlcSwgcmVzLCBlbmQpIHtcclxuICAgICAgICBpZiAocmVxID09PSB2b2lkIDApIHsgcmVxID0gbmV3IHJlcV9tb2RlbF8xLlJlcU1vZGVsKCk7IH1cclxuICAgICAgICBpZiAocmVzID09PSB2b2lkIDApIHsgcmVzID0ge307IH1cclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfbG9vcF8xLCB0aGlzXzEsIGk7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9sb29wXzEgPSBmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRNaWRkbGV3YXJlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudE1pZGRsZXdhcmUgPSB0aGlzXzEubWlkZGVsd2FyZXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEucm91dGUgPSBjdXJyZW50TWlkZGxld2FyZS5yb3V0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5tYXRjaChuZXcgUmVnRXhwKHJlcS5yb3V0ZSkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxLnJvdXRlID09IFwiKlwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxLnJvdXRlID09IFwiXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhcmVxLnJvdXRlKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIGN1cnJlbnRNaWRkbGV3YXJlLmZ1bmMocmVxLCByZXMsIHJlc29sdmUpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsgfSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzXzEgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoaSA8IHRoaXMubWlkZGVsd2FyZXMubGVuZ3RoKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNSAvKnlpZWxkKiovLCBfbG9vcF8xKGkpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAxXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEFwcENoYWluO1xyXG59KCkpO1xyXG5leHBvcnRzLkFwcENoYWluID0gQXBwQ2hhaW47XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuU2VydmljZVNpbmdsZXRvbiA9IHZvaWQgMDtcclxudmFyIGN1cG9uX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9jdXBvbi5zZXJ2aWNlXCIpO1xyXG52YXIgcm91bGV0dGVfc2VydmljZV8xID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL3JvdWxldHRlLnNlcnZpY2VcIik7XHJcbnZhciBzdG9yYWdlX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9zdG9yYWdlLnNlcnZpY2VcIik7XHJcbnZhciByb3VsZXR0ZVNlcnZpY2U7XHJcbnZhciBjdXBvblNlcnZpY2U7XHJcbnZhciBzdG9yYWdlU2VydmljZTtcclxudmFyIFNlcnZpY2VTaW5nbGV0b24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBTZXJ2aWNlU2luZ2xldG9uKCkge1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlcnZpY2VTaW5nbGV0b24sIFwicm91bGV0dGVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIXJvdWxldHRlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgcm91bGV0dGVTZXJ2aWNlID0gbmV3IHJvdWxldHRlX3NlcnZpY2VfMS5Sb3VsZXR0ZVNlcnZpY2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcm91bGV0dGVTZXJ2aWNlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZXJ2aWNlU2luZ2xldG9uLCBcImN1cG9uXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFjdXBvblNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgIGN1cG9uU2VydmljZSA9IG5ldyBjdXBvbl9zZXJ2aWNlXzEuQ3Vwb25TZXJ2aWNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGN1cG9uU2VydmljZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2VydmljZVNpbmdsZXRvbiwgXCJzdG9yYWdlXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFzdG9yYWdlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZVNlcnZpY2UgPSBuZXcgc3RvcmFnZV9zZXJ2aWNlXzEuU3RvcmFnZVNlcnZpY2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc3RvcmFnZVNlcnZpY2U7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIFNlcnZpY2VTaW5nbGV0b247XHJcbn0oKSk7XHJcbmV4cG9ydHMuU2VydmljZVNpbmdsZXRvbiA9IFNlcnZpY2VTaW5nbGV0b247XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkN1cG9uU2VydmljZSA9IHZvaWQgMDtcclxudmFyIGVudmlyb25tZW50XzEgPSByZXF1aXJlKFwiLi4vZW52aXJvbm1lbnRcIik7XHJcbnZhciBDdXBvblNlcnZpY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBDdXBvblNlcnZpY2UoKSB7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlVXJsID0gZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC5hcGlVcmwgKyBcImN1cG9ucy9cIjtcclxuICAgIH1cclxuICAgIEN1cG9uU2VydmljZS5wcm90b3R5cGUuZ2V0Q3Vwb24gPSBmdW5jdGlvbiAocm91bGV0dGVJZCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHJhdywgcmVzLCBkYXRhLCBlcnJvcl8xO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzAsIDMsICwgNF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaCh0aGlzLnNlcnZpY2VVcmwgKyAoXCJkZWxpdmVyL1wiICsgcm91bGV0dGVJZCkpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdyA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmF3Lmpzb24oKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGRhdGFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JfMSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInJlcXVlc3Qgcm91bGV0dGUgY3Vwb24gZmFpbHNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBudWxsXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgQ3Vwb25TZXJ2aWNlLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiAoY3Vwb24pIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByYXcsIHJlcywgZXJyb3JfMjtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFswLCAzLCAsIDRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2godGhpcy5zZXJ2aWNlVXJsICsgKFwidXNlL1wiICsgY3Vwb24uY29kZSksIHsgbWV0aG9kOiBcInBvc3RcIiB9KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYXcgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJhdy5qc29uKCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzLnN1Y2Nlc3NdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JfMiA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInJlcXVlc3Qgcm91bGV0dGUgY3Vwb24gZmFpbHNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBudWxsXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEN1cG9uU2VydmljZTtcclxufSgpKTtcclxuZXhwb3J0cy5DdXBvblNlcnZpY2UgPSBDdXBvblNlcnZpY2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlJvdWxldHRlU2VydmljZSA9IHZvaWQgMDtcclxudmFyIGVudmlyb25tZW50XzEgPSByZXF1aXJlKFwiLi4vZW52aXJvbm1lbnRcIik7XHJcbnZhciBSb3VsZXR0ZVNlcnZpY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBSb3VsZXR0ZVNlcnZpY2UoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50Q291bnRyeSA9IGVudmlyb25tZW50XzEuZW52aXJvbm1lbnQuY3VycmVudENvdW50cnkgfHwgXCJjb1wiO1xyXG4gICAgICAgIHRoaXMuc2VydmljZVVybCA9IGVudmlyb25tZW50XzEuZW52aXJvbm1lbnQuYXBpVXJsICsgXCJyb3VsZXR0ZS9cIjtcclxuICAgIH1cclxuICAgIFJvdWxldHRlU2VydmljZS5wcm90b3R5cGUuZ2V0Um91bGV0dGVEYXRhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHJhdywgcmVzLCBlcnJvcl8xO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzAsIDMsICwgNF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaCh0aGlzLnNlcnZpY2VVcmwgKyB0aGlzLmN1cnJlbnRDb3VudHJ5ICsgXCIvYXZhaWxhYmxlXCIpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdyA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmF3Lmpzb24oKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXMuZGF0YV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl8xID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwicmVxdWVzdCByb3VsZXR0ZSBkYXRhIGZhaWxzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJvdWxldHRlU2VydmljZTtcclxufSgpKTtcclxuZXhwb3J0cy5Sb3VsZXR0ZVNlcnZpY2UgPSBSb3VsZXR0ZVNlcnZpY2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuU3RvcmFnZVNlcnZpY2UgPSB2b2lkIDA7XHJcbnZhciBTdG9yYWdlU2VydmljZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFN0b3JhZ2VTZXJ2aWNlKCkge1xyXG4gICAgICAgIHRoaXMuYmFzZUtleSA9IFwicm91bGV0dGUtZGF0YS1cIjtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTdG9yYWdlU2VydmljZS5wcm90b3R5cGUsIFwicm91bGV0dGVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5nZXQoXCJyb3VsZXR0ZVwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKF9hKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3J0U2F2ZShcInJvdWxldHRlXCIsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBTdG9yYWdlU2VydmljZS5wcm90b3R5cGUuc2hvcnRTYXZlID0gZnVuY3Rpb24gKGtleSwgZGF0YSkge1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJcIiArIHRoaXMuYmFzZUtleSArIGtleSwgZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgU3RvcmFnZVNlcnZpY2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXksIHNob3J0KSB7XHJcbiAgICAgICAgaWYgKHNob3J0ID09PSB2b2lkIDApIHsgc2hvcnQgPSB0cnVlOyB9XHJcbiAgICAgICAgcmV0dXJuIHNob3J0ID9cclxuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcIlwiICsgdGhpcy5iYXNlS2V5ICsga2V5KSA6XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiXCIgKyB0aGlzLmJhc2VLZXkgKyBrZXkpO1xyXG4gICAgfTtcclxuICAgIFN0b3JhZ2VTZXJ2aWNlLnByb3RvdHlwZS5sb25nU2F2ZSA9IGZ1bmN0aW9uIChrZXksIGRhdGEpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlwiICsgdGhpcy5iYXNlS2V5ICsga2V5LCBkYXRhKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gU3RvcmFnZVNlcnZpY2U7XHJcbn0oKSk7XHJcbmV4cG9ydHMuU3RvcmFnZVNlcnZpY2UgPSBTdG9yYWdlU2VydmljZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGF2b25Sb3VsZXR0ZV8xID0gcmVxdWlyZShcIi4vYXZvblJvdWxldHRlXCIpO1xyXG5hdm9uUm91bGV0dGVfMS5hdm9uUm91bGV0dGUoKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5jaGVja291dFJlYWRlciA9IHZvaWQgMDtcclxuZnVuY3Rpb24gY2hlY2tvdXRSZWFkZXIocHJvZHVjdHNDb250YWluZXIpIHtcclxuICAgIHZhciBwcm9kdWN0TGlzdCA9IG5ldyBBcnJheSgpO1xyXG4gICAgcHJvZHVjdHNDb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi5DYXJ0LVByb2R1Y3ROYW1lIGFcIikuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHByb2R1Y3RMaXN0LnB1c2goaXRlbS5pbm5lclRleHQpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcHJvZHVjdExpc3Q7XHJcbn1cclxuZXhwb3J0cy5jaGVja291dFJlYWRlciA9IGNoZWNrb3V0UmVhZGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRldkxvZyA9IHZvaWQgMDtcclxudmFyIGVudmlyb25tZW50XzEgPSByZXF1aXJlKFwiLi4vZW52aXJvbm1lbnRcIik7XHJcbmZ1bmN0aW9uIGRldkxvZygpIHtcclxuICAgIHZhciBhcmdzID0gW107XHJcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcclxuICAgIH1cclxuICAgIGlmICghZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC5wcm9kdWN0aW9uKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJncyk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZXZMb2cgPSBkZXZMb2c7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkltZ1N0b3JlID0gdm9pZCAwO1xyXG52YXIgZGV2TG9nX3Rvb2xfMSA9IHJlcXVpcmUoXCIuL2RldkxvZy50b29sXCIpO1xyXG52YXIgSW1nU3RvcmUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBJbWdTdG9yZSgpIHtcclxuICAgICAgICB0aGlzLmltYWdlcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgfVxyXG4gICAgSW1nU3RvcmUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChsYWJlbCkge1xyXG4gICAgICAgIHZhciBpdGVtID0gdGhpcy5pbWFnZXMuZmluZChmdW5jdGlvbiAoaSkgeyByZXR1cm4gaS5uYW1lID09IGxhYmVsOyB9KTtcclxuICAgICAgICBkZXZMb2dfdG9vbF8xLmRldkxvZyhcImdldCBpbWdTdG9yYWdlXCIsIGl0ZW0gPyBpdGVtLmJsb2IgOiBudWxsKTtcclxuICAgICAgICByZXR1cm4gaXRlbSA/IGl0ZW0uYmxvYiA6IG51bGw7XHJcbiAgICB9O1xyXG4gICAgSW1nU3RvcmUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChsYWJlbCwgdXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYmxvYjtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV2TG9nX3Rvb2xfMS5kZXZMb2coXCJhZGQgaW1nU3RvcmFnZVwiLCBcInVybCwgbGFiZWxcIiwgdXJsLCBsYWJlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldChsYWJlbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkltZ1N0b3JhZ2UgRXJyb3IgLSB0cnlpbmcgdG8gYWRkIG5ldyBpbWc6IGxhYmVsIFwiICsgbGFiZWwgKyBcIiBhbHJlYWR5IGV4aXN0c1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmxvYWQodXJsKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBibG9iID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGxhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvYjogYmxvYixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdHJ1ZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEltZ1N0b3JlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAobGFiZWwpIHtcclxuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy5pbWFnZXMuZmluZChmdW5jdGlvbiAoaSkgeyBpLm5hbWUgPT0gbGFiZWw7IH0pO1xyXG4gICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKHRhcmdldC5ibG9iKTtcclxuICAgICAgICB0aGlzLmltYWdlcy5zcGxpY2UodGhpcy5pbWFnZXMuaW5kZXhPZih0YXJnZXQpLCAxKTtcclxuICAgIH07XHJcbiAgICBJbWdTdG9yZS5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByZXMsIGJsb2I7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKHVybCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXMuYmxvYigpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2IgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldkxvZ190b29sXzEuZGV2TG9nKFwiZmV0Y2ggaW1nU3RvcmFnZVwiLCBcInVybCxibG9iXCIsIHVybCwgYmxvYik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYildO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBJbWdTdG9yZTtcclxufSgpKTtcclxuZXhwb3J0cy5JbWdTdG9yZSA9IEltZ1N0b3JlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLm5vV2luUG9zaXRpb24gPSB2b2lkIDA7XHJcbmZ1bmN0aW9uIG5vV2luUG9zaXRpb24od2hlZWxTaWRlcywgd2luUG9zaXRpb25zKSB7XHJcbiAgICB2YXIgcG9zaXRpb25zID0gbmV3IEFycmF5KCk7XHJcbiAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgaWYgKCF3aW5Qb3NpdGlvbnMuZmluZChmdW5jdGlvbiAoeCkgeyByZXR1cm4geCA9PSBpLnRvU3RyaW5nKCk7IH0pKSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKGkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdoZWVsU2lkZXM7IGkrKykge1xyXG4gICAgICAgIF9sb29wXzEoaSk7XHJcbiAgICB9XHJcbiAgICB2YXIgcmFuZG9tID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogcG9zaXRpb25zLmxlbmd0aCk7XHJcbiAgICByZXR1cm4gcG9zaXRpb25zW3JhbmRvbV07XHJcbn1cclxuZXhwb3J0cy5ub1dpblBvc2l0aW9uID0gbm9XaW5Qb3NpdGlvbjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5Qb3B1cCA9IHZvaWQgMDtcclxudmFyIFBvcHVwID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUG9wdXAoKSB7XHJcbiAgICB9XHJcbiAgICBQb3B1cC5wcm90b3R5cGUuYnVpbGQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJwb3B1cC1vdmVybGF5XCIpO1xyXG4gICAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcInBvcHVwXCIpO1xyXG4gICAgICAgIHZhciBjbG9zZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY2xvc2VCdG4uY2xhc3NMaXN0LmFkZChcInBvcHVwLWNsb3NlclwiKTtcclxuICAgICAgICBjbG9zZUJ0bi5pbm5lckhUTUwgPSBcIiYjeGQ3O1wiO1xyXG4gICAgICAgIHZhciBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKFwicG9wdXAtY2FyZFwiKTtcclxuICAgICAgICBjb250YWluZXIuYXBwZW5kKGNhcmQpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmQoY2xvc2VCdG4pO1xyXG4gICAgICAgIHRoaXMub3ZlcmxheSA9IG92ZXJsYXk7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5jYXJkID0gY2FyZDtcclxuICAgICAgICB0aGlzLmV2ZW50TGlzdGVubmVycygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIFBvcHVwLnByb3RvdHlwZS5hdGF0Y2ggPSBmdW5jdGlvbiAocGFyZW50KSB7XHJcbiAgICAgICAgcGFyZW50LmFwcGVuZCh0aGlzLm92ZXJsYXkpO1xyXG4gICAgICAgIHBhcmVudC5hcHBlbmQodGhpcy5jb250YWluZXIpO1xyXG4gICAgfTtcclxuICAgIFBvcHVwLnByb3RvdHlwZS5ldmVudExpc3Rlbm5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucG9wdXAtY2xvc2VyJykuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgaWYgKF90aGlzLm9uQ2xvc2UpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIHRoaXMub3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwoKT0+e1xyXG4gICAgICAgIC8vICAgICB0aGlzLmNsb3NlKClcclxuICAgICAgICAvLyB9KVxyXG4gICAgfTtcclxuICAgIFBvcHVwLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwicG9wdXAtY2xvc2VcIik7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZChcInBvcHVwLW9wZW5cIik7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJwb3B1cC1jbG9zZVwiKTtcclxuICAgICAgICB0aGlzLm92ZXJsYXkuY2xhc3NMaXN0LmFkZChcInBvcHVwLW9wZW5cIik7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwibm8tc2Nyb2xsXCIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIFBvcHVwLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJwb3B1cC1vcGVuXCIpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwb3B1cC1jbG9zZVwiKTtcclxuICAgICAgICB0aGlzLm92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZShcInBvcHVwLW9wZW5cIik7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJwb3B1cC1jbG9zZVwiKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJuby1zY3JvbGxcIik7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLmNvbnRhaW5lci5yZW1vdmUoKTtcclxuICAgICAgICAgICAgX3RoaXMub3ZlcmxheS5yZW1vdmUoKTtcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBQb3B1cDtcclxufSgpKTtcclxuZXhwb3J0cy5Qb3B1cCA9IFBvcHVwO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnByb2R1Y3RNYXRjaGVyID0gdm9pZCAwO1xyXG52YXIgc2VydmljZXNTaW5nbGV0b25fcGF0dGVybl8xID0gcmVxdWlyZShcIi4uL3BhdHRlcm5zL3NlcnZpY2VzU2luZ2xldG9uLnBhdHRlcm5cIik7XHJcbnZhciBzdG9yYWdlU2VydmljZSA9IHNlcnZpY2VzU2luZ2xldG9uX3BhdHRlcm5fMS5TZXJ2aWNlU2luZ2xldG9uLnN0b3JhZ2U7XHJcbmZ1bmN0aW9uIHByb2R1Y3RNYXRjaGVyKHByb2R1Y3RMaXN0KSB7XHJcbiAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgdmFyIHByb2R1Y3QgPSBwcm9kdWN0TGlzdFtpXTtcclxuICAgICAgICBtYXRjaCA9IHN0b3JhZ2VTZXJ2aWNlLnJvdWxldHRlLnByb2R1Y3RzLmZpbmQoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubWF0Y2hlciA9PSBwcm9kdWN0O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbWF0Y2ggfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdmFyIG1hdGNoO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9kdWN0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBzdGF0ZV8xID0gX2xvb3BfMShpKTtcclxuICAgICAgICBpZiAodHlwZW9mIHN0YXRlXzEgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZV8xLnZhbHVlO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMucHJvZHVjdE1hdGNoZXIgPSBwcm9kdWN0TWF0Y2hlcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMudWlHZW5lcmF0b3IgPSB2b2lkIDA7XHJcbnZhciBlbnZpcm9ubWVudF8xID0gcmVxdWlyZShcIi4uL2Vudmlyb25tZW50XCIpO1xyXG52YXIgZGV2TG9nX3Rvb2xfMSA9IHJlcXVpcmUoXCIuL2RldkxvZy50b29sXCIpO1xyXG52YXIgbm9XaW5Qb3NpdGlvbl90b29sXzEgPSByZXF1aXJlKFwiLi9ub1dpblBvc2l0aW9uLnRvb2xcIik7XHJcbnZhciBwb3B1cF90b29sXzEgPSByZXF1aXJlKFwiLi9wb3B1cC50b29sXCIpO1xyXG52YXIgdWlHZW5lcmF0b3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHModWlHZW5lcmF0b3IsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiB1aUdlbmVyYXRvcihwYXJlbnQsIGN1cG9uLCB1aWRhdGEpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLnBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICBfdGhpcy5jdXBvbiA9IGN1cG9uO1xyXG4gICAgICAgIF90aGlzLnVpZGF0YSA9IHVpZGF0YTtcclxuICAgICAgICBfdGhpcy5nYW1lT3ZlciA9IGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgICAgICAvLyB0aGlzLm9uQ2xvc2U9KCk9PntcclxuICAgICAgICAvLyAgICAgdmFyIGlucHV0OkhUTUxJbnB1dEVsZW1lbnQ9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb3Vwb25jb2RlXCIpXHJcbiAgICAgICAgLy8gICAgIGlmKGlucHV0ICYmIGN1cG9uICYmIGN1cG9uLmNvZGUgJiYgdGhpcy5nYW1lT3Zlcil7XHJcbiAgICAgICAgLy8gICAgICAgICBpbnB1dC52YWx1ZT1jdXBvbi5jb2RlXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodWlHZW5lcmF0b3IucHJvdG90eXBlLCBcImh0bWxcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgdWlHZW5lcmF0b3IucHJvdG90eXBlLmF0dGF0Y2ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5hdGF0Y2guY2FsbCh0aGlzLCB0aGlzLnBhcmVudCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgdWlHZW5lcmF0b3IucHJvdG90eXBlLnJ1blJvdWxldHRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodGhpcy53aW5UYXJnZXQgIT09IG51bGwpKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5wbGF5KHRoaXMud2luVGFyZ2V0KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZ2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZW5kR2FtZUNvbnRlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICB1aUdlbmVyYXRvci5wcm90b3R5cGUuZ2VuZXJhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgY2FyZCwgY29sXzEsIGNvbF8yLCByb3VsZXR0ZSwgcm91bGV0dGVQaW47XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMubG9hZEltYWdlcygpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5idWlsZC5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZChcInJvdWxldHRlLWNhcmRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbF8xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbF8xLmNsYXNzTGlzdC5hZGQoJ2NvbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xfMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xfMi5jbGFzc0xpc3QuYWRkKCdjb2wnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sXzIuY2xhc3NMaXN0LmFkZCgnZGF0YScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRDb250ZW50KGNvbF8yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm91bGV0dGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3VsZXR0ZS5zcmMgPSBlbnZpcm9ubWVudF8xLmVudmlyb25tZW50LmltZ1N0b3JlLmdldChcInJvdWxldHRlV2hlZWxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdWxldHRlLmNsYXNzTGlzdC5hZGQoJ3JvdWxldHRlLXdoZWVsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdWxldHRlUGluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm91bGV0dGVQaW4uc3JjID0gZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC5pbWdTdG9yZS5nZXQoXCJyb3VsZXR0ZVBpblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm91bGV0dGVQaW4uY2xhc3NMaXN0LmFkZCgncm91bGV0dGUtd2hlZWwtcGluJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbF8xLmFwcGVuZChyb3VsZXR0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbF8xLmFwcGVuZChyb3VsZXR0ZVBpbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmQuYXBwZW5kKGNvbF8xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZC5hcHBlbmQoY29sXzIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmQuYXBwZW5kKGNhcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdWxldHRlID0gcm91bGV0dGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudCA9IGNvbF8yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpc107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHVpR2VuZXJhdG9yLnByb3RvdHlwZS5sb2FkSW1hZ2VzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC5pbWdTdG9yZS5hZGQoXCJpbml0VGl0bGVcIiwgdGhpcy51aWRhdGEuaW1nKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGVudmlyb25tZW50XzEuZW52aXJvbm1lbnQuaW1nU3RvcmUuYWRkKFwiZW5kVGl0bGVcIiwgZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC5zdGF0aWNzVXJsICsgXCJ0aXRsZS1lbmQucG5nXCIpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC5pbWdTdG9yZS5hZGQoXCJyb3VsZXR0ZVdoZWVsXCIsIGVudmlyb25tZW50XzEuZW52aXJvbm1lbnQuc3RhdGljc1VybCArIFwicnVsZXRhLnBuZ1wiKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGVudmlyb25tZW50XzEuZW52aXJvbm1lbnQuaW1nU3RvcmUuYWRkKFwicm91bGV0dGVQaW5cIiwgZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC5zdGF0aWNzVXJsICsgXCJydWxldGEtcGluLnBuZ1wiKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgdWlHZW5lcmF0b3IucHJvdG90eXBlLmluaXRDb250ZW50ID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xyXG4gICAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lciB8fCB0aGlzLmNvbnRlbnQ7XHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCArPSBcIjxpbWcgY2xhc3M9XFxcInJvdWxldHRlLXRpdGxlLWltZ1xcXCIgc3JjPVxcXCJcIiArIChlbnZpcm9ubWVudF8xLmVudmlyb25tZW50LmltZ1N0b3JlLmdldChcImluaXRUaXRsZVwiKSB8fCBcIlwiKSArIFwiXFxcIiBhbHQ9XFxcIlJ1bGV0YSBBdm9uXFxcIi8+XCI7XHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCArPSB0aGlzLmdldFBlcmNlbnRUYWcoKTtcclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MICs9IFwiXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicm91bGV0dGUtaW5pdC1jb250ZW50XFxcIj5cXG4gICAgICAgICAgICAgICAgXCIgKyAodGhpcy51aWRhdGEuaW5pdENvbnRlbnQgfHwgXCJcIikgKyBcIlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgXCI7XHJcbiAgICAgICAgdmFyIGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgYnRuLmlubmVyVGV4dCA9IFwiR2lyYSBsYSBydWxldGEgcGFyYSBnYW5hclwiO1xyXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwicm91bGV0dGUtYnRuXCIpO1xyXG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5ydW5Sb3VsZXR0ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBjb250YWluZXIuYXBwZW5kKGJ0bik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgdWlHZW5lcmF0b3IucHJvdG90eXBlLmVuZEdhbWVDb250ZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGN1cG9uID0gdGhpcy5jdXBvbjtcclxuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250ZW50O1xyXG4gICAgICAgIHZhciBjb250ZW50O1xyXG4gICAgICAgIGlmIChjdXBvbi5jb2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBcIlxcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyBlbnZpcm9ubWVudF8xLmVudmlyb25tZW50LmltZ1N0b3JlLmdldChcImVuZFRpdGxlXCIpICsgXCJcXFwiIGNsYXNzPVxcXCJyb3VsZXR0ZS1maW5hbC10aXRsZVxcXCI+XFxuICAgICAgICAgICAgICAgIFxcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwicm91bGV0dGUtZW5kLXN1YnRpdGxlXFxcIj4gRmVsaWNpdGFjaW9uZXMhIEdhbmFzdGUgdW4gY3VwXFx1MDBGM24gcG9yIGVsIDxzcGFuIGNsYXNzPVxcXCJhY2NlbnRcXFwiPlwiICsgY3Vwb24udHlwZSArIFwiPC9zcGFuPiAgZGUgZGVzY3VlbnRvIGVuIHR1IGNvbXByYSBcXHUwMEExQ29ycmUgYSB1c2FybG8hPHA+XFxuXFxuICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cXFwicm91bGV0dGUtY3Vwb25cXFwiPiA8c3Bhbj5cIiArIGN1cG9uLmNvZGUgKyBcIiA8L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVxcXCJpY29uXFxcIiBpZD1cXFwiQ2FwYV8xXFxcIiBkYXRhLW5hbWU9XFxcIkNhcGEgMVxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB2aWV3Qm94PVxcXCIwIDAgNTMuNjMgNjEuMjhcXFwiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojZmZmO308L3N0eWxlPjwvZGVmcz48cG9seWdvbiBjbGFzcz1cXFwiY2xzLTFcXFwiIHBvaW50cz1cXFwiMTIuNTkgMCAxMi41OSA5LjEzIDQxLjU4IDkuMTMgNDEuNTggNTIuMDcgNTMuNjMgNTIuMDcgNTMuNjMgMCAxMi41OSAwXFxcIi8+PHJlY3QgY2xhc3M9XFxcImNscy0xXFxcIiB5PVxcXCIxMi43OFxcXCIgd2lkdGg9XFxcIjM4LjIyXFxcIiBoZWlnaHQ9XFxcIjQ4LjVcXFwiLz48L3N2Zz5cXG4gICAgICAgICAgICAgICAgPC9oMj5cXG4gICAgICAgICAgICAgICAgXFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJyb3VsZXR0ZS1ib2xkXFxcIj4qRXN0ZSBlcyB0dSBjXFx1MDBGM2RpZ28uIEluZ3JcXHUwMEU5c2FsbyB5IGFwbFxcdTAwRURjYWxvPC9zcGFuPlxcblxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3VsZXR0ZS1lbmQtY29udGVudCBcXFwiPlxcbiAgICAgICAgICAgICAgICAgICBcIiArICh0aGlzLnVpZGF0YS5lbmRDb250ZW50IHx8IFwiXCIpICsgXCJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgXCI7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBjb250ZW50O1xyXG4gICAgICAgICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5pY29uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgIGkuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgaS5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgICAgICAgICAgICAgIGkudmFsdWUgPSBjdXBvbi5jb2RlO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoaSk7XHJcbiAgICAgICAgICAgICAgICBpLnNlbGVjdCgpO1xyXG4gICAgICAgICAgICAgICAgaS5zZXRTZWxlY3Rpb25SYW5nZSgwLCA5OTk5OSk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZChcImNvcHlcIik7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkN1cMOzbiBjb3BpYWRvIGVuIHBvcnRhcGFwZWxlc1wiKTtcclxuICAgICAgICAgICAgICAgIGkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29udGVudCA9IFwiXFxuICAgICAgICAgICAgICAgIDxoNCBzdHlsZT1cXFwiZm9udC1zaXplOjE1cHhcXFwiPiBDYXNpIGxvIGxvZ3JhcyBcXHUwMEExVGUgZGVzZWFtb3MgdW5hIG1lam9yIHN1ZXJ0ZSBsYSBwclxcdTAwRjN4aW1hIHZleiE8L2g0PlxcbiAgICAgICAgICAgIFwiO1xyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gY29udGVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJyb3VsZXR0ZS1idG5cIik7XHJcbiAgICAgICAgYnRuLmlubmVyVGV4dCA9IFwiQ29udGludWFyXCI7XHJcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkgeyBfdGhpcy5jbG9zZSgpOyB9KTtcclxuICAgICAgICBjb250YWluZXIuYXBwZW5kKGJ0bik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgdWlHZW5lcmF0b3IucHJvdG90eXBlLmZpeFNpemUgPSBmdW5jdGlvbiAoY29udGFpbmVyKSB7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lcikuZ2V0UHJvcGVydHlWYWx1ZShcImhlaWdodFwiKTtcclxuICAgICAgICB2YXIgd2lkdGggPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjb250YWluZXIpLmdldFByb3BlcnR5VmFsdWUoXCJ3aWR0aFwiKTtcclxuICAgICAgICBkZXZMb2dfdG9vbF8xLmRldkxvZyhcImZpeC1zaXplOiBjb250YWluZXIsIGgsIHdcIiwgY29udGFpbmVyLCBoZWlnaHQsIFwiLFwiLCB3aWR0aCk7XHJcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICBjb250YWluZXIuc3R5bGUud2lkdGggPSB3aWR0aDtcclxuICAgIH07XHJcbiAgICB1aUdlbmVyYXRvci5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uICh0YXJnZXRab25lLCBkdXJhdGlvbikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHRhcmdldFpvbmUgPT09IHZvaWQgMCkgeyB0YXJnZXRab25lID0gMDsgfVxyXG4gICAgICAgIGlmIChkdXJhdGlvbiA9PT0gdm9pZCAwKSB7IGR1cmF0aW9uID0gMzAwMDsgfVxyXG4gICAgICAgIHZhciB0YXJnZXRab25lID0gdGFyZ2V0Wm9uZTtcclxuICAgICAgICB0aGlzLmZpeFNpemUodGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5jb2xcIikpO1xyXG4gICAgICAgIHRoaXMuZml4U2l6ZSh0aGlzLmNvbnRhaW5lcik7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgdmFyIHN0b3AgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybSA9IHdpbmRvdy5pbm5lcldpZHRoID4gNTUyID8gXCJ0cmFuc2xhdGUoLTQ1JSwgLTUwJSlcIiA6IFwiIHRyYW5zbGF0ZSgtNTAlLCAtNTAlKVwiO1xyXG4gICAgICAgICAgICB2YXIgZGVncmVlcyA9IDA7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXRab25lID49IGVudmlyb25tZW50XzEuZW52aXJvbm1lbnQud2hlZWwuc2lkZXMgfHwgdGFyZ2V0Wm9uZSA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJsYSB6b25hIGRlIGNhaWRhIGVuIHJ1bGV0YSBzb2xvIHB1ZWRlIGlyIGRlc2RlIDAgaGFzdGEgdW4gbGFkb3MgZGUgbGEgcnVsZXRhIC0xXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHN0b3AgPSB0cnVlO1xyXG4gICAgICAgICAgICB9LCBkdXJhdGlvbik7XHJcbiAgICAgICAgICAgIHZhciBzdG9wQXQgPSAzNjAgLSAoKDM2MCAvIGVudmlyb25tZW50XzEuZW52aXJvbm1lbnQud2hlZWwuc2lkZXMpICogdGFyZ2V0Wm9uZSk7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSA1NTIpIHtcclxuICAgICAgICAgICAgICAgIHN0b3BBdCA9IHN0b3BBdCArIDkwID4gMzYwID8gc3RvcEF0IC0gOTAgOiBzdG9wQXQgKyA5MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc3RvcEF0IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0Wm9uZSA9IG5vV2luUG9zaXRpb25fdG9vbF8xLm5vV2luUG9zaXRpb24oZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC53aGVlbC5zaWRlcywgZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC53aW5Qb3NpdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0b3BBdCA9ICgoMzYwIC8gZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC53aGVlbC5zaWRlcykgKiB0YXJnZXRab25lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkZWdyZWVzKSAlIDM2MCA9PSBzdG9wQXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zZm9ybVZhbHVlID0gdHJhbnNmb3JtICsgKFwicm90YXRlWihcIiArIGRlZ3JlZXMgKyBcImRlZylcIik7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5yb3VsZXR0ZS5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1WYWx1ZTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnJvdWxldHRlLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgZGVncmVlcyArPSAoMzYwIC8gZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC53aGVlbC5zaWRlcyk7XHJcbiAgICAgICAgICAgIH0sIDE1MCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgdWlHZW5lcmF0b3IucHJvdG90eXBlLmdldFBlcmNlbnRUYWcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGN1cG9uID0gdGhpcy5jdXBvbjtcclxuICAgICAgICB2YXIgcGVyY2VudCA9IFwiXFxuICAgICAgICA8cD5cIiArIGN1cG9uLnBlcmNlbnREZWxpdmVyZWQgKyBcIiUgZGUgY3Vwb25lcyBlbnRyZWdhZG9zIGhveTwvcD5cXG4gICAgICAgIDxkaXYgY2xhc3M9J3JvdWxldHRlLXBlcmNlbnQnPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J3JvdWxldHRlLXBlcmNlbnQtdmFsJyBzdHlsZT1cXFwid2lkdGg6XCIgKyBjdXBvbi5wZXJjZW50RGVsaXZlcmVkICsgXCIlO1xcXCI+PC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIFwiO1xyXG4gICAgICAgIHJldHVybiBwZXJjZW50O1xyXG4gICAgfTtcclxuICAgIHJldHVybiB1aUdlbmVyYXRvcjtcclxufShwb3B1cF90b29sXzEuUG9wdXApKTtcclxuZXhwb3J0cy51aUdlbmVyYXRvciA9IHVpR2VuZXJhdG9yO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi90eXBlc2NyaXB0L3Rlc3RNYWluLnRzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==