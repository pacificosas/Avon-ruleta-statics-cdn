import { environment } from "../environment";

export function styles(req,res,next){
    var classIdentifier="roulette-styles"
    if(document.querySelectorAll(classIdentifier).length > 0){
        next()
    }
    environment.styles.forEach((url)=>{
        var link=document.createElement("link")
        link.rel="stylesheet"
        link.href=url;
        link.classList.add(classIdentifier)
        document.body.prepend(link)
    })
    next();
}