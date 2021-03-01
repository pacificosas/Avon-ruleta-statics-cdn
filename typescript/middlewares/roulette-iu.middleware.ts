import { environment } from "../environment";
import { ReqModel } from "../models/req.model";
import { UiData } from "../models/uiData.model";
import { devLog } from "../tools/devLog.tool";
import { noWinPosition } from "../tools/noWinPosition.tool";
import { uiGenerator } from "../tools/uiGenerator.tool";
import { cuponGetter } from "./cupon-getter.middleware";

export async function rouletteUi(req:ReqModel,res,next){
    if(!req.playRoulette){
        next();
    }
    
    var root=document.querySelector("body")
    
    var uidata:UiData=new UiData(
        req.roulette.img,
        req.roulette.initContent,
        req.roulette.finalContent
    );

    var ui=new uiGenerator(root,req.cupon,uidata);
    
    var ui=await ui.generate()
    ui.
        attatch()
        .open()

    var winTarget:number;
    var winPositions=environment.winPositions

    if(req.cupon && req.cupon.type && req.cupon.code){
        for (const key in environment.wheel.winTypesPositions) {
            var val=environment.wheel.winTypesPositions[key]
            
            if(req.cupon.type.trim()===val){
                winTarget=Number(key)
                
                break;
            }
        }

        if(winTarget===null){

            winTarget=noWinPosition(environment.wheel.sides,winPositions)
        }
    }else if(!req.cupon || !winTarget){
        winTarget=noWinPosition(environment.wheel.sides,winPositions)

    }
    
    
    ui.winTarget=winTarget
    // ui.runRoulette();
    

}


