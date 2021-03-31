(()=>{"use strict";var e={858:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.avonRoulette=void 0;var r=n(639),o=n(389),i=n(798),a=n(292),u=n(415),c=n(281),s=n(135),l=n(651),p=n(425),d=n(447);t.avonRoulette=function(){var e=new r.AppChain;d.devLog("avon roulette injected"),e.use("^/cart/?$",p.styles),e.use("^/cart/?$",o.getRoulette),e.use("^/cart/?$",i.rouletteTrigger),e.use("^/cart/?$",s.cuponAlert),e.use("^/cart/?$",u.cuponGetter),e.use("^/cart/?$",c.rouletteUi),e.use("^/checkoutdirectdelivery/.*",l.cuponCheckout);var t=new a.ReqModel;t.view=window.location.pathname,e.run(t)}},439:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.environment=void 0;var r=n(196);t.environment={production:!0,apiUrl:"https://ruleta.avoncpe.com/api/",styles:["https://cdn.jsdelivr.net/gh/pacificosas/avon-ruleta-statics-cdn@1/dist/css/index.css"],staticsUrl:"http://127.0.0.1:5500/img/",get currentCountry(){switch(window.location.hostname){case"www.avon.co":return"co";case"www.avon.com.ec":return"ec";case"www.avon.com.pe":return"pe"}},get winPositions(){return Object.keys(this.wheel.winTypesPositions)},imgStore:new r.ImgStore,wheel:{sides:12,winTypesPositions:{0:"5%",2:"10%",4:"15%",6:"20%",8:"25%",10:"30%"}}}},169:(e,t,n)=>{var r=n(858);r.avonRoulette(),window.avonRoulette=r.avonRoulette},135:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.cuponAlert=void 0;var r=n(287),o=n(727),i=r.ServiceSingleton.storage;t.cuponAlert=function(e,t,n){var r=document.querySelector("a.vi-btn--secondary:nth-child(2)"),a=document.body,u=new o.Popup;r.addEventListener("click",(function(e){if("Aplicar cupón"==e.target.innerHTML){var t=document.createElement("div");t.classList.add("cupon-alert-popup"),t.innerHTML="\n            <h2>\n            ¿Estas segura que no quieres agregar más productos a tu carrito de compras? \n            </h2>\n            <p>\n            Disfruta del porcentaje de descuento que ganaste. Una vez hagas clic en proceder al pago, deberás completar el proceso de pago para que el descuento pueda ser efectivo, recuerda que en ese momento ya no podrás adicionar más productos a tu carrito\n            </p>\n        ";var n=document.createElement("button");n.classList.add("roulette-btn"),n.innerText="Continuar",n.addEventListener("click",(function(){u.close()})),t.append(n),u.build().open(),u.card.append(t),u.atatch(a);var r=document.querySelector("#couponcode");i.shortSave("cuponInput",r.value)}})),n()}},651:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.cuponCheckout=void 0;var r=n(287),o=n(447),i=r.ServiceSingleton.cupon,a=r.ServiceSingleton.storage;t.cuponCheckout=function(){var e=JSON.parse(a.get("cupon",!1)),t=a.get("cuponInput")||"";a.remove("cuponInput"),e&&e.code&&e.code.trim()==t.trim()?(o.devLog("cupon checkout","use"),i.use(e)):o.devLog("cupon checkout","nothing to do")}},415:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}c((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.cuponGetter=void 0;var i=n(287),a=n(447),u=i.ServiceSingleton.cupon,c=i.ServiceSingleton.storage;t.cuponGetter=function(e,t,n){return r(this,void 0,void 0,(function(){var t;return o(this,(function(r){switch(r.label){case 0:return e.roulette&&e.playRoulette?null==(t=JSON.parse(c.get("cupon",!1)))||t.from!==e.roulette.id&&t.from>0?(a.devLog("get new",t),[4,u.getCupon(e.roulette.id)]):[3,2]:[2];case 1:return(t=r.sent())?(a.devLog("save cupon",t),c.longSave("cupon",JSON.stringify(t)),e.cupon=t,[2,n()]):(a.devLog("no cupon"),[2,n()]);case 2:return e.cupon=t,n(),[2]}}))}))}},389:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}c((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.getRoulette=void 0;var i=n(287),a=n(447),u=i.ServiceSingleton.storage,c=i.ServiceSingleton.roulette;t.getRoulette=function(e,t,n){return r(this,void 0,void 0,(function(){var t,r;return o(this,(function(o){switch(o.label){case 0:return t=u.roulette,a.devLog(t),t?[3,2]:(r=e,[4,c.getRouletteData()]);case 1:return r.roulette=o.sent(),e.roulette?(u.roulette=e.roulette,[3,3]):[2];case 2:if(e.roulette=t,!e.roulette)return[2];o.label=3;case 3:return n(),[2]}}))}))}},281:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}c((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.rouletteUi=void 0;var i=n(439),a=n(338),u=n(949),c=n(809);t.rouletteUi=function(e,t,n){return r(this,void 0,void 0,(function(){var t,r,s,l,p,d,f;return o(this,(function(o){switch(o.label){case 0:return e.playRoulette||n(),t=document.querySelector("body"),r=new a.UiData(e.roulette.img,e.roulette.initContent,e.roulette.finalContent),[4,(s=new c.uiGenerator(t,e.cupon,r)).generate()];case 1:if((s=o.sent()).attatch().open(),p=i.environment.winPositions,e.cupon&&e.cupon.type&&e.cupon.code){for(d in i.environment.wheel.winTypesPositions)if(f=i.environment.wheel.winTypesPositions[d],e.cupon.type.trim()===f){l=Number(d);break}null===l&&(l=u.noWinPosition(i.environment.wheel.sides,p))}else e.cupon&&l||(l=u.noWinPosition(i.environment.wheel.sides,p));return s.winTarget=l,[2]}}))}))}},798:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.rouletteTrigger=void 0;var r,o=n(439),i=n(287),a=n(945),u=n(824),c=i.ServiceSingleton.storage,s=new Array;t.rouletteTrigger=function(e,t,n){var i=new MutationObserver((function(t){if(r=document.querySelector(".Cart-Products")){s=a.checkoutReader(r);var l=u.productMatcher(s);c.get("cupon",!1),!l||c.get("cupon",!1)&&o.environment.production||(e.playRoulette=!0),i.disconnect(),n()}}));i.observe(document.body,{childList:!0,subtree:!0})}},425:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.styles=void 0;var r=n(439);t.styles=function(e,t,n){var o="roulette-styles";document.querySelectorAll(o).length>0&&n(),r.environment.styles.forEach((function(e){var t=document.createElement("link");t.rel="stylesheet",t.href=e,t.classList.add(o),document.body.prepend(t)})),n()}},292:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ReqModel=void 0;t.ReqModel=function(e,t,n,r,o,i){void 0===e&&(e=null),void 0===t&&(t=null),void 0===n&&(n=null),void 0===r&&(r=null),void 0===o&&(o=null),void 0===i&&(i=null),this.view=e,this.roulette=t,this.playRoulette=n,this.route=r,this.cupon=o,this.cuponInput=i}},338:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.UiData=void 0;t.UiData=function(e,t,n){void 0===e&&(e=""),void 0===t&&(t=""),void 0===n&&(n=""),this.img=e,this.initContent=t,this.endContent=n}},639:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}c((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.AppChain=void 0;var i=n(292),a=function(){function e(){this.middelwares=[]}return e.prototype.use=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];1==e.length?this.middelwares.push({func:e[0]}):2==e.length&&this.middelwares.push({func:e[1],route:e[0]})},e.prototype.run=function(e,t,n){return void 0===e&&(e=new i.ReqModel),void 0===t&&(t={}),r(this,void 0,void 0,(function(){var n,i,a,u=this;return o(this,(function(c){switch(c.label){case 0:n=function(n){var a;return o(this,(function(c){switch(c.label){case 0:return a=i.middelwares[n],e.route=a.route,!window.location.pathname.match(new RegExp(e.route))&&"*"!=e.route&&""!=e.route&&e.route?[3,2]:[4,new Promise((function(n,i){return r(u,void 0,void 0,(function(){return o(this,(function(r){switch(r.label){case 0:return[4,a.func(e,t,n)];case 1:return r.sent(),[2]}}))}))}))];case 1:c.sent(),c.label=2;case 2:return[2]}}))},i=this,a=0,c.label=1;case 1:return a<this.middelwares.length?[5,n(a)]:[3,4];case 2:c.sent(),c.label=3;case 3:return a++,[3,1];case 4:return[2]}}))}))},e}();t.AppChain=a},287:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ServiceSingleton=void 0;var r,o,i,a=n(244),u=n(864),c=n(365),s=function(){function e(){}return Object.defineProperty(e,"roulette",{get:function(){return r||(r=new u.RouletteService),r},enumerable:!1,configurable:!0}),Object.defineProperty(e,"cupon",{get:function(){return o||(o=new a.CuponService),o},enumerable:!1,configurable:!0}),Object.defineProperty(e,"storage",{get:function(){return i||(i=new c.StorageService),i},enumerable:!1,configurable:!0}),e}();t.ServiceSingleton=s},244:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}c((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.CuponService=void 0;var i=n(439),a=function(){function e(){this.serviceUrl=i.environment.apiUrl+"cupons/"}return e.prototype.getCupon=function(e){return r(this,void 0,void 0,(function(){var t,n;return o(this,(function(r){switch(r.label){case 0:return r.trys.push([0,3,,4]),[4,fetch(this.serviceUrl+"deliver/"+e)];case 1:return[4,r.sent().json()];case 2:return t=r.sent(),n=t.data,console.log(t),[2,n];case 3:return r.sent(),console.error("request roulette cupon fails"),[2,null];case 4:return[2]}}))}))},e.prototype.use=function(e){return r(this,void 0,void 0,(function(){return o(this,(function(t){switch(t.label){case 0:return t.trys.push([0,3,,4]),[4,fetch(this.serviceUrl+"use/"+e.code,{method:"post"})];case 1:return[4,t.sent().json()];case 2:return[2,t.sent().success];case 3:return t.sent(),console.error("request roulette cupon fails"),[2,null];case 4:return[2]}}))}))},e}();t.CuponService=a},864:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}c((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.RouletteService=void 0;var i=n(439),a=function(){function e(){this.currentCountry=i.environment.currentCountry||"co",this.serviceUrl=i.environment.apiUrl+"roulette/"}return e.prototype.getRouletteData=function(){return r(this,void 0,void 0,(function(){return o(this,(function(e){switch(e.label){case 0:return e.trys.push([0,3,,4]),[4,fetch(this.serviceUrl+this.currentCountry+"/available")];case 1:return[4,e.sent().json()];case 2:return[2,e.sent().data];case 3:return e.sent(),console.error("request roulette data fails"),[3,4];case 4:return[2]}}))}))},e}();t.RouletteService=a},365:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.StorageService=void 0;var n=function(){function e(){this.baseKey="roulette-data-"}return Object.defineProperty(e.prototype,"roulette",{get:function(){try{return JSON.parse(this.get("roulette"))}catch(e){return null}},set:function(e){this.shortSave("roulette",JSON.stringify(e))},enumerable:!1,configurable:!0}),e.prototype.remove=function(e,t){return void 0===t&&(t=!0),t?sessionStorage.removeItem(""+this.baseKey+e):localStorage.removeItem(""+this.baseKey+e)},e.prototype.shortSave=function(e,t){sessionStorage.setItem(""+this.baseKey+e,t)},e.prototype.get=function(e,t){return void 0===t&&(t=!0),t?sessionStorage.getItem(""+this.baseKey+e):localStorage.getItem(""+this.baseKey+e)},e.prototype.longSave=function(e,t){localStorage.setItem(""+this.baseKey+e,t)},e}();t.StorageService=n},945:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.checkoutReader=void 0,t.checkoutReader=function(e){var t=new Array;return e.querySelectorAll(".Cart-ProductName a").forEach((function(e){t.push(e.innerText)})),t}},447:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.devLog=void 0;var r=n(439);t.devLog=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];r.environment.production||console.log.apply(console,e)}},196:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}c((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.ImgStore=void 0;var i=n(447),a=function(){function e(){this.images=new Array}return e.prototype.get=function(e){var t=this.images.find((function(t){return t.name==e}));return i.devLog("get imgStorage",t?t.blob:null),t?t.blob:null},e.prototype.add=function(e,t){return r(this,void 0,void 0,(function(){var n;return o(this,(function(r){switch(r.label){case 0:if(i.devLog("add imgStorage","url, label",t,e),this.get(e))throw new Error("ImgStorage Error - trying to add new img: label "+e+" already exists");return[4,this.load(t)];case 1:return n=r.sent(),this.images.push({name:e,blob:n,url:t}),[2,!0]}}))}))},e.prototype.remove=function(e){var t=this.images.find((function(e){e.name}));window.URL.revokeObjectURL(t.blob),this.images.splice(this.images.indexOf(t),1)},e.prototype.removeAll=function(){this.images.forEach((function(e){window.URL.revokeObjectURL(e.blob)})),this.images=[]},e.prototype.load=function(e){return r(this,void 0,void 0,(function(){var t;return o(this,(function(n){switch(n.label){case 0:return[4,fetch(e)];case 1:return[4,n.sent().blob()];case 2:return t=n.sent(),i.devLog("fetch imgStorage","url,blob",e,t),[4,URL.createObjectURL(t)];case 3:return[2,n.sent()]}}))}))},e}();t.ImgStore=a},949:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.noWinPosition=void 0,t.noWinPosition=function(e,t){for(var n=new Array,r=function(e){t.find((function(t){return t==e.toString()}))||n.push(e)},o=0;o<e;o++)r(o);var i=Math.round(Math.random()*n.length);return n[i]}},727:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Popup=void 0;var n=function(){function e(){}return e.prototype.build=function(){var e=document.createElement("div");e.classList.add("popup-overlay");var t=document.createElement("div");t.classList.add("popup");var n=document.createElement("div");n.classList.add("popup-closer"),n.innerHTML="&#xd7;";var r=document.createElement("div");return r.classList.add("popup-card"),t.append(r),t.append(n),this.overlay=e,this.container=t,this.card=r,this.eventListenners(),this},e.prototype.atatch=function(e){e.append(this.overlay),e.append(this.container)},e.prototype.eventListenners=function(){var e=this;this.container.querySelector(".popup-closer").addEventListener("click",(function(){e.close()}))},e.prototype.open=function(){return window.scrollTo(0,0),this.container.classList.remove("popup-close"),this.container.classList.add("popup-open"),this.overlay.classList.remove("popup-close"),this.overlay.classList.add("popup-open"),document.body.classList.add("no-scroll"),this},e.prototype.close=function(){var e=this;return this.onClose&&this.onClose(),this.container.classList.remove("popup-open"),this.container.classList.add("popup-close"),this.overlay.classList.remove("popup-open"),this.overlay.classList.add("popup-close"),document.body.classList.remove("no-scroll"),setTimeout((function(){e.container.remove(),e.overlay.remove()}),300),this},e}();t.Popup=n},824:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.productMatcher=void 0;var r=n(287).ServiceSingleton.storage;t.productMatcher=function(e){for(var t,n=function(n){var o=e[n];if(t=r.roulette.products.find((function(e){return e.matcher==o})))return{value:t}},o=0;o<e.length;o++){var i=n(o);if("object"==typeof i)return i.value}}},809:function(e,t,n){var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),i=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}c((r=r.apply(e,t||[])).next())}))},a=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.uiGenerator=void 0;var u=n(439),c=n(447),s=n(949),l=function(e){function t(t,n,r){var o=e.call(this)||this;return o.parent=t,o.cupon=n,o.uidata=r,o.gameOver=!1,o.playing=!1,u.environment.imgStore.removeAll(),o.onClose=function(){c.devLog("uiTools","remove all images"),u.environment.imgStore.removeAll()},o}return o(t,e),Object.defineProperty(t.prototype,"html",{get:function(){return this.container},enumerable:!1,configurable:!0}),t.prototype.attatch=function(){var t=this;return this.goToTop(),e.prototype.atatch.call(this,this.parent),this.card.addEventListener("click",(function(){"init"==t.currentView&&t.runRoulette()})),this},t.prototype.runRoulette=function(){return i(this,void 0,void 0,(function(){var e=this;return a(this,(function(t){switch(t.label){case 0:return this.playing?[2]:(this.goToTop(),null===this.winTarget?[3,2]:(this.playing=!0,[4,this.play(this.winTarget)]));case 1:t.sent(),setTimeout((function(){e.playing=!1,e.gameOver=!0,e.endGameContent()}),500),t.label=2;case 2:return[2]}}))}))},t.prototype.generate=function(){return i(this,void 0,void 0,(function(){var t,n,r,o,i;return a(this,(function(a){switch(a.label){case 0:return this.goToTop(),[4,this.loadImages()];case 1:return a.sent(),e.prototype.build.call(this),(t=document.createElement("div")).classList.add("roulette-card"),(n=document.createElement("div")).classList.add("col"),(r=document.createElement("div")).classList.add("col"),r.classList.add("data"),this.initContent(r),(o=document.createElement("img")).src=u.environment.imgStore.get("rouletteWheel"),o.classList.add("roulette-wheel"),(i=document.createElement("img")).src=u.environment.imgStore.get("roulettePin"),i.classList.add("roulette-wheel-pin"),n.append(o),n.append(i),t.append(n),t.append(r),this.card.append(t),this.roulette=o,this.content=r,[2,this]}}))}))},t.prototype.goToTop=function(){window.scrollTo({top:0,behavior:"smooth"})},t.prototype.loadImages=function(){return i(this,void 0,void 0,(function(){return a(this,(function(e){switch(e.label){case 0:return[4,u.environment.imgStore.add("initTitle",this.uidata.img)];case 1:return e.sent(),[4,u.environment.imgStore.add("endTitle",u.environment.staticsUrl+"title-end.png")];case 2:return e.sent(),[4,u.environment.imgStore.add("endLoseTitle",u.environment.staticsUrl+"title-end-lose.png")];case 3:return e.sent(),[4,u.environment.imgStore.add("rouletteWheel",u.environment.staticsUrl+"ruleta.png")];case 4:return e.sent(),[4,u.environment.imgStore.add("roulettePin",u.environment.staticsUrl+"ruleta-pin.png")];case 5:return e.sent(),[2]}}))}))},t.prototype.initContent=function(e){var t=this;this.goToTop(),this.currentView="init",(e=e||this.content).innerHTML+='<img class="roulette-title-img" src="'+(u.environment.imgStore.get("initTitle")||"")+'" alt="Ruleta Avon"/>',e.innerHTML+=this.getPercentTag(),e.innerHTML+='\n            <div class="roulette-init-content">\n                '+(this.uidata.initContent||"")+"\n            </div>\n        ";var n=document.createElement("button");return n.classList.add("roulette-btn"),"100"==this.cupon.percentDelivered?(n.innerText="Continuar",n.addEventListener("click",(function(){return t.close()}))):(n.innerText="Gira la ruleta para ganar",n.addEventListener("click",this.runRoulette.bind(this))),e.append(n),this},t.prototype.endGameContent=function(){var e=this;this.goToTop(),this.currentView="end";var t,n=this.cupon,r=this.content;if(n.code){t='\n                <img src="'+u.environment.imgStore.get("endTitle")+'" class="roulette-final-title">\n                \n                <p class="roulette-end-subtitle"> Felicitaciones! Ganaste un cupón por el <span class="accent">'+n.type+'</span>  de descuento en tu compra ¡Corre a usarlo!<p>\n\n                <h2 class="roulette-cupon"> <span>'+n.code+' </span>\n                    <span class="icon">\n                    <svg  id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53.63 61.28"><defs><style>.cls-1{fill:#fff;}</style></defs><polygon class="cls-1" points="12.59 0 12.59 9.13 41.58 9.13 41.58 52.07 53.63 52.07 53.63 0 12.59 0"/><rect class="cls-1" y="12.78" width="38.22" height="48.5"/></svg>\n                    </span>\n                   \n                </h2>\n                \n                <span class="roulette-bold">*Este es tu código. Ingrésalo y aplícalo</span>\n\n                <div class="roulette-end-content ">\n                   '+(this.uidata.endContent||"")+"\n                </div>\n            ",r.innerHTML=t,r.querySelector(".icon").addEventListener("click",(function(){e.copyToClipBoard()}));var o=document.createElement("button");o.classList.add("roulette-btn"),o.innerText="Continuar",o.addEventListener("click",(function(){e.close(),e.cupon.code&&e.copyToClipBoard()})),r.append(o)}else t='\n                <div class="roulette-end-content lose"> \n                <img src="'+u.environment.imgStore.get("endLoseTitle")+'" class="roulette-final-title">\n                <h4 style="font-size:15px">¡Te deseamos una mejor suerte la próxima vez!</h4>\n                </div>\n            ',r.innerHTML=t;return this},t.prototype.copyToClipBoard=function(){var e=document.createElement("input");e.style.opacity="0",e.style.position="absolute",e.value=this.cupon.code,document.body.append(e),e.select(),e.setSelectionRange(0,99999),document.execCommand("copy"),alert("Cupón copiado en portapapeles, no olvides aplicarlo."),e.remove()},t.prototype.fixSize=function(e){var t=window.getComputedStyle(e).getPropertyValue("height"),n=window.getComputedStyle(e).getPropertyValue("width");c.devLog("fix-size: container, h, w",e,t,",",n),e.style.height=t,e.style.width=n},t.prototype.play=function(e,t){var n=this;return void 0===e&&(e=0),void 0===t&&(t=3e3),e=e,this.fixSize(this.container.querySelector(".col")),this.fixSize(this.container),new Promise((function(r,o){var i=!1,a=window.innerWidth>552?"translate(-45%, -50%)":" translate(-50%, -50%)",c=0;(e>=u.environment.wheel.sides||e<0)&&o(new Error("la zona de caida en ruleta solo puede ir desde 0 hasta un lados de la ruleta -1")),setTimeout((function(){i=!0}),t);var l=360-360/u.environment.wheel.sides*e;window.innerWidth<=552&&(l=l+90>360?l+90-360:l+90),(l=360==l?0:l)<0&&(e=s.noWinPosition(u.environment.wheel.sides,u.environment.winPositions),l=360/u.environment.wheel.sides*e);var p=setInterval((function(){i&&Math.abs(c)%360==l&&(clearInterval(p),r(!0));var e=a+"rotateZ("+c+"deg)";n.roulette.style.transform=e,n.roulette.style.webkitTransform=e,c+=360/u.environment.wheel.sides}),150)}))},t.prototype.getPercentTag=function(){var e=this.cupon;return"\n        <p>Hoy hemos entregado el "+e.percentDelivered+"% de nuestros cupones</p>\n        <div class='roulette-percent'>\n            <div class='roulette-percent-val' style=\"width:"+e.percentDelivered+'%;"></div>\n        </div>\n        '},t}(n(727).Popup);t.uiGenerator=l}},t={};!function n(r){if(t[r])return t[r].exports;var o=t[r]={exports:{}};return e[r].call(o.exports,o,o.exports,n),o.exports}(169)})();