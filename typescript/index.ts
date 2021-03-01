import { avonRoulette } from "./avonRoulette";
declare global {
    interface Window {
        avonRoulette:Function;
    }
}

avonRoulette()
window.avonRoulette=avonRoulette