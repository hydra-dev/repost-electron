export const extractVariables = function(text, simpleMode=true) {
    console.log("Receivedd " + text);
    const regex = /\${([^}]+)}/gm; // Captures everything between ${}
    let match = regex.exec(text);
    const variables = [];
    while (match !== null) {
        const variable = match[1];
        if (variables.indexOf(variable) === -1) {
            if (simpleMode) {
                variables.push(variable);
            } else {
                variables.push({
                    label: variable,
                    substitutedValue: null,
                })
            }
        }
        match = regex.exec(text);
    }

    console.log("The text helper found "  + variables);
    return variables;
}