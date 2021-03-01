import { ServiceSingleton } from "../patterns/servicesSingleton.pattern";
import { StorageService } from "../services/storage.service";

const storageService:StorageService=ServiceSingleton.storage

export function productMatcher(productList){
    for (let i = 0; i < productList.length; i++) {
        const product = productList[i];
        var match=storageService.roulette.products.find(item=>{
            return item.matcher == product
        })    
        if(match){
            return match
        }
    }
    
}