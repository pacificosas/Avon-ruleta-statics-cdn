import { environment } from "../environment";

export function devLog(...args){
    if(!environment.production){
        console.log(...args)
    }
}