import { Cupon } from "./cupon.model";
import { Product } from "./product.model";

export class RouletteModel{
    constructor(
        public id:number=null,
        public name:string=null,
        public initContent:string=null,
        public finalContent:string=null,
        public img:string=null,
        public products:Array<Product>=null
    ){}
}