import { environment } from "../environment";
import { Cupon } from "../models/cupon.model";
import { UiData } from "../models/uiData.model";
import { devLog } from "./devLog.tool";
import { noWinPosition } from "./noWinPosition.tool";
import { Popup } from "./popup.tool";

export class uiGenerator extends Popup{
    private roulette:HTMLElement;
    private content:HTMLElement


   public winTarget;
   private gameOver=false;
    
    constructor(public parent:HTMLElement, public cupon, public uidata:UiData){
        super();
        
        this.onClose=()=>{
            var input:HTMLInputElement=document.querySelector("#couponcode")
            if(input && cupon && cupon.code && this.gameOver){
                input.value=cupon.code
            }
        }
    }

    get html(){ 
        return this.container
    }

    attatch(){
        super.atatch(this.parent);
        return this;
    }
    
    async runRoulette(){
        if(this.winTarget!== null){
            await this.play(this.winTarget)
            setTimeout(()=>{
                this.gameOver=true
                this.endGameContent()
            },500)
        
        }
    }
   
    async generate(){
        await this.loadImages()
        super.build();
        
        var card=document.createElement('div');
            card.classList.add("roulette-card")

        var col_1=document.createElement('div')
            col_1.classList.add('col')
        
        var col_2=document.createElement('div')
            col_2.classList.add('col')
            col_2.classList.add('data')

        this.initContent(col_2)


        var roulette=document.createElement("img")
            roulette.src=environment.imgStore.get("rouletteWheel")
            roulette.classList.add('roulette-wheel')

        var roulettePin=document.createElement("img")
            roulettePin.src=environment.imgStore.get("roulettePin")
            roulettePin.classList.add('roulette-wheel-pin')

        
        
        col_1.append(roulette)
        col_1.append(roulettePin)

        
        card.append(col_1)
        card.append(col_2)

        this.card.append(card)
        
        this.roulette=roulette;
        this.content=col_2;
        return this;
    }
    private async loadImages(){
        await environment.imgStore.add("initTitle",this.uidata.img)
        await environment.imgStore.add("endTitle",`${environment.staticsUrl}title-end.png`)
        await environment.imgStore.add("rouletteWheel",`${environment.staticsUrl}ruleta.png`)
        await environment.imgStore.add("roulettePin",`${environment.staticsUrl}ruleta-pin.png`)

    }
    private initContent(container?:HTMLElement){
        container=container || this.content
       
        container.innerHTML+=`<img class="roulette-title-img" src="${ environment.imgStore.get("initTitle")|| ""}" alt="Ruleta Avon"/>`
        container.innerHTML+=this.getPercentTag();
        container.innerHTML+=`
            <div class="roulette-init-content">
                ${this.uidata.initContent || "" }
            </div>
        `
       
        var btn=document.createElement("button")
        btn.innerText="Gira la ruleta para ganar"
        btn.classList.add("roulette-btn")
        btn.addEventListener("click",this.runRoulette.bind(this))

        container.append(btn)

        return this
    }

    private endGameContent(){
        var cupon:Cupon=this.cupon
        var container=this.content
        
        var content;
        if(cupon.code){
            content=`
                <img src="${environment.imgStore.get("endTitle")}" class="roulette-final-title">
                
                <p class="roulette-end-subtitle"> Felicitaciones! Ganaste un cupón por el <span class="accent">${cupon.type}</span>  de descuento en tu compra ¡Corre a usarlo!<p>

                <h2 class="roulette-cupon">${cupon.code}</h3>
                <span class="roulette-bold">*Este es tu código. Ingrésalo y aplícalo</span>

                <div class="roulette-end-content ">
                   ${this.uidata.endContent|| ""}
                </div>
            `
        }else{
            content=`
                <h4 style="font-size:15px"> Casi lo logras ¡Te deseamos una mejor suerte la próxima vez!</h4>
            `
        }

        var btn=document.createElement("button")
        btn.classList.add("roulette-btn")
        btn.innerText="Continuar"
        btn.addEventListener('click',()=>{this.close()})

        container.innerHTML= content
        container.append(btn)
        
        return this
    }

    private fixSize(container:HTMLElement){
        var height=window.getComputedStyle(container).getPropertyValue("height")
        var width=window.getComputedStyle(container).getPropertyValue("width")
        devLog("fix-size: container, h, w",container,height,",",width);
        
        container.style.height=height
        container.style.width=width
    }

    private play(targetZone:number=0,duration:number=3000){
        var targetZone=targetZone

        this.fixSize( this.container.querySelector(".col"))
        this.fixSize(this.container)

        return new Promise((resolve,reject)=>{
            var stop=false;
            var transform=window.innerWidth > 552 ? "translate(-45%, -50%)" : " translate(-50%, -50%)"
           
            var degrees=0;
           
            if(targetZone >= environment.wheel.sides || targetZone < 0 ){
                reject(new Error("la zona de caida en ruleta solo puede ir desde 0 hasta un lados de la ruleta -1"));
            }
            
            setTimeout(()=>{
                stop=true;
            },duration)
            
            var stopAt=360-((360/environment.wheel.sides)*targetZone)
            
            console.log(stopAt);
            
            if(window.innerWidth <= 552 ){
                stopAt=stopAt+90 > 360 ?  stopAt-90 :stopAt+90
            }
            console.log(environment.wheel.sides,targetZone,stopAt);
            
            if(stopAt < 0){
                targetZone=noWinPosition(environment.wheel.sides,environment.winPositions)
                var stopAt=((360/environment.wheel.sides)*targetZone)
                
            }


            var timer=setInterval(()=>{
                if(stop){
                   
                    if(Math.abs(degrees)%360 ==  stopAt ){
                        clearInterval(timer)    
                        resolve(true)
                    }
                }
                var transformValue=transform + `rotateZ(${degrees}deg)`
                this.roulette.style.transform= transformValue
                this.roulette.style.webkitTransform=transformValue
                degrees+=(360/environment.wheel.sides)
            },150)
        })
    }

    private getPercentTag(){
        var cupon=this.cupon
        var percent=`
        <p>${cupon.percentDelivered}% de cupones entregados hoy</p>
        <div class='roulette-percent'>
            <div class='roulette-percent-val' style="width:${cupon.percentDelivered}%;"></div>
        </div>
        `
        return percent
    }


    
}