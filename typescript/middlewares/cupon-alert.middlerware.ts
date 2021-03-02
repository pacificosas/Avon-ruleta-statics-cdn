import { ReqModel } from "../models/req.model";
import { Popup } from "../tools/popup.tool";

export function cuponAlert(req:ReqModel,res,next){
    var btn=document.querySelector("a.vi-btn--secondary:nth-child(2)")
    var body=document.body
    var popup=new Popup;


    btn.addEventListener("click",()=>{
        console.log(req);
        var card=document.createElement("div")
        card.classList.add("cupon-alert-popup")
        card.innerHTML=`
            <h2>
                Recuerda que debes estar seguro de tu compra antes de proceder al pago
            </h2>
        `
        //anadir boton de continuar
        var btn=document.createElement("button")
        btn.classList.add("roulette-btn")
        btn.innerText="Continuar"
        btn.addEventListener('click',()=>{popup.close()})

        card.append(btn);

        popup.build()
            .open();
        popup.card.append(card)
        popup.atatch(body)
    })
    
    
    next()
}