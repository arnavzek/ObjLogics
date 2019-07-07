var parse = async function(object,range) {

  if(!range) range = new helperFunction()

  for (let a in object) {

    if(a.indexOf('$') === -1)return range.value(object,range)

    var functionName = a.replace("$", "")

    var childs = object[a]
    var parameter = null
    var objParameter = {}
    var arrayParameter = []

    async function getValue(tm){

      if(tm === null) return true
      if(typeof tm !== 'object') return range.value(tm,range)

      var finalValue = null
      var temporary_parameter = await parse(tm,range)

      if(temporary_parameter.then){
        temporary_parameter.then(resultOfP=> finalValue = resultOfP)
      }else{
        finalValue = temporary_parameter
      }
      console.log(finalValue)
      return finalValue
    }

    console.log(a,childs)

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
        console.log(childs[b])
        objParameter[b] = await getValue(childs[b])
      }
      parameter = objParameter
    }

    
    var virtualFunction = range[functionName];
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

      console.log('object detected')

      var newTransformedObject = {}
      
      //to do object inside object
      for(let index in value){
        var valueOfChildObjects = value[index]
        if( valueOfChildObjects.indexOf('$') === -1){
          newTransformedObject[index] = value[index]
        }else{
          newTransformedObject[index] = breakDots(value[index])
        }
      }
      console.log(newTransformedObject,'hey')
      return newTransformedObject
      
    }else{
      
      return value.indexOf("$") === -1 ? value : breakDots(value)
    }

    // if it is a string


    

    function breakDots(val){
      console.log(range)
      var replacedDollar = val.replace("$", "")

      var varTree = replacedDollar.split('.')
      var TMP = null
      for(let index of varTree){
        TMP=== null? TMP = range[index]: TMP = TMP[index]
      }
      return TMP
    }

  }
}

class customFunction extends helperFunction{

  constructor(){
    super()
    this.user = { id: 22 }
    this.writer = { id: 21 }
  }

  write(par){
    return new Promise(resolve=>{ 
      console.log(par)
      resolve(par)
    })
  }
  
  getFollowerCount(para) {
   return new Promise(resolve => setTimeout(() => resolve(para.id), 500));
 }
}


var room = new customFunction()
console.log(room)
//support for both array parameter and object parameter

// to do what if functions are not async

// var test = { $isBig: [{$getFollowerCount: { id: "$user.id" }}, {$getFollowerCount: { id: "$writer.id" }} ] };
// var test = { isBig: {  getFollowerCount: { userId: "$sender.id" }, receiver: 0 } };
// now callers can be either arrays or objects
//  var test = {getFollowerCount:{id:{add:[2,21]} } }
// var test = { isBig:[ {getFollowerCount:{id:22}} , 21] }
// var test = {$getFollowerCount:{id:{$add:[2,21]} } }

var test = {$write:{on:'questions',put:{content:'what should I ask?',askedBy:'$user.id'}  }}
//why is id an a {getFollowerCount:{id:22}}
// define local domain
//sure if you would like to take the pleasure of being  first wonkavatorer and the first dead human on board

// console.log(Object.create(room.__proto__,user ),writer,user)
// room = Object.assign({},writer,room,writer)

document.body.innerHTML = "loading.."; 
parse(test,room).then(res => (document.body.innerHTML = res));
