export class Popup{

    public container:HTMLElement;
    public card:HTMLElement
    protected overlay:HTMLElement;

    build(){
        var overlay= document.createElement('div');
            overlay.classList.add("popup-overlay")

        var container=document.createElement('div');
        container.classList.add("popup")
    
        var closeBtn=document.createElement("div")
            closeBtn.classList.add("popup-closer")
            closeBtn.innerHTML="&#xd7;"

        var card=document.createElement('div');
            card.classList.add("popup-card")

        container.append(card)
        container.append(closeBtn)
        this.overlay=overlay
        this.container=container;
        this.card=card

        this.eventListenners()
        return this;
    }

    atatch(parent:HTMLElement){
        parent.append(this.overlay)
        parent.append(this.container)

    }

    eventListenners(){
        this.container.querySelector('.popup-closer').addEventListener("click",()=>{
            this.close()
        })
        this.overlay.addEventListener("click",()=>{
            this.close()
        })
    }

    open(){

        window.scrollTo(0,0)
        this.container.classList.remove("popup-close")
        this.container.classList.add("popup-open")
        
        this.overlay.classList.remove("popup-close")
        this.overlay.classList.add("popup-open")



        document.body.classList.add("no-scroll")
        return this;
    }
    close(){
        this.container.classList.remove("popup-open")
        this.container.classList.add("popup-close")

        this.overlay.classList.remove("popup-open")
        this.overlay.classList.add("popup-close")

        document.body.classList.remove("no-scroll")

        setTimeout(()=>{
            this.container.remove()
            this.overlay.remove()
        },300)
        return this;
    }
}