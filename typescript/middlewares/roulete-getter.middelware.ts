import { ReqModel } from "../models/req.model";
import { RouletteModel } from "../models/roullette.model";
import { ServiceSingleton } from "../patterns/servicesSingleton.pattern";
import { devLog } from "../tools/devLog.tool";

var storageService=ServiceSingleton.storage;
var rouletteService=ServiceSingleton.roulette;

export async function getRoulette(req:ReqModel,res,next){
   
    var existingRoulette:RouletteModel=storageService.roulette
    devLog(existingRoulette)
    if(!existingRoulette){
        req.roulette=await rouletteService.getRouletteData()
        if(!req.roulette){
            return
        }
        storageService.roulette=req.roulette
    }else{
        req.roulette=existingRoulette
        if(!req.roulette){
            return
        }
    }
    
    next()
}