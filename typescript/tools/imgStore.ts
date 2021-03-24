import { devLog } from "./devLog.tool";

interface Iimage{
    name:string;
    blob:string;
    url:string;
}

export class ImgStore{

    public images:Iimage[]=new Array()

    constructor(){
       
    }

    get(label:string){
        var item= this.images.find((i)=> i.name==label)
        devLog("get imgStorage",item ? item.blob : null);
        
        return item ? item.blob : null
    }

    async add(label:string,url:string){
        devLog("add imgStorage","url, label",url,label);
        
        if(this.get(label)){
            throw new Error(`ImgStorage Error - trying to add new img: label ${label} already exists`)
            return
        }
        var blob=await this.load(url)
       this.images.push({
            name:label,
            blob:blob,
            url:url
        })
        return true;
    }

    remove(label:string){
        var target=this.images.find((i)=>{i.name==label})
        window.URL.revokeObjectURL(target.blob);
        this.images.splice(this.images.indexOf(target),1)
    }

    removeAll(){
        this.images.forEach(target=>{
            
            
        window.URL.revokeObjectURL(target.blob);
        })   
        this.images=[]
    }


    private async load(url:string){
        var res= await fetch(url)
        var blob= await res.blob()
        devLog("fetch imgStorage", "url,blob", url , blob )
        return await URL.createObjectURL(blob)
    }
}