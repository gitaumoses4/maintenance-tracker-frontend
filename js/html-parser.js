export function parseHTML(content, data) {
    let regExp = /{{ [A-Za-z0-9.]+ }}/g;
    let result;
    let output = content;
    while (result = regExp.exec(content)) {
        output = output.replace(result[0], getValue(result, data));
    }
    return output;
}

export function getValue(variable, data) {
    variable = String(variable).replace("{{", "").replace("}}", "");

    let res = variable.split(".");
    let current = data;
    for (let i = 0; i < res.length; i++) {
        current = current[res[i].trim()]
    }
    return current;
}