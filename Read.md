1.What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
    sol:
   1) getElementById() is used to find one specific element using its id. Since an id is unique, it gives only one element.

   2) getElementsByClassName() is used to get all elements that have the same class name. It returns multiple elements.

   3) querySelector() selects the first element that matches a CSS selector.

   4) querySelectorAll() selects all elements that match a CSS selector.

In Short:

ID => one element

Class => many elements

querySelector => first match

querySelectorAll => all matches

--------------------------------------------------------

2.How do you create and insert a new element into the DOM?
  sol:

 1) we create the element using
document.createElement().

 2) we add content to it using
innerText or innerHTML.

 3) we insert it into the page using
appendChild() or append().

   So, in short:

    Create the element => Add content => Insert it into a parent element.

    That's how we add a new element to the DOM.

---------------------------------------------

3.What is Event Bubbling? And how does it work?

    Sol:
       
        Event Bubbling is a process where an event starts from the element that was clicked and then moves upward to its parent elements in the DOM.

        It works like this:

     1...When you click on a child element (for example, a button inside a div),
     
     2...first the event runs on the button,
    
     3...then it moves to the parent div,
    
     4...then to the body,
     
     5...and keeps going up until it reaches the top of the document.

------------------------------------------------

4.What is Event Delegation in JavaScript? Why is it useful?

   sol:
    
    Event Delegation means instead of adding event listeners to many child elements,
we add one event listener to the parent element and then the parent handles events for its children.

  why it is useful:
  1...we write less code
  2...Better performance
  3...works for dynamically added elements
  4...easier to manage
  
