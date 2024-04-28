import {useState} from "react";
import handleDecimal from "@/components/conversions/twosutil/decimal";
import handleTwosComplement from "@/components/conversions/twosutil/twoscomplement";

export default function ComplementConversion() {

    const [input, setInput] = useState("");
    const [output, setOutput] = useState("")

    const [errorState, setErrorState] = useState(false);
    const [inputState, setInputState] = useState("Decimal");
    const [outputState, setOutputState] = useState("Two's Complement");

    const flipConversion = () => {
        let temp = inputState
        setErrorState(false)
        setInputState(outputState)
        setOutputState(temp)
        setInput("");
        setOutput("");
    }

    const handleConvert = () => {
        if (inputState == "Decimal") {
            console.log(input)
            let op = handleDecimal(input);

            if (op == "error") {
                setErrorState(true);
                return;
            }
            setErrorState(false)
            setOutput(op)

        } else {
            console.log(input)

            let op = handleTwosComplement(input)
            if (op == "error") {
                setErrorState(true);
                return;
            }
            setErrorState(false)
            setOutput(op)

        }
    }


    return (
        <div className={"border-[1px] border-slate-500 flex flex-col justify-center items-center p-10 bg-gradient-to-b from-slate-800 to-slate-900 rounded-sm space-y-4"}>
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
                <div className={"flex-col flex "}>
                    <input
                        className={`rounded-lg text-xl p-2 ${!errorState ? 'bg-slate-600' : 'bg-red-950' } transition-all duration-200 text-white`}
                        type="text"
                        placeholder={inputState + " Value"}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <button
                    className="transition-all duration-200 p-2 bg-transparent border-[2px] border-slate-600 hover:bg-white hover:bg-opacity-10 rounded-md text-xl"
                    onClick={handleConvert}
                >
                    Convert
                </button>
                <div className={"flex-col flex "}>
                    <input
                        className="rounded-lg text-xl p-2 bg-slate-700 text-white "
                        type="text"
                        placeholder={outputState + " Value"}
                        value={output}
                        readOnly
                    />
                </div>
            </div>
            <p className={"font-mono"}>Two's complement limited to 8 bit</p>
            <p className={`text-red-500 text-lg ${errorState ? 'visible' : 'invisible'}`}>Invalid {inputState} value.</p>
        </div>
    )
}