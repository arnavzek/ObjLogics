<h1>                                          Store your code logic in the form of JSON aka objects                                  </h1>

<b>Use cases</b>

  1. A game where players can make game<br>
  2. Remote coding or on the go coding (it's a made up terminology, the idea is we can deploy an application once and then update logic by simply updating a object inside your database)
  3. sending code on a network<br>
  4.same logic for all languages
  
<b>How to</b>

``{function name:{parameter} }`` and parameter can be functions 

you call ``parse(object)`` and your logic gets executed
  
    
<b>Example</b>
``var logic = {isEqual:{minus:{data2:20,data1:20},secondParam:0} } //secondParam,data2,data1 are arbitary 
document.body.innerHTML = parse(logic)
``
<b>built in function</b>

add, minus ,divide, remainder, isBig, IsSmall, isEqual

#How to declare a function

just declare them

#Please propose new functions
