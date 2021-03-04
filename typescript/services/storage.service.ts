import { RouletteModel } from "../models/roullette.model"

export class StorageService{

    public baseKey="roulette-data-"
    constructor(){}

    get roulette():RouletteModel{
        try{
            return JSON.parse(this.get("roulette"))
        }catch{
            return null
        }

    }

    set roulette(data:RouletteModel){
        this.shortSave("roulette",JSON.stringify(data)) 
    }

    remove(key:string,short:boolean=true){
        return short ? 
            sessionStorage.removeItem(`${this.baseKey}${key}`) :
            localStorage.removeItem(`${this.baseKey}${key}`)
    }

    shortSave(key:string,data:string){
        sessionStorage.setItem(`${this.baseKey}${key}`,data)
    }

    get(key:string,short:boolean=true){
        
        return short ? 
            sessionStorage.getItem(`${this.baseKey}${key}`) :
            localStorage.getItem(`${this.baseKey}${key}`)
    }

    longSave(key:string,data:string){
        localStorage.setItem(`${this.baseKey}${key}`,data)
    }
}