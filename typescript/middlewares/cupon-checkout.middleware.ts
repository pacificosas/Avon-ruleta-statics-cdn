
import { ReqModel } from "../models/req.model";
import { ServiceSingleton } from "../patterns/servicesSingleton.pattern";
import { CuponService } from "../services/cupon.service";
import { StorageService } from "../services/storage.service";
import { devLog } from "../tools/devLog.tool";

var cuponService:CuponService=ServiceSingleton.cupon
var storageService:StorageService=ServiceSingleton.storage;

export function cuponCheckout(){
    // console.log("checkout");
    
    var cupon=JSON.parse(storageService.get("cupon",false))
    var cuponInput=storageService.get("cuponInput") || "";
    console.log(cupon);
    
    // console.log(cupon,cupon.code.trim(),cuponInput.trim(),cupon.code.trim() == cuponInput.trim());
    
    if(cupon && cupon.code && cupon.code.trim() == cuponInput.trim()){
        devLog('cupon checkout',"use");
        cuponService.use(cupon)
    }else{
        devLog("cupon checkout",'nothing to do');
        
    }
}