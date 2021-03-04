import { ReqModel } from "../models/req.model";
import { ServiceSingleton } from "../patterns/servicesSingleton.pattern";
import { StorageService } from "../services/storage.service";
import { Popup } from "../tools/popup.tool";

var storageService:StorageService=ServiceSingleton.storage;

export function cuponAlert(req:ReqModel,res,next){
    var btn=document.querySelector("a.vi-btn--secondary:nth-child(2)")
    var body=document.body
    var popup=new Popup;


    btn.addEventListener("click",(e:any)=>{
        if(e.target.innerHTML!="Aplicar cupón"){
            return
        }
        var card=document.createElement("div")
        card.classList.add("cupon-alert-popup")
        card.innerHTML=`
            <h2>
            ¿Estas segura que no quieres agregar más productos a tu carrito de compras? 
            </h2>
            <p>
            Disfruta del porcentaje de descuento que ganaste. Una vez hagas clic en proceder al pago, deberás completar el proceso de pago para que el descuento pueda ser efectivo, recuerda que en ese momento ya no podrás adicionar más productos a tu carrito
            </p>
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
        
        var input:HTMLInputElement=document.querySelector("#couponcode")
        storageService.shortSave("cuponInput",input.value)
    })
    
    
    next()
}