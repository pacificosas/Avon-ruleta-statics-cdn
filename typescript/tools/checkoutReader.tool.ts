export function checkoutReader(productsContainer:HTMLElement){
    var productList:Array<string>=new Array();

    productsContainer.querySelectorAll(".Cart-ProductName a").forEach((item:HTMLElement)=>{
        productList.push(item.innerText)    
    })

    return productList
}

