import { ReqModel } from "../models/req.model";
import { ServiceSingleton } from "../patterns/servicesSingleton.pattern";
import { StorageService } from "../services/storage.service";


var storageService:StorageService=ServiceSingleton.storage;

export function cuponInput(req:ReqModel,res,next){
    var input=document.querySelector("#couponcode")
    input.addEventListener("change",(e)=>{

        var target:any=e.target
        req.cuponInput=target.value
        storageService.shortSave("cuponInput",target.value)
        
    })

    next();
}