import { Cupon } from "./cupon.model";
import { RouletteModel } from "./roullette.model";

export class ReqModel{
    constructor(
        public view:string=null,
        public roulette:RouletteModel=null,
        public playRoulette:boolean=null,
        public route:string=null,
        public cupon:Cupon=null,
        public cuponInput:string=null
    ){}
    

}