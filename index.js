 function isBig(on) {
  // var para = [];

  // for (let index of on) {
  //   if (index.then){
      console.log(on,'checking big')
  //     await index;
  //     index.then(nw_value => para.push(nw_value));
  //   }else{
  //     para.push(index)
  //   }
  // }

  // on = para
  
  return on[0] > on[1] ? true : false;
}

function isSmall(on) {
  return on[0] < on[1] ? true : false;
}

function isEqual(on) {
  return on[0] === on[1] ? true : false;
}

function add(on) {
  return on[0] + on[1];
}

function minus(on) {
  return on[0] - on[1];
}

function divide(on) {
  return on[0] / on[1];
}

function remainder(on) {
  return on[0] % on[1];
}

function value(value) {
  if (typeof value === "number") return value;
  return value.indexOf("$") === -1 ? value : eval(value.replace("$", ""));
}

var parse = async function(object) {
  for (let a in object) {
    var childs = object[a];
    var parameter = null;
    var objParameter = {}
    var arrayParameter = []

    async function getValue(tm){

      if(typeof tm !== 'object') return value(tm)

      var finalValue = null
      var temporary_parameter = await parse(tm)

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

    var virtualFunction = eval(a);

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

function getFollowerCount(para) {
  return new Promise(resolve => setTimeout(() => resolve(para.id), 500));
}

//support for both array parameter and object parameter
var sender = { id: 21 };

var test = { isBig: [{getFollowerCount: { id: "$sender.id" }}, 0 ] };
// var test = { isBig: {  getFollowerCount: { userId: "$sender.id" }, receiver: 0 } };
// now callers can be either arrays or objects
//  var test = {getFollowerCount:{id:{add:[2,21]} } }
// var test = { isBig:[ {getFollowerCount:{id:22}} , 21] }

//why is id an a {getFollowerCount:{id:22}}

document.body.innerHTML = "loading..";
parse(test).then(res => (document.body.innerHTML = res));
