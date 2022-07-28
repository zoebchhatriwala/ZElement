# ZAction
## About The Project
A lightweight library to manage JavaScript events and handlers.

### Usage

1. Structure definition
```JS
// Define structure
var newButton = {
    "type": "button",
    "data-index": "1",
    "class": "button-small",
    "events": [{
        type: "click",
        handler: () => {
            console.log(event);
        }
    }],
    "children": [{
        type: "span",
        innerHTML: "Click me!"
    }],
};

// Dummy defined object
var newButtonDemoObj = zElement.demo();
```
2. Creating the element
```JS
// Create an element node from the object
const element = zElement(newButton).create();

// Append the element
document.body.appendChild(element);
```
3. Mutating the element
```JS
// Element created by the library has a function attached
// Called zMutate
var newButtonModified = {
    "type": "button",
    "data-index": "1",
    "class": "button-small",
    "events": [{
        type: "click",
        handler: () => {
            console.log(event);
        }
    }],
    "children": [{
        type: "span",
        innerHTML: "Click me again!"
    }],
};

// Modify the element
element.zMutate(newButtonModified);
```
