const handleDecimal: (option: string, input: string) => string = (option: string, input: string) => {
    let output: number | string = "error";

    if (!/^[0-9]+$/.test(input)) {
        return "error";
    }

    if (option == "Hexadecimal") {
        output = parseInt(input).toString(16).toUpperCase()
    } else if (option == "Binary") {
        output = parseInt(input).toString(2)
    }

    return output.toString();
}

export default handleDecimal