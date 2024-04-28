const handleBinary: (input: string, option: string) => string = (option: string, input: string) => {
    let output: number | string = "error";

    if (!/^[01]+$/.test(input)) {
        return "error";
    }

    if (option == "Decimal") {
        output = parseInt(input, 2)
    } else if (option == "Hexadecimal") {
        output = parseInt(input, 2).toString(16).toUpperCase()
    }


    return output.toString();
}
export default handleBinary