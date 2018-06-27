function Component(content) {
    this.id = content.id;

    let element = document.getElementById(this.id);

    let statusView;

    if (element.tagName.toLowerCase() === "form") {
        let statusPanel = element.getElementsByClassName("status")[0];
        if (statusPanel) {
            statusView = new View({
                element: statusPanel
            })
        }
        element.addEventListener("submit", function (event) {
            event.preventDefault();
            let formData = new FormData(element);
            let object = {};

            formData.forEach(function (value, key) {
                object[key] = value;
            });

            content.data = object;
            load(content, element);
        })

    } else {
        load(content, element);
    }


    function load(component, element) {
        element.classList.add("loading");
        let fet;
        if (component.method.toLowerCase() === "get") {
            fet = fetch(component.url, {
                method: component.method,
                headers: component.headers
            })
        } else {
            fet = fetch(component.url, {
                method: component.method,
                headers: component.headers,
                body: JSON.stringify(component.data)
            })
        }

        fet.then(response => response.json())
            .then(data => {
                if (element.tagName.toLowerCase() === "form") {
                    statusView.refresh(data);
                    element.classList.add(data.status);
                }
                element.classList.remove("loading");
                component.success.apply(this, [data]);
            }).catch(error => {
            element.classList.remove("loading");
            component.error.apply(this);
        })
    }
}

function View(content) {
    this.data = content.data;
    this.methods = content.methods;


    let element = content.hasOwnProperty("id") ? document.getElementById(content.id) : content.element;

    this.html = element.innerHTML;

    if (this.data) {
        parse(element, this.data, this.methods)
    }

    this.refresh = function (data) {
        this.data = data;
        element.innerHTML = this.html;
        parse(element, data, this.methods);
    }

    function setData(element, data, methods) {
        if (element.hasAttribute("m-if")) {
            let currentElement = element;
            let elseTrue = true;
            while (currentElement.hasAttribute("m-else") || currentElement.hasAttribute("m-elseif")
            || currentElement.hasAttribute("m-if")) {

                let expression;
                if (currentElement.hasAttribute("m-if")) {
                    expression = element.getAttribute("m-if");
                } else if (currentElement.hasAttribute("m-elseif")) {
                    expression = element.getAttribute("m-elseif");
                } else if (currentElement.hasAttribute("m-else")) {
                    currentElement.style.display = elseTrue ? "" : "none";
                    break;
                } else {
                    break;
                }
                expression = expression.trim().split(" ");

                expression[0] = getValue(expression[0], data);

                expression[0] = /'[A-Za-z0-9_]+'/.exec(expression[2]) ? "'" + expression[0] + "'" : expression[0];

                let result = eval(expression.join(" "));

                if (result) {
                    currentElement.style.display = "";
                    elseTrue = false;
                } else {
                    currentElement.style.display = "none";
                }

                currentElement = currentElement.nextElementSibling;
            }
        }
        if (element.children.length > 0 || element.style.display === "none") {
            return;
        }
        let inner = element.innerHTML.trim();

        let regExp = /{{ [A-Za-z0-9._]+ }}/g;
        let result;
        let output = inner;
        while (result = regExp.exec(inner)) {
            output = output.replace(result[0], getValue(result, data));
        }

        element.innerHTML = output;

        if (element.hasAttribute("m-on:click")) {
            let func = element.getAttribute("m-on:click");
            element.removeAttribute("m-on:click");

            element.addEventListener("click", function () {
                let variables = /\([A-Za-z0-9]+\)/.exec(func);
                let methodName = func.replace(variables, "");

                variables = String(variables);
                let args = variables.replace("(", "").replace(")", "").trim().split(",");

                for (let i = 0; i < args.length; i++) {
                    if (args[i]) {
                        args[i] = getValue(args[i], data);
                    }
                }

                methods[methodName].apply(this, args);
            });
        }
    }

    function getValue(variable, data) {
        variable = String(variable).replace("{{", "").replace("}}", "");

        let res = variable.split(".");
        let current = data;
        for (let i = 0; i < res.length; i++) {
            current = current[res[i].trim()]
        }
        return current;
    }

    function parse(element, data, methods) {
        if (element.hasAttribute("m-for")) {
            let check = element.getAttribute("m-for");
            let _for = check.split(" ");
            let key = _for[2];
            let value = _for[0];

            let parent = element.parentNode;

            element.removeAttribute("m-for");
            parent.removeChild(element);

            if (Array.isArray(data[key])) {
                for (let i = 0; i < data[key].length; i++) {
                    let clone = element.cloneNode(true);

                    let obj = {}
                    obj[value] = data[key][i];

                    setData(clone, obj, methods);

                    parent.appendChild(clone);
                }
            } else {
                if (/\([A-Za-z0-9,_]+\)/.exec(value)) {
                    let a = value.replace("(", "").replace(")", "").split(",");

                    Object.keys(data[key]).forEach(function (i) {
                        let clone = element.cloneNode(true);

                        let obj = {}
                        obj[a[1]] = i;
                        obj[a[0]] = data[key][i];

                        setData(clone, obj, methods)

                        parent.appendChild(clone);
                    });
                } else {
                    if (data[key]) {
                        Object.keys(data[key]).forEach(function (i) {
                            let clone = element.cloneNode(true);

                            let obj = {}
                            obj[value] = data[key][i];

                            setData(clone, obj, methods);

                            parent.appendChild(clone);
                        });
                    }
                }
            }

        } else {
            setData(element, data, methods);

            let nodes = element.children;
            for (let i = 0; i < nodes.length; i++) {
                parse(nodes[i], data, methods)
            }
        }
    }
}