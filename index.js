 function isBig(on) {
  // var para = [];

  // for (let index of on) {
  //   if (index.then){
      console.log(on)
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
  return value.indexOf("$") === -1 ? value : value.replace("$", "");
}

var parse = async function(object) {
  for (let a in object) {
    var childs = object[a];
    var parameter = [];

    console.log(a, childs);

    if(typeof childs === "number" || typeof childs === "string") {
      return value(childs);
    }else{
      for (let b in childs){
        let tm = {};
        tm[b] = childs[b];
        var temporary_parameter = await parse(tm)

        if(temporary_parameter.then){
          temporary_parameter.then(resultOfP=> parameter.push(resultOfP))
        }else{
          parameter.push(temporary_parameter)
        }

        
      
      }
    }

    var virtualFunction = eval(a);

    var output = await virtualFunction(parameter);

    if (output.then) {
      output.then(result => {
        console.log(result);
        return result;
      });
    } else {
      return output;
    }
  }
};

function getFollowerCount() {
  return new Promise(resolve => setTimeout(() => resolve(2), 2000));
}

var sender = { id: 251 };

var test = { isBig: {getFollowerCount: { userId: "$sender.id" }, receiver: 0 } };
//  var test = {getFollowerCount:{userId:'$sender.id'} }

document.body.innerHTML = "loading..";
parse(test).then(res => (document.body.innerHTML = res));
