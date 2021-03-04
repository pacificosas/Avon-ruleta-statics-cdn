
import { ReqModel } from "../models/req.model";
import { ServiceSingleton } from "../patterns/servicesSingleton.pattern";
import { CuponService } from "../services/cupon.service";
import { StorageService } from "../services/storage.service";
import { devLog } from "../tools/devLog.tool";

var cuponService:CuponService=ServiceSingleton.cupon
var storageService:StorageService=ServiceSingleton.storage;

export function cuponCheckout(){
    
    var cupon=JSON.parse(storageService.get("cupon",false))
    var cuponInput=storageService.get("cuponInput") || "";
    
    storageService.remove("cuponInput")
    
    if(cupon && cupon.code && cupon.code.trim() == cuponInput.trim()){
        devLog('cupon checkout',"use");
        cuponService.use(cupon)
    }else{
        devLog("cupon checkout",'nothing to do');
        
    }
}