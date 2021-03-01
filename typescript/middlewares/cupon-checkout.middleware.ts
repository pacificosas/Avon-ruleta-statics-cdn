import { ReqModel } from "../models/req.model";
import { ServiceSingleton } from "../patterns/servicesSingleton.pattern";
import { CuponService } from "../services/cupon.service";
import { devLog } from "../tools/devLog.tool";

var cuponService:CuponService=ServiceSingleton.cupon
export function cuponCheckout(req:ReqModel,res,next){
    if(req.cupon.code.trim() == req.cuponInput.trim()){
        devLog('cupon checkout',"use");
        cuponService.use(req.cupon)
    }else{
        devLog("cupon checkout",'nothing to do');
        
    }
}