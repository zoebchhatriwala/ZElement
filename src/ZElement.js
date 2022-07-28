(function () {
    // Define a local copy of zElement
    var zElement = function (arg) {

        // ensure to use the `new` operator
        if (!(this instanceof zElement)) {
            return new zElement(arg);
        }

        // store an argument for this example
        this.elementStructure = arg;

        // Mutation element
        this.mutate = function (element, arg) {
            // Clear out children
            if (!!arg.children) {
                element.innerHTML = "";
            }

            // Unbind events
            const events = (!!arg.events) ? this.elementStructure.events : undefined;
            if (typeof events == "object") {
                // Loop events
                Object.entries(events).forEach(([index, eventInfo]) => {
                    // Remove events
                    element.removeEventListener(eventInfo.type, eventInfo.handler);
                });
            }
            // End

            // Re assign
            this.elementStructure = arg;

            // Return updated
            return this.convertObjectToHTMLElement(this.elementStructure, element);
        }
    };

    zElement.fn = zElement.prototype;

    // Main function to convert object to HTML Element
    zElement.fn.convertObjectToHTMLElement = function (elementStructure, definedElement = null) {

        // Error
        if (typeof elementStructure != "object") {
            throw "Invalid structure";
        }

        // Init an element
        const isElementPredefined = (definedElement != null);
        const element = (isElementPredefined) ? definedElement : document.createElement(elementStructure.type);

        // Loop all the keys in the structure
        Object.entries(elementStructure).forEach(([structKey, structValue]) => {
            // Skip the type of element
            switch (structKey) {
                case "type":
                    break;
                case "events":
                    // Error
                    if (typeof structValue != "object") {
                        throw "Events should be an array of objects";
                    }

                    // Event logic
                    Object.entries(structValue).forEach(([index, eventInfo]) => {
                        // Set event
                        element.addEventListener(eventInfo.type, eventInfo.handler);
                    });
                    // End
                    break;
                case "children":
                    // Error
                    if (typeof structValue != "object") {
                        throw "Children should be an array of objects";
                    }

                    // Children logic
                    Object.entries(structValue).forEach(([index, child]) => {
                        // Append child
                        element.appendChild(this.convertObjectToHTMLElement(child));
                    });
                    // End
                    break;
                case "innerHTML":
                    // Set text
                    element.innerHTML = structValue;
                    break;
                default:
                    // If structValue is defined? --> Not(false, null, undefined)
                    if (!!structValue) {
                        // Set attribute
                        element.setAttribute(structKey, structValue);
                    } else {
                        // Remove the attribute
                        element.removeAttribute(structKey);
                    }
                    break;
            }
            // End
        });
        // End loop

        // Set definition
        element.zMutate = this.mutate.bind(this, element);

        // Return the element
        return element;
    };
    // End

    // A facade function
    zElement.fn.create = function () {
        return this.convertObjectToHTMLElement(this.elementStructure);
    };

    // Version
    zElement.fn.version = "1.0.1";

    // Dummy object
    zElement.fn.demo = function () {
        return {
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
    };

    // expose the library
    window.zElement = zElement;
})();