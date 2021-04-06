import { environment } from "../environment";
import { ReqModel } from "../models/req.model";
import { ServiceSingleton } from "../patterns/servicesSingleton.pattern";
import { StorageService } from "../services/storage.service";
import { checkoutReader } from "../tools/checkoutReader.tool";
import { productMatcher } from "../tools/productMatcher.tool";

const storageService:StorageService=ServiceSingleton.storage

var productsContainerSelector:string=".Cart-Products"
var productsContainer:HTMLElement;
var productList:Array<string>=new Array();

export function rouletteTrigger(req:ReqModel,res,next){
    let observer = new MutationObserver((m)=>{

        productsContainer=document.querySelector(productsContainerSelector)
   
    
        if(!productsContainer){
            return;
        }
    
        productList=checkoutReader(productsContainer);
        var match=productMatcher(productList);
        storageService.get("cupon",false)
        
        if(match){
            req.playRoulette=true
        }
        observer.disconnect();
        next()
        
    });

    observer.observe(document.body,{
        childList: true, subtree: true
    });

}

