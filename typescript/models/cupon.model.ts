export class Cupon{
    constructor(
        public code:string=null,
        public description:string=null,
        public type:string=null,
        public  percentDelivered:number=null,
        public from:number=null
    ){}
}