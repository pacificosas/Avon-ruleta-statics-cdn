import { CuponService } from "../services/cupon.service";
import { RouletteService } from "../services/roulette.service";
import { StorageService } from "../services/storage.service";

var rouletteService;
var cuponService;
var storageService;

export class ServiceSingleton{


    static get roulette(){

        if(!rouletteService){
            rouletteService=new RouletteService()
        }
        return rouletteService
    }


    static get cupon(){
        if(!cuponService){
            cuponService=new CuponService()
        }
        return cuponService
    }

    static get storage(){
        if(!storageService){
            storageService=new StorageService()
        }
        return storageService
    }
}