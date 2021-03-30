import { ImgStore } from "./tools/imgStore";

export const environment={
    production:true,
    
    apiUrl: "https://ruleta.avoncpe.com/api/",

    staticsUrl:"https://cdn.jsdelivr.net/gh/pacificosas/avon-ruleta-statics-cdn@1/img/",

    styles:[
        "https://cdn.jsdelivr.net/gh/pacificosas/avon-ruleta-statics-cdn@1/dist/css/index.css"
    ],

    // apiUrl: "https://localhost:5001/api/",

    // staticsUrl:"http://127.0.0.1:5500/img/",

    // styles:[
    //     "http://127.0.0.1:5500/dist/css/index.css"
    // ],

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
            10:"40%"

        }
    }
}
