const handleDecimal: (input: string) => string = (input: string) => {
    let output: number | string = "error";
    let isNegative: boolean = false;

    if (input.charAt(0) == '-') {
        isNegative = true;
    }

    let numStr: string = input.substring(isNegative ? 1 : 0)

    if (!/^[0-9]+$/.test(numStr)) {
        return "error";
    }

    // convert to two's complement

    let num: number = parseInt(input);

    let binary = (num & 0xFF).toString(2);
    if (num >= 0) {
        return binary.padStart(8, '0');
    } else {
        return binary;
    }

}

export default handleDecimal