var marline = {isbig:{data1:10,data2:20} }
// var marline = {data1:10}
function isbig(on){
 return on[0] > on[1]? true:false
}


function value(value){
  return value
}

var parse = function(object){

  for (let a in object){
    
    
    var childs = object[a]
    var parameter = []
    
    console.log(a,childs)

    if(typeof childs === 'number' || typeof childs === "string"){
      return value(childs)
    }else{
      for(let b in childs){
        let tm = {}
        tm[b] = childs[b]
        parameter.push(parse(tm))
      }
    }
    

    
    var virtualFunction = eval(a)
    return virtualFunction(parameter)
  }
}

document.body.innerHTML = parse(marline)
