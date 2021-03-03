import { Cupon } from "../models/cupon.model";
import { ReqModel } from "../models/req.model";
import { ServiceSingleton } from "../patterns/servicesSingleton.pattern";
import { CuponService } from "../services/cupon.service";
import { StorageService } from "../services/storage.service";
import { devLog } from "../tools/devLog.tool";

var cuponService:CuponService=ServiceSingleton.cupon
var storageService:StorageService=ServiceSingleton.storage

export async function cuponGetter(req:ReqModel,res,next){
    
    if(!req.roulette || !req.playRoulette){
        console.log("asdasdasdasd");
        
        return
    }
    
    var cupon:Cupon=JSON.parse(storageService.get("cupon",false))
   
    
    if( cupon == null  || (cupon.from !== req.roulette.id && cupon.from > 0)){
        
        devLog("get new",cupon);

        cupon=await cuponService.getCupon(req.roulette.id)
        
        if(cupon){
            devLog("save cupon",cupon);

            storageService.longSave('cupon',JSON.stringify(cupon))
            req.cupon=cupon
            return next()
        }
        
        devLog('no cupon');    
        
        return next()
    }

    req.cupon=cupon
    next()
}