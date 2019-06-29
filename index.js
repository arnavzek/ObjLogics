function isBig(on){
 return on[0] > on[1]? true:false
}

function isSmall(on){
  return on[0] < on[1]? true:false
 }

 function isEqual(on){
  return on[0] === on[1]? true:false
 }

 function add(on){
  return on[0]+on[1]
 }

 function minus(on){
  return on[0]-on[1]
 }

 function divide(on){
  return on[0]/on[1]
 }

 function remainder(on){
  return on[0]%on[1]
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

// var test = {isEqual:{minus:{data2:20,data1:20},data2:0} }
// document.body.innerHTML = parse(test)
