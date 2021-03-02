import { ReqModel } from "../models/req.model";
import { ServiceSingleton } from "../patterns/servicesSingleton.pattern";
import { CuponService } from "../services/cupon.service";
import { StorageService } from "../services/storage.service";
import { devLog } from "../tools/devLog.tool";

var cuponService:CuponService=ServiceSingleton.cupon
var storageService:StorageService=ServiceSingleton.storage;

export function cuponCheckout(req:ReqModel,res,next){
    
    req.cupon=JSON.parse(storageService.get("cupon",false))
    req.cuponInput=storageService.get("cuponInput") || "";

    if(req.cupon && req.cupon.code.trim() == req.cuponInput.trim()){
        devLog('cupon checkout',"use");
        cuponService.use(req.cupon)
    }else{
        devLog("cupon checkout",'nothing to do');
        
    }
}