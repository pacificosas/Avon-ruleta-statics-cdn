import { ReqModel } from "../models/req.model";

export function cuponInput(req:ReqModel,res,next){
    var input=document.querySelector("#couponcode")
    input.addEventListener("change",(e)=>{

        var target:any=e.target
        req.cuponInput=target.value
        
    })

    next();
}