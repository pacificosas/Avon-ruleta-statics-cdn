import { environment } from "../environment";
import { ApiResponse } from "../models/apiResponse.model";

export class RouletteService{

    public currentCountry=environment.currentCountry || "co";
    private serviceUrl=environment.apiUrl+"roulette/"

    constructor(){
        
    }   
    
    async getRouletteData(){

        try {
            var raw=await fetch(this.serviceUrl+this.currentCountry+"/available")
            
            var res:ApiResponse=await raw.json();
           
            return res.data
        } catch (error) {
            console.error("request roulette data fails")
        }
    }


    
    
}