import { ReqModel } from "../models/req.model";

export class AppChain{

    private middelwares:Array<any>=[]
    // private setend;
    constructor(){};

    use(...args){
        if(args.length == 1){
            this.middelwares.push({func:args[0]})
        }else if(args.length == 2){
            this.middelwares.push({func:args[1],route:args[0]})
        }
        
    }

    async run(req:ReqModel=new ReqModel(),res:any={},end?){
        
        for (let i = 0; i < this.middelwares.length; i++) {

            const currentMiddleware = this.middelwares[i];
            req.route=currentMiddleware.route
            
            
            if(
                window.location.pathname.match(new RegExp(req.route)) || 
                req.route=="*" || 
                req.route=="" || 
                !req.route
            ){
               
                await new Promise(async (resolve,reject)=>{
                    await currentMiddleware.func(req,res,resolve)   
                })
            }
                
        }

        
    }

}