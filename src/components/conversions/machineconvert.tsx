import {useState} from "react";
import r from "@/types/opcodes/opcodes";
import convertAssemblyToInstruction from "@/components/conversions/instructions/instruction";
import convertMachineToAssembly from "@/components/conversions/instructions/machine";

export default function MachineInstruct() {

    const [input, setInput] = useState("");
    const [output, setOutput] = useState("")
    const [errorState, setErrorState] = useState(false);

    const [inputState, setInputState] = useState("Assembly Instruction");
    const [outputState, setOutputState] = useState<string>("Machine Code");

    const [instruction , setInstruction] = useState<string | undefined>("")
    const [requiresInstructionAddress, setRequiresInstructionAddress] = useState<boolean>(false)
    const [requiresTargetAddress, setRequiresTargetAddress] = useState<boolean>(false)

    const [targetAddress, setTargetAddress] = useState<string>("")
    const [instructionAddress, setInstructionAddress] = useState<string>("")
    const [isAddressDecimal, setIsAddressDecimal] = useState<boolean>(true)

    const flipConversion = () => {
        let temp = inputState
        setErrorState(false)
        setInputState(outputState)
        setOutputState(temp)
        setInput("");
        setOutput("");
        setRequiresInstructionAddress(false)
        setRequiresTargetAddress(false)
        setTargetAddress("")
        setInstructionAddress("")
    }

    const handleInstruction = (input: string) => {
        const instruct: string = input.substring(0,3).trim()

        if (instruct == "beq" || instruct == "bne" || instruct == "lw" || instruct == "sw") {
            setRequiresInstructionAddress(true)
            setRequiresTargetAddress(true)
        } else if (instruct == "j" || instruct == "jal") {
            setRequiresTargetAddress(true)
        } else {
            setRequiresInstructionAddress(false)
            setRequiresTargetAddress(false)
            setTargetAddress("")
            setInstructionAddress("")
        }

    }

    const handleConvert = () => {
        let op = ""

        if (inputState === "Assembly Instruction") {
            console.log("reached")
            op = convertAssemblyToInstruction(input, targetAddress, instructionAddress, isAddressDecimal)
        } else if (inputState === "Machine Code") {
            op = convertMachineToAssembly(input, isAddressDecimal)
        }


        if (op.toLowerCase().substring(0, 7) === "invalid" || op == "" || op.toLowerCase().startsWith("undefined")) {
            setErrorState(true)
            return
        } else {
            setErrorState(false)
        }
        setOutput(op)
    }


    return (
        <div className={"transition-all duration-200 ease-in-out  border-[1px] border-slate-500 flex flex-col justify-center items-center p-10 bg-gradient-to-b from-slate-800 to-slate-900 rounded-sm space-y-4"}>
            <div className={"flex space-x-4"}>
                <h1 className={"text-2xl font-mono"}>
                    {inputState} to {outputState}
                </h1>
            </div>
            <button onClick={flipConversion} className={"p-0"}>
                <svg className="w-6 h-6 text-white hover:text-gray-300 transition-all duration-200" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3" />
                </svg>
            </button>
            <div className={"flex space-x-4"}>
                <div>
                    <div className={"flex-col flex space-y-2"}>
                        <input
                            className={`rounded-lg text-xl p-2 ${!errorState ? 'bg-slate-600' : 'bg-red-950' } transition-all duration-200 text-white`}
                            type="text"
                            placeholder={inputState}
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value)
                                handleInstruction(e.target.value)
                            }}
                        />
                        <div className={`flex space-x-3 ${inputState == "Machine Code" ? 'opacity-100' : 'opacity-0 max-h-0'} transition-all duration-200`}>
                            <button
                                className={`${isAddressDecimal ? 'text-white font-semibold' : 'font-normal text-gray-400'} transition-all duration-200`}
                                onClick={() => setIsAddressDecimal(true)}
                            >
                                <p>Binary</p>
                            </button>
                            <button
                                className={`${!isAddressDecimal ? 'text-white font-semibold' : 'font-normal text-gray-400'} transition-all duration-200`}
                                onClick={() => setIsAddressDecimal(false)}
                            >
                                <p>Hexadecimal</p>
                            </button>
                        </div>
                        <div className={`flex space-x-3 ${requiresInstructionAddress || requiresTargetAddress ? 'opacity-100' : 'opacity-0 max-h-0'} transition-all duration-200`}>
                            <button
                                className={`${isAddressDecimal ? 'text-white font-semibold' : 'font-normal text-gray-400'} transition-all duration-200`}
                                onClick={() => setIsAddressDecimal(true)}
                            >
                                <p>Decimal</p>
                            </button>
                            <button
                                className={`${!isAddressDecimal ? 'text-white font-semibold' : 'font-normal text-gray-400'} transition-all duration-200`}
                                onClick={() => setIsAddressDecimal(false)}
                            >
                                <p>Hexadecimal</p>
                            </button>
                        </div>
                        <input
                            className={`rounded-lg text-xl pl-2  bg-slate-600 text-white transition-all duration-200
                                ${requiresTargetAddress ? 'opacity-100' : 'opacity-0 max-h-0'}
                            `}
                            placeholder={"Target Address"}
                            value={targetAddress}
                            onChange={(e) => {
                                console.log(instruction)
                                setTargetAddress(e.target.value)
                            }}
                        />
                        <input
                            className={`rounded-lg text-xl pl-2  bg-slate-600 text-white transition-all duration-200
                                ${requiresInstructionAddress ? 'opacity-100' : 'opacity-0 max-h-0'}
                            `}
                            placeholder={"Instruction Address"}
                            value={instructionAddress}
                            onChange={(e) => {
                              console.log(instruction)
                                setInstructionAddress(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <div>
                <button
                    className="transition-all duration-200 p-2 bg-transparent border-[2px] border-slate-600 hover:bg-white hover:bg-opacity-10 rounded-md text-xl"
                    onClick={handleConvert}
                >
                    Convert
                </button>
                </div>
                <div className={"flex-col flex "}>
                    <input
                        className="rounded-lg text-xl p-2 bg-slate-700 text-white "
                        type="text"
                        placeholder={outputState}
                        value={output}
                        readOnly
                    />
                </div>
            </div>
            <p className={`text-red-500 text-lg ${errorState ? 'visible' : 'invisible'}`}>Invalid {inputState} value.</p>
        </div>
    )
}