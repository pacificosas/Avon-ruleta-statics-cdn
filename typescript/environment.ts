import { ImgStore } from "./tools/imgStore";

export const environment={
    production:true,
    
    apiUrl: "https://localhost:5001/api/",

    staticsUrl:"http://127.0.0.1:5500/statics/",

    styles:[
        "http://127.0.0.1:5500/styles/dist/index.css"
    ],

    get currentCountry(){
        switch (window.location.hostname) {
            case "www.avon.co":
                return "co"
                break;
            case "www.avon.com.ec":
                return "ec"
            case "www.avon.com.pe":
                return "pe"    
            default:
                break;
        }
    },

    get winPositions(){
        return Object.keys(this.wheel.winTypesPositions)
    },

    imgStore:new ImgStore(),

    wheel:{
        sides:12,
        winTypesPositions:{
            0:"100%",
            2:"30%",
            4:"20%",
            6:"50%",
            8:"30%",
            10:"20%"

        }
    }
}
