import { useState } from "react";
import handleHexadecimal from "@/components/conversions/util/hexadecimal";
import handleDecimal from "@/components/conversions/util/decimal";
import handleBinary from "@/components/conversions/util/binary";

export default function Convert() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const [isFlipped, setIsFlipped] = useState(false);
    const [errorState, setErrorState] = useState<boolean>(false);

    const [inputState, setInputState] = useState<string | undefined>("Hexadecimal");
    const [outputState, setOutputState] = useState<string | undefined>("Decimal");

    const options = [
        "Hexadecimal",
        "Decimal",
        "Binary",
    ]

    const flipConversion = () => {

        let temp = inputState
        setErrorState(false)
        setInputState(outputState)
        setOutputState(temp)

        setIsFlipped(!isFlipped);
        setInput("");
        setOutput("");
    };

    const handleConvert = () => {

        if (outputState == null) {
            return;
        }

        let op;

        switch (inputState) {
            case "Hexadecimal":
                op = handleHexadecimal(outputState, input);
                break;
            case "Decimal":
                op = handleDecimal(outputState, input);
                break;
            case "Binary":
                op = handleBinary(outputState, input);
                break;
        }

        if (op == "error") {
            setErrorState(true);
            return;
        }
        setErrorState(false)
        if (op!= null) setOutput(op);

    };

    const handleOutputStateChange = (option: string) => {

        setOutput("")
        setInput("")

        setOutputState(option);
        if (option == inputState) {
            setInputState(findNotEqual(option));
        }
    }

    const handleInputStateChange = (option: string) => {

        setOutput("")
        setInput("")

        setInputState(option);
        if (outputState == option) {
            setOutputState(findNotEqual(option));
        }
    }

    const findNotEqual = (option: string) => {
        for (let i = 0; i < options.length; i++) {
            if (options[i] != option) {
                console.log("found a non equal: " + options[i])
                return options[i];
            }
        }
    }

    return (
        <div className={"border-[1px] border-slate-500 flex flex-col justify-center items-center p-10 bg-gradient-to-b from-slate-800 to-slate-900 rounded-sm space-y-4"}>
            <div className={"flex space-x-4"}>
                <h1 className={"text-2xl font-mono"}>
                    {inputState} to {outputState}
                </h1>
            </div>
            <div className={"flex space-x-4"}>
                <div className={"flex-col flex "}>
                    <div className={"flex"}>
                        {options.map((option, index) => (
                            <button
                                key={index}
                                className={`rounded-lg p-2 ${inputState == option ? 'text-white font-semibold' : 'font-normal text-gray-400'} transition-all duration-200`}
                                onClick={() => handleInputStateChange(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <input
                        className={`rounded-lg text-xl p-2 ${!errorState ? 'bg-slate-600' : 'bg-red-950' } transition-all duration-200 text-white`}
                        type="text"
                        placeholder={inputState + " Value"}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <div className={"flex flex-col justify-center items-center"}>
                    <button onClick={flipConversion} className={"p-2"}>
                        <svg className="w-6 h-6 text-white hover:text-gray-300 transition-all duration-200" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3" />
                        </svg>
                    </button>
                    <button
                        className="transition-all duration-200 p-2 bg-transparent border-[2px] border-slate-600 hover:bg-white hover:bg-opacity-10 rounded-md text-xl"
                        onClick={handleConvert}
                    >
                        Convert
                    </button>
                </div>
                <div className={"flex-col flex "}>
                    <div className={"flex"}>
                        {options.map((option, index) => (
                            <button
                                key={index}
                                className={`rounded-lg p-2 ${outputState == option ? 'text-white font-semibold' : 'font-normal text-gray-400'} transition-all duration-200`}
                                onClick={() => handleOutputStateChange(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <input
                        className="rounded-lg text-xl p-2 bg-slate-700 text-white"
                        type="text"
                        placeholder={outputState + " Value"}
                        value={output}
                        readOnly
                    />
                </div>
            </div>
            <p className={`text-red-500 text-lg ${errorState ? 'visible' : 'invisible'}`}>Invalid {inputState} value.</p>
        </div>
    );
}
