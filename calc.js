function assert(func, input, output) {
    const result = func(input)
    const message = (result === output) ?
        `TRUE !!!!${func.name}(${input}) equals ${output}!` :
        `FALSE ${func.name}(${input}) equals ${result}, not ${output}`

    console.log(message)
}

function add(first, second) {
    return first + second
}

function subtract(first, second) {
    return first - second
}

function multiply(first, second) {
    return first * second
}

function divide(first, second) {
    return first / second
}

const SYM_MAP = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide
}
function mapSymToFunc(operatorSymbol) {
    return SYM_MAP[operatorSymbol] || (() => {})
}

const BETWEEN_PARATHENSIS_REGEX = /\(([^\)]+)\)/
function calc(input) {
    if (input === "") {
        return "0"
    }

    if (BETWEEN_PARATHENSIS_REGEX.test(input)) {
        const ansInsideParenthesis = calc(BETWEEN_PARATHENSIS_REGEX.exec(input)[1])
        return calc(input.replace(BETWEEN_PARATHENSIS_REGEX, ansInsideParenthesis))
    }
    
    const inputArray = input.split(" ")
    if (inputArray.length === 1) {
        return inputArray[0]
    }

    const [param1String, operatorSymbol, param2String, ...leftoverInput] = inputArray
    const expressionsAns = calcOneExpression(param1String, operatorSymbol, param2String)
    return calc([expressionsAns, ...leftoverInput].join(" "))

}
function calcOneExpression(param1String, operatorSymbol, param2String) {
    const [param1, param2] = [param1String, param2String].map((string) => parseInt(string) )
    const operator = mapSymToFunc(operatorSymbol)
    return operator(param1, param2).toString()
}

assert(calc, "", "0")
assert(calc, "1", "1")
assert(calc, "2", "2")
assert(calc, "1 + 1", "2")
assert(calc, "1 - 1", "0")
assert(calc, "3 * 1", "3")
assert(calc, "4 / 2", "2")
assert(calc, "3 + 3 + 2", "8")
assert(calc, "3 + 3 / 2 * 7", "21") // not worrying about order of operations
assert(calc, "3 + (5)", "8") // not worrying about order of operations
assert(calc, "7 - (3 * 2)", "1") // not worrying about order of operations
assert(calc, "(7 - 3)", "4") // not worrying about order of operations
assert(calc, "(7 - 3) * 2)", "8") // not worrying about order of operations

