<h1>                                          Store your code logic in the form of JSON aka objects                                  </h1>

<b>Use cases</b>

  1. A game where players can make game<br>
  2. Remote coding or on the go coding (it's a made up terminology, the idea is we can deploy an application once and then update logic by simply updating a object inside your database)
  3. sending code on a network<br>
  4.same logic for all languages
  
<b>How to</b><br>

``{function name: parameter }`` and parameter can be array or object what ever the function accepts and that function could have child and it can go on forever <br>

you call ``parse(object,range).then(console.log)`` and your logic gets executed<br>
  
  *range is optional to layer additional features<br>
   *The standard way to make range is build a class which extends helperFunction<br>
  *$sign tells the parser if an object is a function <br>
  
 
<b>Example</b><br>
``var logic = { $isBig:[ { $add:[2,21] }, 21] } 
 parse(logic).then(output => document.body.innerHTML = output)
``
<br><br>

<b>Features</b>
  *Easy Asynchronous support
  
<b>built in function</b><br>

add, minus ,divide, remainder, isBig, IsSmall, isEqual
<br><br>
#How to declare a function

just declare them
<br><br>
#Please propose new functions
