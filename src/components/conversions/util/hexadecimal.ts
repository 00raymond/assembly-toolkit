const handleHexadecimal: (option: string, input: string) => string = (option: string, input: string) => {
    let output: number | string = "error";

    console.log(input)

    console.log(!/^[0-9A-Fa-f]+$/.test(input))

    if (!/^[0-9A-Fa-f]+$/.test(input)) {

        return "error";
    }


    if (option == "Decimal") {
        output = parseInt(input, 16)
    } else if (option == "Binary") {
        output = parseInt(input, 16).toString(2)
    }

    return output.toString();
}

export default handleHexadecimal