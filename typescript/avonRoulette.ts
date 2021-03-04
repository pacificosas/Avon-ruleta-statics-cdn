import { AppChain } from "./patterns/appChain.pattern";
import { getRoulette } from "./middlewares/roulete-getter.middelware";
import { rouletteTrigger } from "./middlewares/roulette-trigger.middleware";
import { ReqModel } from "./models/req.model";
import { cuponGetter } from "./middlewares/cupon-getter.middleware";
import { rouletteUi } from "./middlewares/roulette-iu.middleware";
import { cuponAlert } from "./middlewares/cupon-alert.middlerware";
import { cuponCheckout } from "./middlewares/cupon-checkout.middleware";
import { styles } from "./middlewares/styles.middleware";
import { devLog } from "./tools/devLog.tool";

export function avonRoulette(){

    var app= new AppChain();
    
    devLog("avon roulette injected");
        
    app.use("^/cart/?$",styles)

    app.use("^/cart/?$",getRoulette)

    app.use("^/cart/?$",rouletteTrigger)

    app.use("^/cart/?$",cuponAlert)
    
    app.use("^/cart/?$",cuponGetter)


    app.use("^/cart/?$",rouletteUi)

    app.use("^/checkoutdirectdelivery/.*",cuponCheckout)



    var appconfig:ReqModel=new ReqModel()
    appconfig.view=window.location.pathname
    app.run(appconfig)
}
