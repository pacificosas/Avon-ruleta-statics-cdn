export function noWinPosition(wheelSides,winPositions){
    
    var positions=new Array()
    for (let i = 0; i < wheelSides; i++) {
    
        if( !winPositions.find(x=>x==i.toString()) ){
           
            positions.push(i)
        }
    }
    var random=Math.round(Math.random()*positions.length)
  
    return positions[random];
} 