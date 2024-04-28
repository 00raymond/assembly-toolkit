import opcodes from "@/types/opcodes/opcodes";
import {OpcodeKey} from "@/types/opcodes/OpcodeKey";
import registers from "@/types/registers/registerse";
import {RegisterKey} from "@/types/registers/RegisterKey";
import functs from "@/types/functcodes/functs";
import {FunctKey} from "@/types/functcodes/functKey";

const findRegister: (key: string) => string | undefined = (key: string) => {
    for (let registerKey in registers) {
        let register: string = registers[registerKey as RegisterKey];
        if (register == key) {
            return registerKey;
        }
    }
}

const findFunction: (key: string) => string | undefined = (key: string) => {
    for (let functKey in functs) {
        let funct: string = functs[functKey as FunctKey];
        if (funct == key) {
            return functKey;
        }
    }
}

const findOpcode: (key: string) => string | undefined = (key: string) => {
    for (let opcodeKey in opcodes) {
        let opcode: string = opcodes[opcodeKey as OpcodeKey];
        if (opcode == key) {
            return opcodeKey;
        }
    }
}

const convertMachineToAssembly: (input: string, isDecimalVal: boolean) => string = (input: string, isDecimalVal: boolean) => {
    let op = "";

    console.log(input)

    if (!isDecimalVal) {
        if (input.startsWith("0x")) input = input.substring(2);
        input = parseInt(input, 16).toString(2).padStart(32, '0');
    }

    console.log(input)


    let opcode = input.substring(0, 6);

    if (opcode == "000000") {
        // r type
        let rs = findRegister(input.substring(6, 11));
        let rd = findRegister(input.substring(11, 16));
        let rt = findRegister(input.substring(16, 21));
        let shamt = parseInt(input.substring(21, 26), 2);
        let funct = findFunction(input.substring(26, 32));

        if (funct == "sll" || funct == "srl" || funct == "sra" || funct == "sllv" || funct == "srlv" || funct == "srav") {
            op = funct + " " + rd + ", " + rt + ", " + shamt;
        }

        if (funct == "jr") {
            op = "jr " + rs;
        }

        if (funct == "div" || funct == "divu" || funct == "mult" || funct == "multu") {
            op = funct + " " + rs + ", " + rt;
        }

        if (funct == "add" || funct == "addu" || funct == "sub" || funct == "subu" || funct == "and" || funct == "or" || funct == "xor" || funct == "nor" || funct == "slt" || funct == "sltu") {
            op = funct + " " + rt + ", " + rs + ", " + rd;
        }

        return op;
    }

    if (opcode == "000010" || opcode == "000011") {
        // jump
        let address = parseInt(input.substring(6, 32), 2).toString(16).padStart(8, '0');
        if (opcode == "000010") {
            op = "j " + address;
        } else {
            op = "jal " + address;
        }
        return op
    }

    console.log("finding: " + opcode + " thing")
    let operation = findOpcode(opcode);
    console.log(operation)

    for (let operationKey in opcodes) {
        let operation: string = opcodes[operationKey as OpcodeKey];
        if (operation == opcode) {
            operation = operationKey;
            break;
        }
    }

    if (operation == "lui") {
        let rt = findRegister(input.substring(6, 11));
        let immediate = parseInt(input.substring(16, 32), 2);
        op = operation + " $" + rt + ", " + immediate;
        return op
    }

    let rs = findRegister(input.substring(6, 11));
    let rt = findRegister(input.substring(11, 16));
    let immediate = parseInt(input.substring(16, 32), 2);

    if (operation == "lw" || operation == "sw") {
        op = operation + " $" + rt + ", " + immediate + "($" + rs + ")";
        return op
    }

    if (operation == "beq" || operation == "bne" || operation == "bgtz" || operation == "blez") {

        op = operation + " $" + rt + ", $" + rs + ", " + immediate;

        return op
    }

    if (operation == "lbu" || operation == "lhu") {
        op = operation + " $" + rt + ", " + immediate + "($" + rs + ")";
        return op

    }

    console.log(operation)

    op = operation + " $" + rt + ", $" + rs + ", " + immediate;


    return op
}

export default convertMachineToAssembly