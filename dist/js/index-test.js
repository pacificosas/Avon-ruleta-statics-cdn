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
function avonRoulette() {
    var app = new appChain_pattern_1.AppChain();
    devLog_tool_1.devLog("avon roulette injected");
    app.use("^/cart/?$", styles_middleware_1.styles);
    app.use("^/cart/?$", roulete_getter_middelware_1.getRoulette);
    app.use("^/cart/?$", roulette_trigger_middleware_1.rouletteTrigger);
    app.use("^/cart/?$", cupon_alert_middlerware_1.cuponAlert);
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
    production: false,
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
var servicesSingleton_pattern_1 = __webpack_require__(/*! ../patterns/servicesSingleton.pattern */ "./typescript/patterns/servicesSingleton.pattern.ts");
var popup_tool_1 = __webpack_require__(/*! ../tools/popup.tool */ "./typescript/tools/popup.tool.ts");
var storageService = servicesSingleton_pattern_1.ServiceSingleton.storage;
function cuponAlert(req, res, next) {
    var btn = document.querySelector("a.vi-btn--secondary:nth-child(2)");
    var body = document.body;
    var popup = new popup_tool_1.Popup;
    btn.addEventListener("click", function (e) {
        if (e.target.innerHTML != "Aplicar cupón") {
            return;
        }
        var card = document.createElement("div");
        card.classList.add("cupon-alert-popup");
        card.innerHTML = "\n            <h2>\n            \u00BFEstas segura que no quieres agregar m\u00E1s productos a tu carrito de compras? \n            </h2>\n            <p>\n            Disfruta del porcentaje de descuento que ganaste. Una vez hagas clic en proceder al pago, deber\u00E1s completar el proceso de pago para que el descuento pueda ser efectivo, recuerda que en ese momento ya no podr\u00E1s adicionar m\u00E1s productos a tu carrito\n            </p>\n        ";
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
        var input = document.querySelector("#couponcode");
        storageService.shortSave("cuponInput", input.value);
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
    var cupon = JSON.parse(storageService.get("cupon", false));
    var cuponInput = storageService.get("cuponInput") || "";
    storageService.remove("cuponInput");
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
                        return [2 /*return*/];
                    }
                    cupon = JSON.parse(storageService.get("cupon", false));
                    if (!(cupon == null || (cupon.from !== req.roulette.id && cupon.from > 0))) return [3 /*break*/, 2];
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
var environment_1 = __webpack_require__(/*! ../environment */ "./typescript/environment.ts");
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
        storageService.get("cupon", false);
        if (match && (!storageService.get("cupon", false) || !environment_1.environment.production)) {
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
    StorageService.prototype.remove = function (key, short) {
        if (short === void 0) { short = true; }
        return short ?
            sessionStorage.removeItem("" + this.baseKey + key) :
            localStorage.removeItem("" + this.baseKey + key);
    };
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
    ImgStore.prototype.removeAll = function () {
        this.images.forEach(function (target) {
            window.URL.revokeObjectURL(target.blob);
        });
        this.images = [];
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
        if (this.onClose) {
            this.onClose();
        }
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
        _this.playing = false;
        _this.onClose = function () {
            devLog_tool_1.devLog("uiTools", "remove all images");
            environment_1.environment.imgStore.removeAll();
        };
        return _this;
    }
    Object.defineProperty(uiGenerator.prototype, "html", {
        get: function () {
            return this.container;
        },
        enumerable: false,
        configurable: true
    });
    uiGenerator.prototype.attatch = function () {
        var _this = this;
        this.goToTop();
        _super.prototype.atatch.call(this, this.parent);
        this.card.addEventListener("click", function () {
            if (_this.currentView == "init") {
                _this.runRoulette();
            }
        });
        return this;
    };
    uiGenerator.prototype.runRoulette = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.playing) {
                            return [2 /*return*/];
                        }
                        this.goToTop();
                        if (!(this.winTarget !== null)) return [3 /*break*/, 2];
                        this.playing = true;
                        return [4 /*yield*/, this.play(this.winTarget)];
                    case 1:
                        _a.sent();
                        setTimeout(function () {
                            _this.playing = false;
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
                    case 0:
                        this.goToTop();
                        return [4 /*yield*/, this.loadImages()];
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
    uiGenerator.prototype.goToTop = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                        return [4 /*yield*/, environment_1.environment.imgStore.add("endLoseTitle", environment_1.environment.staticsUrl + "title-end-lose.png")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, environment_1.environment.imgStore.add("rouletteWheel", environment_1.environment.staticsUrl + "ruleta.png")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, environment_1.environment.imgStore.add("roulettePin", environment_1.environment.staticsUrl + "ruleta-pin.png")];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    uiGenerator.prototype.initContent = function (container) {
        var _this = this;
        this.goToTop();
        this.currentView = "init";
        container = container || this.content;
        container.innerHTML += "<img class=\"roulette-title-img\" src=\"" + (environment_1.environment.imgStore.get("initTitle") || "") + "\" alt=\"Ruleta Avon\"/>";
        container.innerHTML += this.getPercentTag();
        container.innerHTML += "\n            <div class=\"roulette-init-content\">\n                " + (this.uidata.initContent || "") + "\n            </div>\n        ";
        var btn = document.createElement("button");
        btn.classList.add("roulette-btn");
        if (this.cupon.percentDelivered == "100") {
            btn.innerText = "Continuar";
            btn.addEventListener("click", function () { return _this.close(); });
        }
        else {
            btn.innerText = "Gira la ruleta para ganar";
            btn.addEventListener("click", this.runRoulette.bind(this));
        }
        container.append(btn);
        return this;
    };
    uiGenerator.prototype.endGameContent = function () {
        var _this = this;
        this.goToTop();
        this.currentView = "end";
        var cupon = this.cupon;
        var container = this.content;
        var content;
        if (cupon.code) {
            content = "\n                <img src=\"" + environment_1.environment.imgStore.get("endTitle") + "\" class=\"roulette-final-title\">\n                \n                <p class=\"roulette-end-subtitle\"> Felicitaciones! Ganaste un cup\u00F3n por el <span class=\"accent\">" + cupon.type + "</span>  de descuento en tu compra \u00A1Corre a usarlo!<p>\n\n                <h2 class=\"roulette-cupon\"> <span>" + cupon.code + " </span>\n                    <span class=\"icon\">\n                    <svg  id=\"Capa_1\" data-name=\"Capa 1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 53.63 61.28\"><defs><style>.cls-1{fill:#fff;}</style></defs><polygon class=\"cls-1\" points=\"12.59 0 12.59 9.13 41.58 9.13 41.58 52.07 53.63 52.07 53.63 0 12.59 0\"/><rect class=\"cls-1\" y=\"12.78\" width=\"38.22\" height=\"48.5\"/></svg>\n                    </span>\n                   \n                </h2>\n                \n                <span class=\"roulette-bold\">*Este es tu c\u00F3digo. Ingr\u00E9salo y apl\u00EDcalo</span>\n\n                <div class=\"roulette-end-content \">\n                   " + (this.uidata.endContent || "") + "\n                </div>\n            ";
            container.innerHTML = content;
            container.querySelector(".icon").addEventListener("click", function () {
                _this.copyToClipBoard();
            });
        }
        else {
            content = "\n                <img src=\"" + environment_1.environment.imgStore.get("endLoseTitle") + "\" class=\"roulette-final-title\">\n                <h4 style=\"font-size:15px\">\u00A1Te deseamos una mejor suerte la pr\u00F3xima vez!</h4>\n            ";
            container.innerHTML = content;
        }
        var btn = document.createElement("button");
        btn.classList.add("roulette-btn");
        btn.innerText = "Continuar";
        btn.addEventListener('click', function () {
            _this.close();
            if (_this.cupon.code) {
                _this.copyToClipBoard();
            }
        });
        container.append(btn);
        return this;
    };
    uiGenerator.prototype.copyToClipBoard = function () {
        var i = document.createElement("input");
        i.style.opacity = "0";
        i.style.position = "absolute";
        i.value = this.cupon.code;
        document.body.append(i);
        i.select();
        i.setSelectionRange(0, 99999);
        document.execCommand("copy");
        alert("Cupón copiado en portapapeles, no olvides aplicarlo.");
        i.remove();
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
                stopAt = stopAt + 90 > 360 ? stopAt + 90 - 360 : stopAt + 90;
            }
            stopAt = stopAt == 360 ? 0 : stopAt;
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
        var percent = "\n        <p>Hoy hemos entregado el " + cupon.percentDelivered + "% de nuestros cupones</p>\n        <div class='roulette-percent'>\n            <div class='roulette-percent-val' style=\"width:" + cupon.percentDelivered + "%;\"></div>\n        </div>\n        ";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hdm9uLXJ1bGV0YS1jZG4vLi90eXBlc2NyaXB0L2F2b25Sb3VsZXR0ZS50cyIsIndlYnBhY2s6Ly9hdm9uLXJ1bGV0YS1jZG4vLi90eXBlc2NyaXB0L2Vudmlyb25tZW50LnRzIiwid2VicGFjazovL2F2b24tcnVsZXRhLWNkbi8uL3R5cGVzY3JpcHQvbWlkZGxld2FyZXMvY3Vwb24tYWxlcnQubWlkZGxlcndhcmUudHMiLCJ3ZWJwYWNrOi8vYXZvbi1ydWxldGEtY2RuLy4vdHlwZXNjcmlwdC9taWRkbGV3YXJlcy9jdXBvbi1jaGVja291dC5taWRkbGV3YXJlLnRzIiwid2VicGFjazovL2F2b24tcnVsZXRhLWNkbi8uL3R5cGVzY3JpcHQvbWlkZGxld2FyZXMvY3Vwb24tZ2V0dGVyLm1pZGRsZXdhcmUudHMiLCJ3ZWJwYWNrOi8vYXZvbi1ydWxldGEtY2RuLy4vdHlwZXNjcmlwdC9taWRkbGV3YXJlcy9yb3VsZXRlLWdldHRlci5taWRkZWx3YXJlLnRzIiwid2VicGFjazovL2F2b24tcnVsZXRhLWNkbi8uL3R5cGVzY3JpcHQvbWlkZGxld2FyZXMvcm91bGV0dGUtaXUubWlkZGxld2FyZS50cyIsIndlYnBhY2s6Ly9hdm9uLXJ1bGV0YS1jZG4vLi90eXBlc2NyaXB0L21pZGRsZXdhcmVzL3JvdWxldHRlLXRyaWdnZXIubWlkZGxld2FyZS50cyIsIndlYnBhY2s6Ly9hdm9uLXJ1bGV0YS1jZG4vLi90eXBlc2NyaXB0L21pZGRsZXdhcmVzL3N0eWxlcy5taWRkbGV3YXJlLnRzIiwid2VicGFjazovL2F2b24tcnVsZXRhLWNkbi8uL3R5cGVzY3JpcHQvbW9kZWxzL3JlcS5tb2RlbC50cyIsIndlYnBhY2s6Ly9hdm9uLXJ1bGV0YS1jZG4vLi90eXBlc2NyaXB0L21vZGVscy91aURhdGEubW9kZWwudHMiLCJ3ZWJwYWNrOi8vYXZvbi1ydWxldGEtY2RuLy4vdHlwZXNjcmlwdC9wYXR0ZXJucy9hcHBDaGFpbi5wYXR0ZXJuLnRzIiwid2VicGFjazovL2F2b24tcnVsZXRhLWNkbi8uL3R5cGVzY3JpcHQvcGF0dGVybnMvc2VydmljZXNTaW5nbGV0b24ucGF0dGVybi50cyIsIndlYnBhY2s6Ly9hdm9uLXJ1bGV0YS1jZG4vLi90eXBlc2NyaXB0L3NlcnZpY2VzL2N1cG9uLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vYXZvbi1ydWxldGEtY2RuLy4vdHlwZXNjcmlwdC9zZXJ2aWNlcy9yb3VsZXR0ZS5zZXJ2aWNlLnRzIiwid2VicGFjazovL2F2b24tcnVsZXRhLWNkbi8uL3R5cGVzY3JpcHQvc2VydmljZXMvc3RvcmFnZS5zZXJ2aWNlLnRzIiwid2VicGFjazovL2F2b24tcnVsZXRhLWNkbi8uL3R5cGVzY3JpcHQvdGVzdE1haW4udHMiLCJ3ZWJwYWNrOi8vYXZvbi1ydWxldGEtY2RuLy4vdHlwZXNjcmlwdC90b29scy9jaGVja291dFJlYWRlci50b29sLnRzIiwid2VicGFjazovL2F2b24tcnVsZXRhLWNkbi8uL3R5cGVzY3JpcHQvdG9vbHMvZGV2TG9nLnRvb2wudHMiLCJ3ZWJwYWNrOi8vYXZvbi1ydWxldGEtY2RuLy4vdHlwZXNjcmlwdC90b29scy9pbWdTdG9yZS50cyIsIndlYnBhY2s6Ly9hdm9uLXJ1bGV0YS1jZG4vLi90eXBlc2NyaXB0L3Rvb2xzL25vV2luUG9zaXRpb24udG9vbC50cyIsIndlYnBhY2s6Ly9hdm9uLXJ1bGV0YS1jZG4vLi90eXBlc2NyaXB0L3Rvb2xzL3BvcHVwLnRvb2wudHMiLCJ3ZWJwYWNrOi8vYXZvbi1ydWxldGEtY2RuLy4vdHlwZXNjcmlwdC90b29scy9wcm9kdWN0TWF0Y2hlci50b29sLnRzIiwid2VicGFjazovL2F2b24tcnVsZXRhLWNkbi8uL3R5cGVzY3JpcHQvdG9vbHMvdWlHZW5lcmF0b3IudG9vbC50cyIsIndlYnBhY2s6Ly9hdm9uLXJ1bGV0YS1jZG4vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXZvbi1ydWxldGEtY2RuL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdz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T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmF2b25Sb3VsZXR0ZSA9IHZvaWQgMDtcclxudmFyIGFwcENoYWluX3BhdHRlcm5fMSA9IHJlcXVpcmUoXCIuL3BhdHRlcm5zL2FwcENoYWluLnBhdHRlcm5cIik7XHJcbnZhciByb3VsZXRlX2dldHRlcl9taWRkZWx3YXJlXzEgPSByZXF1aXJlKFwiLi9taWRkbGV3YXJlcy9yb3VsZXRlLWdldHRlci5taWRkZWx3YXJlXCIpO1xyXG52YXIgcm91bGV0dGVfdHJpZ2dlcl9taWRkbGV3YXJlXzEgPSByZXF1aXJlKFwiLi9taWRkbGV3YXJlcy9yb3VsZXR0ZS10cmlnZ2VyLm1pZGRsZXdhcmVcIik7XHJcbnZhciByZXFfbW9kZWxfMSA9IHJlcXVpcmUoXCIuL21vZGVscy9yZXEubW9kZWxcIik7XHJcbnZhciBjdXBvbl9nZXR0ZXJfbWlkZGxld2FyZV8xID0gcmVxdWlyZShcIi4vbWlkZGxld2FyZXMvY3Vwb24tZ2V0dGVyLm1pZGRsZXdhcmVcIik7XHJcbnZhciByb3VsZXR0ZV9pdV9taWRkbGV3YXJlXzEgPSByZXF1aXJlKFwiLi9taWRkbGV3YXJlcy9yb3VsZXR0ZS1pdS5taWRkbGV3YXJlXCIpO1xyXG52YXIgY3Vwb25fYWxlcnRfbWlkZGxlcndhcmVfMSA9IHJlcXVpcmUoXCIuL21pZGRsZXdhcmVzL2N1cG9uLWFsZXJ0Lm1pZGRsZXJ3YXJlXCIpO1xyXG52YXIgY3Vwb25fY2hlY2tvdXRfbWlkZGxld2FyZV8xID0gcmVxdWlyZShcIi4vbWlkZGxld2FyZXMvY3Vwb24tY2hlY2tvdXQubWlkZGxld2FyZVwiKTtcclxudmFyIHN0eWxlc19taWRkbGV3YXJlXzEgPSByZXF1aXJlKFwiLi9taWRkbGV3YXJlcy9zdHlsZXMubWlkZGxld2FyZVwiKTtcclxudmFyIGRldkxvZ190b29sXzEgPSByZXF1aXJlKFwiLi90b29scy9kZXZMb2cudG9vbFwiKTtcclxuZnVuY3Rpb24gYXZvblJvdWxldHRlKCkge1xyXG4gICAgdmFyIGFwcCA9IG5ldyBhcHBDaGFpbl9wYXR0ZXJuXzEuQXBwQ2hhaW4oKTtcclxuICAgIGRldkxvZ190b29sXzEuZGV2TG9nKFwiYXZvbiByb3VsZXR0ZSBpbmplY3RlZFwiKTtcclxuICAgIGFwcC51c2UoXCJeL2NhcnQvPyRcIiwgc3R5bGVzX21pZGRsZXdhcmVfMS5zdHlsZXMpO1xyXG4gICAgYXBwLnVzZShcIl4vY2FydC8/JFwiLCByb3VsZXRlX2dldHRlcl9taWRkZWx3YXJlXzEuZ2V0Um91bGV0dGUpO1xyXG4gICAgYXBwLnVzZShcIl4vY2FydC8/JFwiLCByb3VsZXR0ZV90cmlnZ2VyX21pZGRsZXdhcmVfMS5yb3VsZXR0ZVRyaWdnZXIpO1xyXG4gICAgYXBwLnVzZShcIl4vY2FydC8/JFwiLCBjdXBvbl9hbGVydF9taWRkbGVyd2FyZV8xLmN1cG9uQWxlcnQpO1xyXG4gICAgYXBwLnVzZShcIl4vY2FydC8/JFwiLCBjdXBvbl9nZXR0ZXJfbWlkZGxld2FyZV8xLmN1cG9uR2V0dGVyKTtcclxuICAgIGFwcC51c2UoXCJeL2NhcnQvPyRcIiwgcm91bGV0dGVfaXVfbWlkZGxld2FyZV8xLnJvdWxldHRlVWkpO1xyXG4gICAgYXBwLnVzZShcIl4vY2hlY2tvdXRkaXJlY3RkZWxpdmVyeS8uKlwiLCBjdXBvbl9jaGVja291dF9taWRkbGV3YXJlXzEuY3Vwb25DaGVja291dCk7XHJcbiAgICB2YXIgYXBwY29uZmlnID0gbmV3IHJlcV9tb2RlbF8xLlJlcU1vZGVsKCk7XHJcbiAgICBhcHBjb25maWcudmlldyA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcclxuICAgIGFwcC5ydW4oYXBwY29uZmlnKTtcclxufVxyXG5leHBvcnRzLmF2b25Sb3VsZXR0ZSA9IGF2b25Sb3VsZXR0ZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5lbnZpcm9ubWVudCA9IHZvaWQgMDtcclxudmFyIGltZ1N0b3JlXzEgPSByZXF1aXJlKFwiLi90b29scy9pbWdTdG9yZVwiKTtcclxuZXhwb3J0cy5lbnZpcm9ubWVudCA9IHtcclxuICAgIHByb2R1Y3Rpb246IGZhbHNlLFxyXG4gICAgYXBpVXJsOiBcImh0dHBzOi8vcnVsZXRhLmF2b25jcGUuY29tL2FwaS9cIixcclxuICAgIHN0YXRpY3NVcmw6IFwiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3BhY2lmaWNvc2FzL2F2b24tcnVsZXRhLXN0YXRpY3MtY2RuQDEvaW1nL1wiLFxyXG4gICAgc3R5bGVzOiBbXHJcbiAgICAgICAgXCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvZ2gvcGFjaWZpY29zYXMvYXZvbi1ydWxldGEtc3RhdGljcy1jZG5AMS9kaXN0L2Nzcy9pbmRleC5jc3NcIlxyXG4gICAgXSxcclxuICAgIC8vIGFwaVVybDogXCJodHRwczovL2xvY2FsaG9zdDo1MDAxL2FwaS9cIixcclxuICAgIC8vIHN0YXRpY3NVcmw6XCJodHRwOi8vMTI3LjAuMC4xOjU1MDAvaW1nL1wiLFxyXG4gICAgLy8gc3R5bGVzOltcclxuICAgIC8vICAgICBcImh0dHA6Ly8xMjcuMC4wLjE6NTUwMC9kaXN0L2Nzcy9pbmRleC5jc3NcIlxyXG4gICAgLy8gXSxcclxuICAgIGdldCBjdXJyZW50Q291bnRyeSgpIHtcclxuICAgICAgICBzd2l0Y2ggKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwid3d3LmF2b24uY29cIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImNvXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInd3dy5hdm9uLmNvbS5lY1wiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZWNcIjtcclxuICAgICAgICAgICAgY2FzZSBcInd3dy5hdm9uLmNvbS5wZVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwicGVcIjtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBnZXQgd2luUG9zaXRpb25zKCkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLndoZWVsLndpblR5cGVzUG9zaXRpb25zKTtcclxuICAgIH0sXHJcbiAgICBpbWdTdG9yZTogbmV3IGltZ1N0b3JlXzEuSW1nU3RvcmUoKSxcclxuICAgIHdoZWVsOiB7XHJcbiAgICAgICAgc2lkZXM6IDEyLFxyXG4gICAgICAgIHdpblR5cGVzUG9zaXRpb25zOiB7XHJcbiAgICAgICAgICAgIDA6IFwiMTAwJVwiLFxyXG4gICAgICAgICAgICAyOiBcIjMwJVwiLFxyXG4gICAgICAgICAgICA0OiBcIjIwJVwiLFxyXG4gICAgICAgICAgICA2OiBcIjUwJVwiLFxyXG4gICAgICAgICAgICA4OiBcIjMwJVwiLFxyXG4gICAgICAgICAgICAxMDogXCI0MCVcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5jdXBvbkFsZXJ0ID0gdm9pZCAwO1xyXG52YXIgc2VydmljZXNTaW5nbGV0b25fcGF0dGVybl8xID0gcmVxdWlyZShcIi4uL3BhdHRlcm5zL3NlcnZpY2VzU2luZ2xldG9uLnBhdHRlcm5cIik7XHJcbnZhciBwb3B1cF90b29sXzEgPSByZXF1aXJlKFwiLi4vdG9vbHMvcG9wdXAudG9vbFwiKTtcclxudmFyIHN0b3JhZ2VTZXJ2aWNlID0gc2VydmljZXNTaW5nbGV0b25fcGF0dGVybl8xLlNlcnZpY2VTaW5nbGV0b24uc3RvcmFnZTtcclxuZnVuY3Rpb24gY3Vwb25BbGVydChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdmFyIGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJhLnZpLWJ0bi0tc2Vjb25kYXJ5Om50aC1jaGlsZCgyKVwiKTtcclxuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keTtcclxuICAgIHZhciBwb3B1cCA9IG5ldyBwb3B1cF90b29sXzEuUG9wdXA7XHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmlubmVySFRNTCAhPSBcIkFwbGljYXIgY3Vww7NuXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKFwiY3Vwb24tYWxlcnQtcG9wdXBcIik7XHJcbiAgICAgICAgY2FyZC5pbm5lckhUTUwgPSBcIlxcbiAgICAgICAgICAgIDxoMj5cXG4gICAgICAgICAgICBcXHUwMEJGRXN0YXMgc2VndXJhIHF1ZSBubyBxdWllcmVzIGFncmVnYXIgbVxcdTAwRTFzIHByb2R1Y3RvcyBhIHR1IGNhcnJpdG8gZGUgY29tcHJhcz8gXFxuICAgICAgICAgICAgPC9oMj5cXG4gICAgICAgICAgICA8cD5cXG4gICAgICAgICAgICBEaXNmcnV0YSBkZWwgcG9yY2VudGFqZSBkZSBkZXNjdWVudG8gcXVlIGdhbmFzdGUuIFVuYSB2ZXogaGFnYXMgY2xpYyBlbiBwcm9jZWRlciBhbCBwYWdvLCBkZWJlclxcdTAwRTFzIGNvbXBsZXRhciBlbCBwcm9jZXNvIGRlIHBhZ28gcGFyYSBxdWUgZWwgZGVzY3VlbnRvIHB1ZWRhIHNlciBlZmVjdGl2bywgcmVjdWVyZGEgcXVlIGVuIGVzZSBtb21lbnRvIHlhIG5vIHBvZHJcXHUwMEUxcyBhZGljaW9uYXIgbVxcdTAwRTFzIHByb2R1Y3RvcyBhIHR1IGNhcnJpdG9cXG4gICAgICAgICAgICA8L3A+XFxuICAgICAgICBcIjtcclxuICAgICAgICAvL2FuYWRpciBib3RvbiBkZSBjb250aW51YXJcclxuICAgICAgICB2YXIgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcInJvdWxldHRlLWJ0blwiKTtcclxuICAgICAgICBidG4uaW5uZXJUZXh0ID0gXCJDb250aW51YXJcIjtcclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7IHBvcHVwLmNsb3NlKCk7IH0pO1xyXG4gICAgICAgIGNhcmQuYXBwZW5kKGJ0bik7XHJcbiAgICAgICAgcG9wdXAuYnVpbGQoKVxyXG4gICAgICAgICAgICAub3BlbigpO1xyXG4gICAgICAgIHBvcHVwLmNhcmQuYXBwZW5kKGNhcmQpO1xyXG4gICAgICAgIHBvcHVwLmF0YXRjaChib2R5KTtcclxuICAgICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvdXBvbmNvZGVcIik7XHJcbiAgICAgICAgc3RvcmFnZVNlcnZpY2Uuc2hvcnRTYXZlKFwiY3Vwb25JbnB1dFwiLCBpbnB1dC52YWx1ZSk7XHJcbiAgICB9KTtcclxuICAgIG5leHQoKTtcclxufVxyXG5leHBvcnRzLmN1cG9uQWxlcnQgPSBjdXBvbkFsZXJ0O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmN1cG9uQ2hlY2tvdXQgPSB2b2lkIDA7XHJcbnZhciBzZXJ2aWNlc1NpbmdsZXRvbl9wYXR0ZXJuXzEgPSByZXF1aXJlKFwiLi4vcGF0dGVybnMvc2VydmljZXNTaW5nbGV0b24ucGF0dGVyblwiKTtcclxudmFyIGRldkxvZ190b29sXzEgPSByZXF1aXJlKFwiLi4vdG9vbHMvZGV2TG9nLnRvb2xcIik7XHJcbnZhciBjdXBvblNlcnZpY2UgPSBzZXJ2aWNlc1NpbmdsZXRvbl9wYXR0ZXJuXzEuU2VydmljZVNpbmdsZXRvbi5jdXBvbjtcclxudmFyIHN0b3JhZ2VTZXJ2aWNlID0gc2VydmljZXNTaW5nbGV0b25fcGF0dGVybl8xLlNlcnZpY2VTaW5nbGV0b24uc3RvcmFnZTtcclxuZnVuY3Rpb24gY3Vwb25DaGVja291dCgpIHtcclxuICAgIHZhciBjdXBvbiA9IEpTT04ucGFyc2Uoc3RvcmFnZVNlcnZpY2UuZ2V0KFwiY3Vwb25cIiwgZmFsc2UpKTtcclxuICAgIHZhciBjdXBvbklucHV0ID0gc3RvcmFnZVNlcnZpY2UuZ2V0KFwiY3Vwb25JbnB1dFwiKSB8fCBcIlwiO1xyXG4gICAgc3RvcmFnZVNlcnZpY2UucmVtb3ZlKFwiY3Vwb25JbnB1dFwiKTtcclxuICAgIGlmIChjdXBvbiAmJiBjdXBvbi5jb2RlICYmIGN1cG9uLmNvZGUudHJpbSgpID09IGN1cG9uSW5wdXQudHJpbSgpKSB7XHJcbiAgICAgICAgZGV2TG9nX3Rvb2xfMS5kZXZMb2coJ2N1cG9uIGNoZWNrb3V0JywgXCJ1c2VcIik7XHJcbiAgICAgICAgY3Vwb25TZXJ2aWNlLnVzZShjdXBvbik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBkZXZMb2dfdG9vbF8xLmRldkxvZyhcImN1cG9uIGNoZWNrb3V0XCIsICdub3RoaW5nIHRvIGRvJyk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5jdXBvbkNoZWNrb3V0ID0gY3Vwb25DaGVja291dDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuY3Vwb25HZXR0ZXIgPSB2b2lkIDA7XHJcbnZhciBzZXJ2aWNlc1NpbmdsZXRvbl9wYXR0ZXJuXzEgPSByZXF1aXJlKFwiLi4vcGF0dGVybnMvc2VydmljZXNTaW5nbGV0b24ucGF0dGVyblwiKTtcclxudmFyIGRldkxvZ190b29sXzEgPSByZXF1aXJlKFwiLi4vdG9vbHMvZGV2TG9nLnRvb2xcIik7XHJcbnZhciBjdXBvblNlcnZpY2UgPSBzZXJ2aWNlc1NpbmdsZXRvbl9wYXR0ZXJuXzEuU2VydmljZVNpbmdsZXRvbi5jdXBvbjtcclxudmFyIHN0b3JhZ2VTZXJ2aWNlID0gc2VydmljZXNTaW5nbGV0b25fcGF0dGVybl8xLlNlcnZpY2VTaW5nbGV0b24uc3RvcmFnZTtcclxuZnVuY3Rpb24gY3Vwb25HZXR0ZXIocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY3Vwb247XHJcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXEucm91bGV0dGUgfHwgIXJlcS5wbGF5Um91bGV0dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjdXBvbiA9IEpTT04ucGFyc2Uoc3RvcmFnZVNlcnZpY2UuZ2V0KFwiY3Vwb25cIiwgZmFsc2UpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIShjdXBvbiA9PSBudWxsIHx8IChjdXBvbi5mcm9tICE9PSByZXEucm91bGV0dGUuaWQgJiYgY3Vwb24uZnJvbSA+IDApKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgZGV2TG9nX3Rvb2xfMS5kZXZMb2coXCJnZXQgbmV3XCIsIGN1cG9uKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBjdXBvblNlcnZpY2UuZ2V0Q3Vwb24ocmVxLnJvdWxldHRlLmlkKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgY3Vwb24gPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cG9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldkxvZ190b29sXzEuZGV2TG9nKFwic2F2ZSBjdXBvblwiLCBjdXBvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JhZ2VTZXJ2aWNlLmxvbmdTYXZlKCdjdXBvbicsIEpTT04uc3RyaW5naWZ5KGN1cG9uKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5jdXBvbiA9IGN1cG9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbmV4dCgpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZGV2TG9nX3Rvb2xfMS5kZXZMb2coJ25vIGN1cG9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIG5leHQoKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxLmN1cG9uID0gY3Vwb247XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5jdXBvbkdldHRlciA9IGN1cG9uR2V0dGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5nZXRSb3VsZXR0ZSA9IHZvaWQgMDtcclxudmFyIHNlcnZpY2VzU2luZ2xldG9uX3BhdHRlcm5fMSA9IHJlcXVpcmUoXCIuLi9wYXR0ZXJucy9zZXJ2aWNlc1NpbmdsZXRvbi5wYXR0ZXJuXCIpO1xyXG52YXIgZGV2TG9nX3Rvb2xfMSA9IHJlcXVpcmUoXCIuLi90b29scy9kZXZMb2cudG9vbFwiKTtcclxudmFyIHN0b3JhZ2VTZXJ2aWNlID0gc2VydmljZXNTaW5nbGV0b25fcGF0dGVybl8xLlNlcnZpY2VTaW5nbGV0b24uc3RvcmFnZTtcclxudmFyIHJvdWxldHRlU2VydmljZSA9IHNlcnZpY2VzU2luZ2xldG9uX3BhdHRlcm5fMS5TZXJ2aWNlU2luZ2xldG9uLnJvdWxldHRlO1xyXG5mdW5jdGlvbiBnZXRSb3VsZXR0ZShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBleGlzdGluZ1JvdWxldHRlLCBfYTtcclxuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1JvdWxldHRlID0gc3RvcmFnZVNlcnZpY2Uucm91bGV0dGU7XHJcbiAgICAgICAgICAgICAgICAgICAgZGV2TG9nX3Rvb2xfMS5kZXZMb2coZXhpc3RpbmdSb3VsZXR0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhZXhpc3RpbmdSb3VsZXR0ZSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgX2EgPSByZXE7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcm91bGV0dGVTZXJ2aWNlLmdldFJvdWxldHRlRGF0YSgpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBfYS5yb3VsZXR0ZSA9IF9iLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlcS5yb3VsZXR0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0b3JhZ2VTZXJ2aWNlLnJvdWxldHRlID0gcmVxLnJvdWxldHRlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDNdO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIHJlcS5yb3VsZXR0ZSA9IGV4aXN0aW5nUm91bGV0dGU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXEucm91bGV0dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDM7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5nZXRSb3VsZXR0ZSA9IGdldFJvdWxldHRlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5yb3VsZXR0ZVVpID0gdm9pZCAwO1xyXG52YXIgZW52aXJvbm1lbnRfMSA9IHJlcXVpcmUoXCIuLi9lbnZpcm9ubWVudFwiKTtcclxudmFyIHVpRGF0YV9tb2RlbF8xID0gcmVxdWlyZShcIi4uL21vZGVscy91aURhdGEubW9kZWxcIik7XHJcbnZhciBub1dpblBvc2l0aW9uX3Rvb2xfMSA9IHJlcXVpcmUoXCIuLi90b29scy9ub1dpblBvc2l0aW9uLnRvb2xcIik7XHJcbnZhciB1aUdlbmVyYXRvcl90b29sXzEgPSByZXF1aXJlKFwiLi4vdG9vbHMvdWlHZW5lcmF0b3IudG9vbFwiKTtcclxuZnVuY3Rpb24gcm91bGV0dGVVaShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciByb290LCB1aWRhdGEsIHVpLCB1aSwgd2luVGFyZ2V0LCB3aW5Qb3NpdGlvbnMsIGtleSwgdmFsO1xyXG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVxLnBsYXlSb3VsZXR0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB1aWRhdGEgPSBuZXcgdWlEYXRhX21vZGVsXzEuVWlEYXRhKHJlcS5yb3VsZXR0ZS5pbWcsIHJlcS5yb3VsZXR0ZS5pbml0Q29udGVudCwgcmVxLnJvdWxldHRlLmZpbmFsQ29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdWkgPSBuZXcgdWlHZW5lcmF0b3JfdG9vbF8xLnVpR2VuZXJhdG9yKHJvb3QsIHJlcS5jdXBvbiwgdWlkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB1aS5nZW5lcmF0ZSgpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICB1aSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB1aS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0YXRjaCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vcGVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luUG9zaXRpb25zID0gZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC53aW5Qb3NpdGlvbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcS5jdXBvbiAmJiByZXEuY3Vwb24udHlwZSAmJiByZXEuY3Vwb24uY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGtleSBpbiBlbnZpcm9ubWVudF8xLmVudmlyb25tZW50LndoZWVsLndpblR5cGVzUG9zaXRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSBlbnZpcm9ubWVudF8xLmVudmlyb25tZW50LndoZWVsLndpblR5cGVzUG9zaXRpb25zW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxLmN1cG9uLnR5cGUudHJpbSgpID09PSB2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5UYXJnZXQgPSBOdW1iZXIoa2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luVGFyZ2V0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5UYXJnZXQgPSBub1dpblBvc2l0aW9uX3Rvb2xfMS5ub1dpblBvc2l0aW9uKGVudmlyb25tZW50XzEuZW52aXJvbm1lbnQud2hlZWwuc2lkZXMsIHdpblBvc2l0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIXJlcS5jdXBvbiB8fCAhd2luVGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpblRhcmdldCA9IG5vV2luUG9zaXRpb25fdG9vbF8xLm5vV2luUG9zaXRpb24oZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC53aGVlbC5zaWRlcywgd2luUG9zaXRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdWkud2luVGFyZ2V0ID0gd2luVGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5yb3VsZXR0ZVVpID0gcm91bGV0dGVVaTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5yb3VsZXR0ZVRyaWdnZXIgPSB2b2lkIDA7XHJcbnZhciBlbnZpcm9ubWVudF8xID0gcmVxdWlyZShcIi4uL2Vudmlyb25tZW50XCIpO1xyXG52YXIgc2VydmljZXNTaW5nbGV0b25fcGF0dGVybl8xID0gcmVxdWlyZShcIi4uL3BhdHRlcm5zL3NlcnZpY2VzU2luZ2xldG9uLnBhdHRlcm5cIik7XHJcbnZhciBjaGVja291dFJlYWRlcl90b29sXzEgPSByZXF1aXJlKFwiLi4vdG9vbHMvY2hlY2tvdXRSZWFkZXIudG9vbFwiKTtcclxudmFyIHByb2R1Y3RNYXRjaGVyX3Rvb2xfMSA9IHJlcXVpcmUoXCIuLi90b29scy9wcm9kdWN0TWF0Y2hlci50b29sXCIpO1xyXG52YXIgc3RvcmFnZVNlcnZpY2UgPSBzZXJ2aWNlc1NpbmdsZXRvbl9wYXR0ZXJuXzEuU2VydmljZVNpbmdsZXRvbi5zdG9yYWdlO1xyXG52YXIgcHJvZHVjdHNDb250YWluZXJTZWxlY3RvciA9IFwiLkNhcnQtUHJvZHVjdHNcIjtcclxudmFyIHByb2R1Y3RzQ29udGFpbmVyO1xyXG52YXIgcHJvZHVjdExpc3QgPSBuZXcgQXJyYXkoKTtcclxuZnVuY3Rpb24gcm91bGV0dGVUcmlnZ2VyKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobSkge1xyXG4gICAgICAgIHByb2R1Y3RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwcm9kdWN0c0NvbnRhaW5lclNlbGVjdG9yKTtcclxuICAgICAgICBpZiAoIXByb2R1Y3RzQ29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvZHVjdExpc3QgPSBjaGVja291dFJlYWRlcl90b29sXzEuY2hlY2tvdXRSZWFkZXIocHJvZHVjdHNDb250YWluZXIpO1xyXG4gICAgICAgIHZhciBtYXRjaCA9IHByb2R1Y3RNYXRjaGVyX3Rvb2xfMS5wcm9kdWN0TWF0Y2hlcihwcm9kdWN0TGlzdCk7XHJcbiAgICAgICAgc3RvcmFnZVNlcnZpY2UuZ2V0KFwiY3Vwb25cIiwgZmFsc2UpO1xyXG4gICAgICAgIGlmIChtYXRjaCAmJiAoIXN0b3JhZ2VTZXJ2aWNlLmdldChcImN1cG9uXCIsIGZhbHNlKSB8fCAhZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC5wcm9kdWN0aW9uKSkge1xyXG4gICAgICAgICAgICByZXEucGxheVJvdWxldHRlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIG5leHQoKTtcclxuICAgIH0pO1xyXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XHJcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlXHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLnJvdWxldHRlVHJpZ2dlciA9IHJvdWxldHRlVHJpZ2dlcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5zdHlsZXMgPSB2b2lkIDA7XHJcbnZhciBlbnZpcm9ubWVudF8xID0gcmVxdWlyZShcIi4uL2Vudmlyb25tZW50XCIpO1xyXG5mdW5jdGlvbiBzdHlsZXMocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHZhciBjbGFzc0lkZW50aWZpZXIgPSBcInJvdWxldHRlLXN0eWxlc1wiO1xyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY2xhc3NJZGVudGlmaWVyKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgbmV4dCgpO1xyXG4gICAgfVxyXG4gICAgZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC5zdHlsZXMuZm9yRWFjaChmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgdmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcclxuICAgICAgICBsaW5rLnJlbCA9IFwic3R5bGVzaGVldFwiO1xyXG4gICAgICAgIGxpbmsuaHJlZiA9IHVybDtcclxuICAgICAgICBsaW5rLmNsYXNzTGlzdC5hZGQoY2xhc3NJZGVudGlmaWVyKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnByZXBlbmQobGluayk7XHJcbiAgICB9KTtcclxuICAgIG5leHQoKTtcclxufVxyXG5leHBvcnRzLnN0eWxlcyA9IHN0eWxlcztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5SZXFNb2RlbCA9IHZvaWQgMDtcclxudmFyIFJlcU1vZGVsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUmVxTW9kZWwodmlldywgcm91bGV0dGUsIHBsYXlSb3VsZXR0ZSwgcm91dGUsIGN1cG9uLCBjdXBvbklucHV0KSB7XHJcbiAgICAgICAgaWYgKHZpZXcgPT09IHZvaWQgMCkgeyB2aWV3ID0gbnVsbDsgfVxyXG4gICAgICAgIGlmIChyb3VsZXR0ZSA9PT0gdm9pZCAwKSB7IHJvdWxldHRlID0gbnVsbDsgfVxyXG4gICAgICAgIGlmIChwbGF5Um91bGV0dGUgPT09IHZvaWQgMCkgeyBwbGF5Um91bGV0dGUgPSBudWxsOyB9XHJcbiAgICAgICAgaWYgKHJvdXRlID09PSB2b2lkIDApIHsgcm91dGUgPSBudWxsOyB9XHJcbiAgICAgICAgaWYgKGN1cG9uID09PSB2b2lkIDApIHsgY3Vwb24gPSBudWxsOyB9XHJcbiAgICAgICAgaWYgKGN1cG9uSW5wdXQgPT09IHZvaWQgMCkgeyBjdXBvbklucHV0ID0gbnVsbDsgfVxyXG4gICAgICAgIHRoaXMudmlldyA9IHZpZXc7XHJcbiAgICAgICAgdGhpcy5yb3VsZXR0ZSA9IHJvdWxldHRlO1xyXG4gICAgICAgIHRoaXMucGxheVJvdWxldHRlID0gcGxheVJvdWxldHRlO1xyXG4gICAgICAgIHRoaXMucm91dGUgPSByb3V0ZTtcclxuICAgICAgICB0aGlzLmN1cG9uID0gY3Vwb247XHJcbiAgICAgICAgdGhpcy5jdXBvbklucHV0ID0gY3Vwb25JbnB1dDtcclxuICAgIH1cclxuICAgIHJldHVybiBSZXFNb2RlbDtcclxufSgpKTtcclxuZXhwb3J0cy5SZXFNb2RlbCA9IFJlcU1vZGVsO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlVpRGF0YSA9IHZvaWQgMDtcclxudmFyIFVpRGF0YSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFVpRGF0YShpbWcsIGluaXRDb250ZW50LCBlbmRDb250ZW50KSB7XHJcbiAgICAgICAgaWYgKGltZyA9PT0gdm9pZCAwKSB7IGltZyA9IFwiXCI7IH1cclxuICAgICAgICBpZiAoaW5pdENvbnRlbnQgPT09IHZvaWQgMCkgeyBpbml0Q29udGVudCA9IFwiXCI7IH1cclxuICAgICAgICBpZiAoZW5kQ29udGVudCA9PT0gdm9pZCAwKSB7IGVuZENvbnRlbnQgPSBcIlwiOyB9XHJcbiAgICAgICAgdGhpcy5pbWcgPSBpbWc7XHJcbiAgICAgICAgdGhpcy5pbml0Q29udGVudCA9IGluaXRDb250ZW50O1xyXG4gICAgICAgIHRoaXMuZW5kQ29udGVudCA9IGVuZENvbnRlbnQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gVWlEYXRhO1xyXG59KCkpO1xyXG5leHBvcnRzLlVpRGF0YSA9IFVpRGF0YTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQXBwQ2hhaW4gPSB2b2lkIDA7XHJcbnZhciByZXFfbW9kZWxfMSA9IHJlcXVpcmUoXCIuLi9tb2RlbHMvcmVxLm1vZGVsXCIpO1xyXG52YXIgQXBwQ2hhaW4gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBwcml2YXRlIHNldGVuZDtcclxuICAgIGZ1bmN0aW9uIEFwcENoYWluKCkge1xyXG4gICAgICAgIHRoaXMubWlkZGVsd2FyZXMgPSBbXTtcclxuICAgIH1cclxuICAgIDtcclxuICAgIEFwcENoYWluLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWlkZGVsd2FyZXMucHVzaCh7IGZ1bmM6IGFyZ3NbMF0gfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5taWRkZWx3YXJlcy5wdXNoKHsgZnVuYzogYXJnc1sxXSwgcm91dGU6IGFyZ3NbMF0gfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEFwcENoYWluLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAocmVxLCByZXMsIGVuZCkge1xyXG4gICAgICAgIGlmIChyZXEgPT09IHZvaWQgMCkgeyByZXEgPSBuZXcgcmVxX21vZGVsXzEuUmVxTW9kZWwoKTsgfVxyXG4gICAgICAgIGlmIChyZXMgPT09IHZvaWQgMCkgeyByZXMgPSB7fTsgfVxyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF9sb29wXzEsIHRoaXNfMSwgaTtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2xvb3BfMSA9IGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudE1pZGRsZXdhcmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50TWlkZGxld2FyZSA9IHRoaXNfMS5taWRkZWx3YXJlc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5yb3V0ZSA9IGN1cnJlbnRNaWRkbGV3YXJlLnJvdXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoKG5ldyBSZWdFeHAocmVxLnJvdXRlKSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEucm91dGUgPT0gXCIqXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEucm91dGUgPT0gXCJcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICFyZXEucm91dGUpKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgY3VycmVudE1pZGRsZXdhcmUuZnVuYyhyZXEsIHJlcywgcmVzb2x2ZSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOyB9KV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNfMSA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShpIDwgdGhpcy5taWRkZWx3YXJlcy5sZW5ndGgpKSByZXR1cm4gWzMgLypicmVhayovLCA0XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs1IC8qeWllbGQqKi8sIF9sb29wXzEoaSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQXBwQ2hhaW47XHJcbn0oKSk7XHJcbmV4cG9ydHMuQXBwQ2hhaW4gPSBBcHBDaGFpbjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5TZXJ2aWNlU2luZ2xldG9uID0gdm9pZCAwO1xyXG52YXIgY3Vwb25fc2VydmljZV8xID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL2N1cG9uLnNlcnZpY2VcIik7XHJcbnZhciByb3VsZXR0ZV9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvcm91bGV0dGUuc2VydmljZVwiKTtcclxudmFyIHN0b3JhZ2Vfc2VydmljZV8xID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL3N0b3JhZ2Uuc2VydmljZVwiKTtcclxudmFyIHJvdWxldHRlU2VydmljZTtcclxudmFyIGN1cG9uU2VydmljZTtcclxudmFyIHN0b3JhZ2VTZXJ2aWNlO1xyXG52YXIgU2VydmljZVNpbmdsZXRvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFNlcnZpY2VTaW5nbGV0b24oKSB7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2VydmljZVNpbmdsZXRvbiwgXCJyb3VsZXR0ZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghcm91bGV0dGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICByb3VsZXR0ZVNlcnZpY2UgPSBuZXcgcm91bGV0dGVfc2VydmljZV8xLlJvdWxldHRlU2VydmljZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByb3VsZXR0ZVNlcnZpY2U7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlcnZpY2VTaW5nbGV0b24sIFwiY3Vwb25cIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIWN1cG9uU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgY3Vwb25TZXJ2aWNlID0gbmV3IGN1cG9uX3NlcnZpY2VfMS5DdXBvblNlcnZpY2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY3Vwb25TZXJ2aWNlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZXJ2aWNlU2luZ2xldG9uLCBcInN0b3JhZ2VcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIXN0b3JhZ2VTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICBzdG9yYWdlU2VydmljZSA9IG5ldyBzdG9yYWdlX3NlcnZpY2VfMS5TdG9yYWdlU2VydmljZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzdG9yYWdlU2VydmljZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gU2VydmljZVNpbmdsZXRvbjtcclxufSgpKTtcclxuZXhwb3J0cy5TZXJ2aWNlU2luZ2xldG9uID0gU2VydmljZVNpbmdsZXRvbjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQ3Vwb25TZXJ2aWNlID0gdm9pZCAwO1xyXG52YXIgZW52aXJvbm1lbnRfMSA9IHJlcXVpcmUoXCIuLi9lbnZpcm9ubWVudFwiKTtcclxudmFyIEN1cG9uU2VydmljZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEN1cG9uU2VydmljZSgpIHtcclxuICAgICAgICB0aGlzLnNlcnZpY2VVcmwgPSBlbnZpcm9ubWVudF8xLmVudmlyb25tZW50LmFwaVVybCArIFwiY3Vwb25zL1wiO1xyXG4gICAgfVxyXG4gICAgQ3Vwb25TZXJ2aWNlLnByb3RvdHlwZS5nZXRDdXBvbiA9IGZ1bmN0aW9uIChyb3VsZXR0ZUlkKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcmF3LCByZXMsIGRhdGEsIGVycm9yXzE7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMCwgMywgLCA0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKHRoaXMuc2VydmljZVVybCArIChcImRlbGl2ZXIvXCIgKyByb3VsZXR0ZUlkKSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmF3ID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByYXcuanNvbigpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHJlcy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgZGF0YV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl8xID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwicmVxdWVzdCByb3VsZXR0ZSBjdXBvbiBmYWlsc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIG51bGxdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBDdXBvblNlcnZpY2UucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIChjdXBvbikge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHJhdywgcmVzLCBlcnJvcl8yO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzAsIDMsICwgNF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaCh0aGlzLnNlcnZpY2VVcmwgKyAoXCJ1c2UvXCIgKyBjdXBvbi5jb2RlKSwgeyBtZXRob2Q6IFwicG9zdFwiIH0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdyA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmF3Lmpzb24oKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXMuc3VjY2Vzc107XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl8yID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwicmVxdWVzdCByb3VsZXR0ZSBjdXBvbiBmYWlsc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIG51bGxdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQ3Vwb25TZXJ2aWNlO1xyXG59KCkpO1xyXG5leHBvcnRzLkN1cG9uU2VydmljZSA9IEN1cG9uU2VydmljZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuUm91bGV0dGVTZXJ2aWNlID0gdm9pZCAwO1xyXG52YXIgZW52aXJvbm1lbnRfMSA9IHJlcXVpcmUoXCIuLi9lbnZpcm9ubWVudFwiKTtcclxudmFyIFJvdWxldHRlU2VydmljZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFJvdWxldHRlU2VydmljZSgpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRDb3VudHJ5ID0gZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC5jdXJyZW50Q291bnRyeSB8fCBcImNvXCI7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlVXJsID0gZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC5hcGlVcmwgKyBcInJvdWxldHRlL1wiO1xyXG4gICAgfVxyXG4gICAgUm91bGV0dGVTZXJ2aWNlLnByb3RvdHlwZS5nZXRSb3VsZXR0ZURhdGEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcmF3LCByZXMsIGVycm9yXzE7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMCwgMywgLCA0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKHRoaXMuc2VydmljZVVybCArIHRoaXMuY3VycmVudENvdW50cnkgKyBcIi9hdmFpbGFibGVcIildO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmF3ID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByYXcuanNvbigpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlcy5kYXRhXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yXzEgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyZXF1ZXN0IHJvdWxldHRlIGRhdGEgZmFpbHNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUm91bGV0dGVTZXJ2aWNlO1xyXG59KCkpO1xyXG5leHBvcnRzLlJvdWxldHRlU2VydmljZSA9IFJvdWxldHRlU2VydmljZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5TdG9yYWdlU2VydmljZSA9IHZvaWQgMDtcclxudmFyIFN0b3JhZ2VTZXJ2aWNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gU3RvcmFnZVNlcnZpY2UoKSB7XHJcbiAgICAgICAgdGhpcy5iYXNlS2V5ID0gXCJyb3VsZXR0ZS1kYXRhLVwiO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFN0b3JhZ2VTZXJ2aWNlLnByb3RvdHlwZSwgXCJyb3VsZXR0ZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLmdldChcInJvdWxldHRlXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvcnRTYXZlKFwicm91bGV0dGVcIiwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIFN0b3JhZ2VTZXJ2aWNlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoa2V5LCBzaG9ydCkge1xyXG4gICAgICAgIGlmIChzaG9ydCA9PT0gdm9pZCAwKSB7IHNob3J0ID0gdHJ1ZTsgfVxyXG4gICAgICAgIHJldHVybiBzaG9ydCA/XHJcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJcIiArIHRoaXMuYmFzZUtleSArIGtleSkgOlxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcIlwiICsgdGhpcy5iYXNlS2V5ICsga2V5KTtcclxuICAgIH07XHJcbiAgICBTdG9yYWdlU2VydmljZS5wcm90b3R5cGUuc2hvcnRTYXZlID0gZnVuY3Rpb24gKGtleSwgZGF0YSkge1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJcIiArIHRoaXMuYmFzZUtleSArIGtleSwgZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgU3RvcmFnZVNlcnZpY2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXksIHNob3J0KSB7XHJcbiAgICAgICAgaWYgKHNob3J0ID09PSB2b2lkIDApIHsgc2hvcnQgPSB0cnVlOyB9XHJcbiAgICAgICAgcmV0dXJuIHNob3J0ID9cclxuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcIlwiICsgdGhpcy5iYXNlS2V5ICsga2V5KSA6XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiXCIgKyB0aGlzLmJhc2VLZXkgKyBrZXkpO1xyXG4gICAgfTtcclxuICAgIFN0b3JhZ2VTZXJ2aWNlLnByb3RvdHlwZS5sb25nU2F2ZSA9IGZ1bmN0aW9uIChrZXksIGRhdGEpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlwiICsgdGhpcy5iYXNlS2V5ICsga2V5LCBkYXRhKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gU3RvcmFnZVNlcnZpY2U7XHJcbn0oKSk7XHJcbmV4cG9ydHMuU3RvcmFnZVNlcnZpY2UgPSBTdG9yYWdlU2VydmljZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGF2b25Sb3VsZXR0ZV8xID0gcmVxdWlyZShcIi4vYXZvblJvdWxldHRlXCIpO1xyXG5hdm9uUm91bGV0dGVfMS5hdm9uUm91bGV0dGUoKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5jaGVja291dFJlYWRlciA9IHZvaWQgMDtcclxuZnVuY3Rpb24gY2hlY2tvdXRSZWFkZXIocHJvZHVjdHNDb250YWluZXIpIHtcclxuICAgIHZhciBwcm9kdWN0TGlzdCA9IG5ldyBBcnJheSgpO1xyXG4gICAgcHJvZHVjdHNDb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi5DYXJ0LVByb2R1Y3ROYW1lIGFcIikuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHByb2R1Y3RMaXN0LnB1c2goaXRlbS5pbm5lclRleHQpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcHJvZHVjdExpc3Q7XHJcbn1cclxuZXhwb3J0cy5jaGVja291dFJlYWRlciA9IGNoZWNrb3V0UmVhZGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRldkxvZyA9IHZvaWQgMDtcclxudmFyIGVudmlyb25tZW50XzEgPSByZXF1aXJlKFwiLi4vZW52aXJvbm1lbnRcIik7XHJcbmZ1bmN0aW9uIGRldkxvZygpIHtcclxuICAgIHZhciBhcmdzID0gW107XHJcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcclxuICAgIH1cclxuICAgIGlmICghZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC5wcm9kdWN0aW9uKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJncyk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZXZMb2cgPSBkZXZMb2c7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkltZ1N0b3JlID0gdm9pZCAwO1xyXG52YXIgZGV2TG9nX3Rvb2xfMSA9IHJlcXVpcmUoXCIuL2RldkxvZy50b29sXCIpO1xyXG52YXIgSW1nU3RvcmUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBJbWdTdG9yZSgpIHtcclxuICAgICAgICB0aGlzLmltYWdlcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgfVxyXG4gICAgSW1nU3RvcmUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChsYWJlbCkge1xyXG4gICAgICAgIHZhciBpdGVtID0gdGhpcy5pbWFnZXMuZmluZChmdW5jdGlvbiAoaSkgeyByZXR1cm4gaS5uYW1lID09IGxhYmVsOyB9KTtcclxuICAgICAgICBkZXZMb2dfdG9vbF8xLmRldkxvZyhcImdldCBpbWdTdG9yYWdlXCIsIGl0ZW0gPyBpdGVtLmJsb2IgOiBudWxsKTtcclxuICAgICAgICByZXR1cm4gaXRlbSA/IGl0ZW0uYmxvYiA6IG51bGw7XHJcbiAgICB9O1xyXG4gICAgSW1nU3RvcmUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChsYWJlbCwgdXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYmxvYjtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV2TG9nX3Rvb2xfMS5kZXZMb2coXCJhZGQgaW1nU3RvcmFnZVwiLCBcInVybCwgbGFiZWxcIiwgdXJsLCBsYWJlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldChsYWJlbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkltZ1N0b3JhZ2UgRXJyb3IgLSB0cnlpbmcgdG8gYWRkIG5ldyBpbWc6IGxhYmVsIFwiICsgbGFiZWwgKyBcIiBhbHJlYWR5IGV4aXN0c1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmxvYWQodXJsKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBibG9iID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGxhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvYjogYmxvYixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdHJ1ZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEltZ1N0b3JlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAobGFiZWwpIHtcclxuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy5pbWFnZXMuZmluZChmdW5jdGlvbiAoaSkgeyBpLm5hbWUgPT0gbGFiZWw7IH0pO1xyXG4gICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKHRhcmdldC5ibG9iKTtcclxuICAgICAgICB0aGlzLmltYWdlcy5zcGxpY2UodGhpcy5pbWFnZXMuaW5kZXhPZih0YXJnZXQpLCAxKTtcclxuICAgIH07XHJcbiAgICBJbWdTdG9yZS5wcm90b3R5cGUucmVtb3ZlQWxsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh0YXJnZXQuYmxvYik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBbXTtcclxuICAgIH07XHJcbiAgICBJbWdTdG9yZS5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByZXMsIGJsb2I7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKHVybCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXMuYmxvYigpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2IgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldkxvZ190b29sXzEuZGV2TG9nKFwiZmV0Y2ggaW1nU3RvcmFnZVwiLCBcInVybCxibG9iXCIsIHVybCwgYmxvYik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYildO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBJbWdTdG9yZTtcclxufSgpKTtcclxuZXhwb3J0cy5JbWdTdG9yZSA9IEltZ1N0b3JlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLm5vV2luUG9zaXRpb24gPSB2b2lkIDA7XHJcbmZ1bmN0aW9uIG5vV2luUG9zaXRpb24od2hlZWxTaWRlcywgd2luUG9zaXRpb25zKSB7XHJcbiAgICB2YXIgcG9zaXRpb25zID0gbmV3IEFycmF5KCk7XHJcbiAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgaWYgKCF3aW5Qb3NpdGlvbnMuZmluZChmdW5jdGlvbiAoeCkgeyByZXR1cm4geCA9PSBpLnRvU3RyaW5nKCk7IH0pKSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKGkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdoZWVsU2lkZXM7IGkrKykge1xyXG4gICAgICAgIF9sb29wXzEoaSk7XHJcbiAgICB9XHJcbiAgICB2YXIgcmFuZG9tID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogcG9zaXRpb25zLmxlbmd0aCk7XHJcbiAgICByZXR1cm4gcG9zaXRpb25zW3JhbmRvbV07XHJcbn1cclxuZXhwb3J0cy5ub1dpblBvc2l0aW9uID0gbm9XaW5Qb3NpdGlvbjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5Qb3B1cCA9IHZvaWQgMDtcclxudmFyIFBvcHVwID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUG9wdXAoKSB7XHJcbiAgICB9XHJcbiAgICBQb3B1cC5wcm90b3R5cGUuYnVpbGQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJwb3B1cC1vdmVybGF5XCIpO1xyXG4gICAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcInBvcHVwXCIpO1xyXG4gICAgICAgIHZhciBjbG9zZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY2xvc2VCdG4uY2xhc3NMaXN0LmFkZChcInBvcHVwLWNsb3NlclwiKTtcclxuICAgICAgICBjbG9zZUJ0bi5pbm5lckhUTUwgPSBcIiYjeGQ3O1wiO1xyXG4gICAgICAgIHZhciBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKFwicG9wdXAtY2FyZFwiKTtcclxuICAgICAgICBjb250YWluZXIuYXBwZW5kKGNhcmQpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmQoY2xvc2VCdG4pO1xyXG4gICAgICAgIHRoaXMub3ZlcmxheSA9IG92ZXJsYXk7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5jYXJkID0gY2FyZDtcclxuICAgICAgICB0aGlzLmV2ZW50TGlzdGVubmVycygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIFBvcHVwLnByb3RvdHlwZS5hdGF0Y2ggPSBmdW5jdGlvbiAocGFyZW50KSB7XHJcbiAgICAgICAgcGFyZW50LmFwcGVuZCh0aGlzLm92ZXJsYXkpO1xyXG4gICAgICAgIHBhcmVudC5hcHBlbmQodGhpcy5jb250YWluZXIpO1xyXG4gICAgfTtcclxuICAgIFBvcHVwLnByb3RvdHlwZS5ldmVudExpc3Rlbm5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucG9wdXAtY2xvc2VyJykuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMuY2xvc2UoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyB0aGlzLm92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKCk9PntcclxuICAgICAgICAvLyAgICAgdGhpcy5jbG9zZSgpXHJcbiAgICAgICAgLy8gfSlcclxuICAgIH07XHJcbiAgICBQb3B1cC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcInBvcHVwLWNsb3NlXCIpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwb3B1cC1vcGVuXCIpO1xyXG4gICAgICAgIHRoaXMub3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKFwicG9wdXAtY2xvc2VcIik7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJwb3B1cC1vcGVuXCIpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIm5vLXNjcm9sbFwiKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBQb3B1cC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAodGhpcy5vbkNsb3NlKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwicG9wdXAtb3BlblwiKTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicG9wdXAtY2xvc2VcIik7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJwb3B1cC1vcGVuXCIpO1xyXG4gICAgICAgIHRoaXMub3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwicG9wdXAtY2xvc2VcIik7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwibm8tc2Nyb2xsXCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5jb250YWluZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIF90aGlzLm92ZXJsYXkucmVtb3ZlKCk7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICByZXR1cm4gUG9wdXA7XHJcbn0oKSk7XHJcbmV4cG9ydHMuUG9wdXAgPSBQb3B1cDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5wcm9kdWN0TWF0Y2hlciA9IHZvaWQgMDtcclxudmFyIHNlcnZpY2VzU2luZ2xldG9uX3BhdHRlcm5fMSA9IHJlcXVpcmUoXCIuLi9wYXR0ZXJucy9zZXJ2aWNlc1NpbmdsZXRvbi5wYXR0ZXJuXCIpO1xyXG52YXIgc3RvcmFnZVNlcnZpY2UgPSBzZXJ2aWNlc1NpbmdsZXRvbl9wYXR0ZXJuXzEuU2VydmljZVNpbmdsZXRvbi5zdG9yYWdlO1xyXG5mdW5jdGlvbiBwcm9kdWN0TWF0Y2hlcihwcm9kdWN0TGlzdCkge1xyXG4gICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgIHZhciBwcm9kdWN0ID0gcHJvZHVjdExpc3RbaV07XHJcbiAgICAgICAgbWF0Y2ggPSBzdG9yYWdlU2VydmljZS5yb3VsZXR0ZS5wcm9kdWN0cy5maW5kKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLm1hdGNoZXIgPT0gcHJvZHVjdDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG1hdGNoIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHZhciBtYXRjaDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvZHVjdExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgc3RhdGVfMSA9IF9sb29wXzEoaSk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZV8xID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGVfMS52YWx1ZTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnByb2R1Y3RNYXRjaGVyID0gcHJvZHVjdE1hdGNoZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnVpR2VuZXJhdG9yID0gdm9pZCAwO1xyXG52YXIgZW52aXJvbm1lbnRfMSA9IHJlcXVpcmUoXCIuLi9lbnZpcm9ubWVudFwiKTtcclxudmFyIGRldkxvZ190b29sXzEgPSByZXF1aXJlKFwiLi9kZXZMb2cudG9vbFwiKTtcclxudmFyIG5vV2luUG9zaXRpb25fdG9vbF8xID0gcmVxdWlyZShcIi4vbm9XaW5Qb3NpdGlvbi50b29sXCIpO1xyXG52YXIgcG9wdXBfdG9vbF8xID0gcmVxdWlyZShcIi4vcG9wdXAudG9vbFwiKTtcclxudmFyIHVpR2VuZXJhdG9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKHVpR2VuZXJhdG9yLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gdWlHZW5lcmF0b3IocGFyZW50LCBjdXBvbiwgdWlkYXRhKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgX3RoaXMuY3Vwb24gPSBjdXBvbjtcclxuICAgICAgICBfdGhpcy51aWRhdGEgPSB1aWRhdGE7XHJcbiAgICAgICAgX3RoaXMuZ2FtZU92ZXIgPSBmYWxzZTtcclxuICAgICAgICBfdGhpcy5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgX3RoaXMub25DbG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZGV2TG9nX3Rvb2xfMS5kZXZMb2coXCJ1aVRvb2xzXCIsIFwicmVtb3ZlIGFsbCBpbWFnZXNcIik7XHJcbiAgICAgICAgICAgIGVudmlyb25tZW50XzEuZW52aXJvbm1lbnQuaW1nU3RvcmUucmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodWlHZW5lcmF0b3IucHJvdG90eXBlLCBcImh0bWxcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgdWlHZW5lcmF0b3IucHJvdG90eXBlLmF0dGF0Y2ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLmdvVG9Ub3AoKTtcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmF0YXRjaC5jYWxsKHRoaXMsIHRoaXMucGFyZW50KTtcclxuICAgICAgICB0aGlzLmNhcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKF90aGlzLmN1cnJlbnRWaWV3ID09IFwiaW5pdFwiKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5ydW5Sb3VsZXR0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgdWlHZW5lcmF0b3IucHJvdG90eXBlLnJ1blJvdWxldHRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ29Ub1RvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh0aGlzLndpblRhcmdldCAhPT0gbnVsbCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnBsYXkodGhpcy53aW5UYXJnZXQpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5nYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5lbmRHYW1lQ29udGVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHVpR2VuZXJhdG9yLnByb3RvdHlwZS5nZW5lcmF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjYXJkLCBjb2xfMSwgY29sXzIsIHJvdWxldHRlLCByb3VsZXR0ZVBpbjtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nb1RvVG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMubG9hZEltYWdlcygpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5idWlsZC5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZChcInJvdWxldHRlLWNhcmRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbF8xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbF8xLmNsYXNzTGlzdC5hZGQoJ2NvbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xfMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xfMi5jbGFzc0xpc3QuYWRkKCdjb2wnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sXzIuY2xhc3NMaXN0LmFkZCgnZGF0YScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRDb250ZW50KGNvbF8yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm91bGV0dGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3VsZXR0ZS5zcmMgPSBlbnZpcm9ubWVudF8xLmVudmlyb25tZW50LmltZ1N0b3JlLmdldChcInJvdWxldHRlV2hlZWxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdWxldHRlLmNsYXNzTGlzdC5hZGQoJ3JvdWxldHRlLXdoZWVsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdWxldHRlUGluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm91bGV0dGVQaW4uc3JjID0gZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC5pbWdTdG9yZS5nZXQoXCJyb3VsZXR0ZVBpblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm91bGV0dGVQaW4uY2xhc3NMaXN0LmFkZCgncm91bGV0dGUtd2hlZWwtcGluJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbF8xLmFwcGVuZChyb3VsZXR0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbF8xLmFwcGVuZChyb3VsZXR0ZVBpbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmQuYXBwZW5kKGNvbF8xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZC5hcHBlbmQoY29sXzIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmQuYXBwZW5kKGNhcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdWxldHRlID0gcm91bGV0dGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudCA9IGNvbF8yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpc107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHVpR2VuZXJhdG9yLnByb3RvdHlwZS5nb1RvVG9wID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogMCwgYmVoYXZpb3I6ICdzbW9vdGgnIH0pO1xyXG4gICAgfTtcclxuICAgIHVpR2VuZXJhdG9yLnByb3RvdHlwZS5sb2FkSW1hZ2VzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC5pbWdTdG9yZS5hZGQoXCJpbml0VGl0bGVcIiwgdGhpcy51aWRhdGEuaW1nKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGVudmlyb25tZW50XzEuZW52aXJvbm1lbnQuaW1nU3RvcmUuYWRkKFwiZW5kVGl0bGVcIiwgZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC5zdGF0aWNzVXJsICsgXCJ0aXRsZS1lbmQucG5nXCIpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC5pbWdTdG9yZS5hZGQoXCJlbmRMb3NlVGl0bGVcIiwgZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC5zdGF0aWNzVXJsICsgXCJ0aXRsZS1lbmQtbG9zZS5wbmdcIildO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBlbnZpcm9ubWVudF8xLmVudmlyb25tZW50LmltZ1N0b3JlLmFkZChcInJvdWxldHRlV2hlZWxcIiwgZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC5zdGF0aWNzVXJsICsgXCJydWxldGEucG5nXCIpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC5pbWdTdG9yZS5hZGQoXCJyb3VsZXR0ZVBpblwiLCBlbnZpcm9ubWVudF8xLmVudmlyb25tZW50LnN0YXRpY3NVcmwgKyBcInJ1bGV0YS1waW4ucG5nXCIpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICB1aUdlbmVyYXRvci5wcm90b3R5cGUuaW5pdENvbnRlbnQgPSBmdW5jdGlvbiAoY29udGFpbmVyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLmdvVG9Ub3AoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRWaWV3ID0gXCJpbml0XCI7XHJcbiAgICAgICAgY29udGFpbmVyID0gY29udGFpbmVyIHx8IHRoaXMuY29udGVudDtcclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MICs9IFwiPGltZyBjbGFzcz1cXFwicm91bGV0dGUtdGl0bGUtaW1nXFxcIiBzcmM9XFxcIlwiICsgKGVudmlyb25tZW50XzEuZW52aXJvbm1lbnQuaW1nU3RvcmUuZ2V0KFwiaW5pdFRpdGxlXCIpIHx8IFwiXCIpICsgXCJcXFwiIGFsdD1cXFwiUnVsZXRhIEF2b25cXFwiLz5cIjtcclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MICs9IHRoaXMuZ2V0UGVyY2VudFRhZygpO1xyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgKz0gXCJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3VsZXR0ZS1pbml0LWNvbnRlbnRcXFwiPlxcbiAgICAgICAgICAgICAgICBcIiArICh0aGlzLnVpZGF0YS5pbml0Q29udGVudCB8fCBcIlwiKSArIFwiXFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICBcIjtcclxuICAgICAgICB2YXIgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcInJvdWxldHRlLWJ0blwiKTtcclxuICAgICAgICBpZiAodGhpcy5jdXBvbi5wZXJjZW50RGVsaXZlcmVkID09IFwiMTAwXCIpIHtcclxuICAgICAgICAgICAgYnRuLmlubmVyVGV4dCA9IFwiQ29udGludWFyXCI7XHJcbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuY2xvc2UoKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBidG4uaW5uZXJUZXh0ID0gXCJHaXJhIGxhIHJ1bGV0YSBwYXJhIGdhbmFyXCI7XHJcbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5ydW5Sb3VsZXR0ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZChidG4pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIHVpR2VuZXJhdG9yLnByb3RvdHlwZS5lbmRHYW1lQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZ29Ub1RvcCgpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFZpZXcgPSBcImVuZFwiO1xyXG4gICAgICAgIHZhciBjdXBvbiA9IHRoaXMuY3Vwb247XHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY29udGVudDtcclxuICAgICAgICB2YXIgY29udGVudDtcclxuICAgICAgICBpZiAoY3Vwb24uY29kZSkge1xyXG4gICAgICAgICAgICBjb250ZW50ID0gXCJcXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XFxcIlwiICsgZW52aXJvbm1lbnRfMS5lbnZpcm9ubWVudC5pbWdTdG9yZS5nZXQoXCJlbmRUaXRsZVwiKSArIFwiXFxcIiBjbGFzcz1cXFwicm91bGV0dGUtZmluYWwtdGl0bGVcXFwiPlxcbiAgICAgICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcInJvdWxldHRlLWVuZC1zdWJ0aXRsZVxcXCI+IEZlbGljaXRhY2lvbmVzISBHYW5hc3RlIHVuIGN1cFxcdTAwRjNuIHBvciBlbCA8c3BhbiBjbGFzcz1cXFwiYWNjZW50XFxcIj5cIiArIGN1cG9uLnR5cGUgKyBcIjwvc3Bhbj4gIGRlIGRlc2N1ZW50byBlbiB0dSBjb21wcmEgXFx1MDBBMUNvcnJlIGEgdXNhcmxvITxwPlxcblxcbiAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XFxcInJvdWxldHRlLWN1cG9uXFxcIj4gPHNwYW4+XCIgKyBjdXBvbi5jb2RlICsgXCIgPC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImljb25cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHN2ZyAgaWQ9XFxcIkNhcGFfMVxcXCIgZGF0YS1uYW1lPVxcXCJDYXBhIDFcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgdmlld0JveD1cXFwiMCAwIDUzLjYzIDYxLjI4XFxcIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9PC9zdHlsZT48L2RlZnM+PHBvbHlnb24gY2xhc3M9XFxcImNscy0xXFxcIiBwb2ludHM9XFxcIjEyLjU5IDAgMTIuNTkgOS4xMyA0MS41OCA5LjEzIDQxLjU4IDUyLjA3IDUzLjYzIDUyLjA3IDUzLjYzIDAgMTIuNTkgMFxcXCIvPjxyZWN0IGNsYXNzPVxcXCJjbHMtMVxcXCIgeT1cXFwiMTIuNzhcXFwiIHdpZHRoPVxcXCIzOC4yMlxcXCIgaGVpZ2h0PVxcXCI0OC41XFxcIi8+PC9zdmc+XFxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgIFxcbiAgICAgICAgICAgICAgICA8L2gyPlxcbiAgICAgICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInJvdWxldHRlLWJvbGRcXFwiPipFc3RlIGVzIHR1IGNcXHUwMEYzZGlnby4gSW5nclxcdTAwRTlzYWxvIHkgYXBsXFx1MDBFRGNhbG88L3NwYW4+XFxuXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInJvdWxldHRlLWVuZC1jb250ZW50IFxcXCI+XFxuICAgICAgICAgICAgICAgICAgIFwiICsgKHRoaXMudWlkYXRhLmVuZENvbnRlbnQgfHwgXCJcIikgKyBcIlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICBcIjtcclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmljb25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmNvcHlUb0NsaXBCb2FyZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBcIlxcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyBlbnZpcm9ubWVudF8xLmVudmlyb25tZW50LmltZ1N0b3JlLmdldChcImVuZExvc2VUaXRsZVwiKSArIFwiXFxcIiBjbGFzcz1cXFwicm91bGV0dGUtZmluYWwtdGl0bGVcXFwiPlxcbiAgICAgICAgICAgICAgICA8aDQgc3R5bGU9XFxcImZvbnQtc2l6ZToxNXB4XFxcIj5cXHUwMEExVGUgZGVzZWFtb3MgdW5hIG1lam9yIHN1ZXJ0ZSBsYSBwclxcdTAwRjN4aW1hIHZleiE8L2g0PlxcbiAgICAgICAgICAgIFwiO1xyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gY29udGVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJyb3VsZXR0ZS1idG5cIik7XHJcbiAgICAgICAgYnRuLmlubmVyVGV4dCA9IFwiQ29udGludWFyXCI7XHJcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMuY3Vwb24uY29kZSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuY29weVRvQ2xpcEJvYXJkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBjb250YWluZXIuYXBwZW5kKGJ0bik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgdWlHZW5lcmF0b3IucHJvdG90eXBlLmNvcHlUb0NsaXBCb2FyZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICBpLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcclxuICAgICAgICBpLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgICAgIGkudmFsdWUgPSB0aGlzLmN1cG9uLmNvZGU7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoaSk7XHJcbiAgICAgICAgaS5zZWxlY3QoKTtcclxuICAgICAgICBpLnNldFNlbGVjdGlvblJhbmdlKDAsIDk5OTk5KTtcclxuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZChcImNvcHlcIik7XHJcbiAgICAgICAgYWxlcnQoXCJDdXDDs24gY29waWFkbyBlbiBwb3J0YXBhcGVsZXMsIG5vIG9sdmlkZXMgYXBsaWNhcmxvLlwiKTtcclxuICAgICAgICBpLnJlbW92ZSgpO1xyXG4gICAgfTtcclxuICAgIHVpR2VuZXJhdG9yLnByb3RvdHlwZS5maXhTaXplID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjb250YWluZXIpLmdldFByb3BlcnR5VmFsdWUoXCJoZWlnaHRcIik7XHJcbiAgICAgICAgdmFyIHdpZHRoID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoY29udGFpbmVyKS5nZXRQcm9wZXJ0eVZhbHVlKFwid2lkdGhcIik7XHJcbiAgICAgICAgZGV2TG9nX3Rvb2xfMS5kZXZMb2coXCJmaXgtc2l6ZTogY29udGFpbmVyLCBoLCB3XCIsIGNvbnRhaW5lciwgaGVpZ2h0LCBcIixcIiwgd2lkdGgpO1xyXG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gd2lkdGg7XHJcbiAgICB9O1xyXG4gICAgdWlHZW5lcmF0b3IucHJvdG90eXBlLnBsYXkgPSBmdW5jdGlvbiAodGFyZ2V0Wm9uZSwgZHVyYXRpb24pIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICh0YXJnZXRab25lID09PSB2b2lkIDApIHsgdGFyZ2V0Wm9uZSA9IDA7IH1cclxuICAgICAgICBpZiAoZHVyYXRpb24gPT09IHZvaWQgMCkgeyBkdXJhdGlvbiA9IDMwMDA7IH1cclxuICAgICAgICB2YXIgdGFyZ2V0Wm9uZSA9IHRhcmdldFpvbmU7XHJcbiAgICAgICAgdGhpcy5maXhTaXplKHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuY29sXCIpKTtcclxuICAgICAgICB0aGlzLmZpeFNpemUodGhpcy5jb250YWluZXIpO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIHZhciBzdG9wID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm0gPSB3aW5kb3cuaW5uZXJXaWR0aCA+IDU1MiA/IFwidHJhbnNsYXRlKC00NSUsIC01MCUpXCIgOiBcIiB0cmFuc2xhdGUoLTUwJSwgLTUwJSlcIjtcclxuICAgICAgICAgICAgdmFyIGRlZ3JlZXMgPSAwO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0Wm9uZSA+PSBlbnZpcm9ubWVudF8xLmVudmlyb25tZW50LndoZWVsLnNpZGVzIHx8IHRhcmdldFpvbmUgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwibGEgem9uYSBkZSBjYWlkYSBlbiBydWxldGEgc29sbyBwdWVkZSBpciBkZXNkZSAwIGhhc3RhIHVuIGxhZG9zIGRlIGxhIHJ1bGV0YSAtMVwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzdG9wID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSwgZHVyYXRpb24pO1xyXG4gICAgICAgICAgICB2YXIgc3RvcEF0ID0gMzYwIC0gKCgzNjAgLyBlbnZpcm9ubWVudF8xLmVudmlyb25tZW50LndoZWVsLnNpZGVzKSAqIHRhcmdldFpvbmUpO1xyXG4gICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPD0gNTUyKSB7XHJcbiAgICAgICAgICAgICAgICBzdG9wQXQgPSBzdG9wQXQgKyA5MCA+IDM2MCA/IHN0b3BBdCArIDkwIC0gMzYwIDogc3RvcEF0ICsgOTA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RvcEF0ID0gc3RvcEF0ID09IDM2MCA/IDAgOiBzdG9wQXQ7XHJcbiAgICAgICAgICAgIGlmIChzdG9wQXQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRab25lID0gbm9XaW5Qb3NpdGlvbl90b29sXzEubm9XaW5Qb3NpdGlvbihlbnZpcm9ubWVudF8xLmVudmlyb25tZW50LndoZWVsLnNpZGVzLCBlbnZpcm9ubWVudF8xLmVudmlyb25tZW50LndpblBvc2l0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RvcEF0ID0gKCgzNjAgLyBlbnZpcm9ubWVudF8xLmVudmlyb25tZW50LndoZWVsLnNpZGVzKSAqIHRhcmdldFpvbmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRlZ3JlZXMpICUgMzYwID09IHN0b3BBdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNmb3JtVmFsdWUgPSB0cmFuc2Zvcm0gKyAoXCJyb3RhdGVaKFwiICsgZGVncmVlcyArIFwiZGVnKVwiKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnJvdWxldHRlLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMucm91bGV0dGUuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBkZWdyZWVzICs9ICgzNjAgLyBlbnZpcm9ubWVudF8xLmVudmlyb25tZW50LndoZWVsLnNpZGVzKTtcclxuICAgICAgICAgICAgfSwgMTUwKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICB1aUdlbmVyYXRvci5wcm90b3R5cGUuZ2V0UGVyY2VudFRhZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY3Vwb24gPSB0aGlzLmN1cG9uO1xyXG4gICAgICAgIHZhciBwZXJjZW50ID0gXCJcXG4gICAgICAgIDxwPkhveSBoZW1vcyBlbnRyZWdhZG8gZWwgXCIgKyBjdXBvbi5wZXJjZW50RGVsaXZlcmVkICsgXCIlIGRlIG51ZXN0cm9zIGN1cG9uZXM8L3A+XFxuICAgICAgICA8ZGl2IGNsYXNzPSdyb3VsZXR0ZS1wZXJjZW50Jz5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdyb3VsZXR0ZS1wZXJjZW50LXZhbCcgc3R5bGU9XFxcIndpZHRoOlwiICsgY3Vwb24ucGVyY2VudERlbGl2ZXJlZCArIFwiJTtcXFwiPjwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICBcIjtcclxuICAgICAgICByZXR1cm4gcGVyY2VudDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gdWlHZW5lcmF0b3I7XHJcbn0ocG9wdXBfdG9vbF8xLlBvcHVwKSk7XHJcbmV4cG9ydHMudWlHZW5lcmF0b3IgPSB1aUdlbmVyYXRvcjtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vdHlwZXNjcmlwdC90ZXN0TWFpbi50c1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=