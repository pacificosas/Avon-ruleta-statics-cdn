import { environment } from "../environment";
import { ApiResponse } from "../models/apiResponse.model";
import { Cupon } from "../models/cupon.model";

export class CuponService{

    private serviceUrl=environment.apiUrl+"cupons/"

    constructor(){}

    async getCupon(rouletteId:number):Promise<Cupon>{
        try {
            var raw=await fetch(this.serviceUrl+`deliver/${rouletteId}`)
            var res:ApiResponse=await raw.json();
            var data:Cupon=res.data
            console.log(res);
            
            return data
        } catch (error) {
            console.error("request roulette cupon fails")
            return null
        }
       
    }

    async use(cupon:Cupon){

        try {
            var raw=await fetch(this.serviceUrl+`use/${cupon.code}`)
            var res:ApiResponse=await raw.json();
            return res.success

        } catch (error) {
            console.error("request roulette cupon fails")
            return null
        }
        
    }
}
