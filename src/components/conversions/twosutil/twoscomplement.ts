const handleTwosComplement: (input: string) => string = (input: string) => {
    let output: number | string = "error";

    let isNegative: boolean = false
    // check if input is valid binary

    if (!/^[01]+$/.test(input)) {
        return "error";
    }

    if (input.charAt(0) == '1') {
        // negative number
        input = input.substring(1)
        isNegative = true
    }

    // convert input to decimal from twos complement signed binary
    let num: number = parseInt(input, 2);

    output = num.toString();

    if (isNegative) {
        output = "-" + output;
    }

    return output
}

export default handleTwosComplement