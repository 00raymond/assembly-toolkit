import opcodes from "@/types/opcodes/opcodes";
import {OpcodeKey} from "@/types/opcodes/OpcodeKey";

import registers from "@/types/registers/registerse";
import {RegisterKey} from "@/types/registers/RegisterKey";

const convertAssemblyToInstruction: (input: string, targetAddress: string, instructionAddress: string, isDecimalAddress: boolean) => string
    = (input: string, targetAddress: string, instructionAddress: string, isDecimalAddress: boolean) => {

    let op = "";

    if (!isDecimalAddress) {
        if (targetAddress.startsWith("0x")) targetAddress = targetAddress.substring(2);
        if (instructionAddress.startsWith("0x")) instructionAddress = instructionAddress.substring(2);

        targetAddress = parseInt(targetAddress, 16).toString();
        instructionAddress = parseInt(instructionAddress, 16).toString();
    }

    input = input.replaceAll(",", "");
    input = input.replaceAll("$","")

    let terms = input.split(" ");
    let instruction: OpcodeKey = terms[0] as OpcodeKey;
    let instructionCode: string = opcodes[instruction];

    op += instructionCode;

    if (instruction === "j" || instruction === "jal") {

        op += parseInt(targetAddress).toString(2).padStart(26, '0');

        if (!isDecimalAddress) {
            op = "0x" + parseInt(op, 2).toString(16);
        }

        return op
    }

    let targetRegister: RegisterKey = terms[1] as RegisterKey;
    let targetRegisterCode: string = registers[targetRegister];
    console.log(targetRegisterCode);

    let sourceRegister: RegisterKey = terms[2] as RegisterKey;
    let sourceRegisterCode: string = registers[sourceRegister];
    console.log(sourceRegisterCode);

    op += sourceRegisterCode;
    op += targetRegisterCode;



    if (instruction === "beq" || instruction === "bne" || instruction === "bgtz" || instruction === "blez") {

        let currentAddress = parseInt(instructionAddress, 10);
        let targetAddr = parseInt(targetAddress, 10);
        let offset = Math.floor((targetAddr - currentAddress - 4) / 4);

        let offsetBinary = (offset < 0) ? ((offset + (1 << 16)) & ((1 << 16) - 1)).toString(2) : offset.toString(2).padStart(16, '0');

        op += offsetBinary;
    } else {

        let fourthTerm = terms[3];
        let fourthTermCode: string = "";

        if (["sll", "srl", "sra", "sllv", "srlv", "srav"].includes(instruction)) {
            // instruction expects a shift amount in the fourth position lets assume it's numeric
            fourthTermCode = parseInt(fourthTerm).toString(2).padStart(5, '0');

        } else if (instructionCode === "000000") {
            // r-type instructions have 0 as instruction code
            fourthTermCode = registers[fourthTerm as RegisterKey];

        } else {

            fourthTermCode = parseInt(fourthTerm).toString(2).padStart(16, '0');
        }

        op += fourthTermCode;
    }

    if (!isDecimalAddress) {
        op = "0x" + parseInt(op, 2).toString(16);
    }

    return op;
};

export default convertAssemblyToInstruction;