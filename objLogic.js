var parse = async function(object,range){

  if(typeof object === 'string' || typeof object === 'number'){
    return range.value(tm,range)
  }else if(object === null || object === undefined){
    return null
  }else if (Object.keys(object).length === 0 && object.constructor === Object){
    return {}
    console.log('parseeeee')
  }


  if(!range) range = new helperFunction()

  for (let a in object) {

    if(a.indexOf('$') === -1)return range.value(object,range)

    var functionName = a.replace("$", "")

    var childs = object[a]
    var parameter = null
    var objParameter = {}
    var arrayParameter = []

    async function getValue(tm){
      var finalValue = null
      var temporary_parameter = await parse(tm,range)

      if(temporary_parameter.then){
        temporary_parameter.then(resultOfP=> finalValue = resultOfP)
      }else{
        finalValue = temporary_parameter
      }
      // console.log(finalValue,'obj')
      return finalValue
    }


    /*
    if(typeof childs === "number" || typeof childs === "string") {
      return value(childs);
    }else 
    */

    if(childs.length){
      
      for (let b of childs){

        arrayParameter.push( await getValue(b) )
     
    
      }
      
      parameter = arrayParameter
    }else if (typeof childs === 'object'){
      // console.log(childs[b])
      for (let b in childs){
        objParameter[b] = await getValue(childs[b])
      }
      parameter = objParameter
    }

    
    var virtualFunction = range[functionName];

    if (!virtualFunction) return console.log('function does not exist ',functionName)
    // console.log( window[functionName],'hey',functionName , range[functionName] )
    var output = await virtualFunction(parameter);

    if (output.then) {
      output.then(result => {
        return result;
      });
    } else {
      return output;
    }
  }
};



class helperFunction{
  getFollowerCount(para) {
    return new Promise(resolve => setTimeout(() => resolve(para.id), 500));
  }

  

   isBig(on) {
    return on[0] > on[1] ? true : false;
  }
  
   isSmall(on) {
    return on[0] < on[1] ? true : false;
  }
  
   isEqual(on) {
    return on[0] === on[1] ? true : false;
  }
  
   add(on) {
    return on[0] + on[1];
  }
  
   minus(on) {
    return on[0] - on[1];
  }
  
  divide(on) {
    return on[0] / on[1];
  }
  
  remainder(on) {
    return on[0] % on[1];
  }
  
  value(value,range) {
    
    if (typeof value === "number") return value;
    if (typeof value === "object"){

      // console.log('object detected')

      function DollarValuesOfObjects(drop){

        var newTransformedObject = {}
        
        //to do object inside object
        for(let index in drop){
          var valueOfChildObjects = drop[index]
          if( typeof valueOfChildObjects === 'object'){
            newTransformedObject[index] = DollarValuesOfObjects(valueOfChildObjects) 
          }else if( valueOfChildObjects.indexOf('$') === -1){
            newTransformedObject[index] = drop[index]
          }else{
            // console.log('$$$$',range.user,drop[index],breakDots(drop[index]))
            newTransformedObject[index] = breakDots(drop[index])
          }
        }
      
        return newTransformedObject
      }

      return DollarValuesOfObjects(value) 
      
    }else{
      return value.indexOf("$") === -1 ? value : breakDots(value)
    }

    // if it is a string


    
    //breakDots has a copy in index . js for the default value processing
    function breakDots(val){
      
      var replacedDollar = val.replace("$", "")

      var varTree = replacedDollar.split('.')
      var TMP = null
      for(let index of varTree){
        // console.log('rangeeeeeeeeeeeeeeeeeeeeeee ',range.field)

        if(TMP=== null){


          if (range[index] == undefined){
            console.log('error value does not exist in range')
            TMP = null
            break
          }

          TMP = range[index]
        }else{

          if (TMP[index] == undefined){
            console.log('error value does not exist in range')
            TMP = null
            break
          }

          TMP = TMP[index]
        }

      }
      return TMP
    }

  }
}

module.exports = {
  parse: parse,
  helperFunctions: helperFunction
}