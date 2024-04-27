import { useState } from "react";

export default function HexToDec() {
    const [hex, setHex] = useState("");
    const [dec, setDec] = useState("");

    const [isFlipped, setIsFlipped] = useState(false);
    const [errorState, setErrorState] = useState<boolean>(false);
    const [error, setError] = useState("");

    const flipConversion = () => {
        setIsFlipped(!isFlipped);
        setHex("");
        setDec("");
        setError("")
    };

    const handleConvert = () => {
        if (!isFlipped) {
            if (!validateHex(hex)) {
                setError("Invalid hexadecimal value");
                return;
            }
            setError("")
            const decimal = parseInt(hex, 16);
            setDec(decimal.toString());
        } else {
            if (!validateDec(dec)) {
                setError("Invalid decimal value");
                return;
            }
            setError("")
            const hexadecimal = parseInt(dec, 10).toString(16);
            setHex(hexadecimal);
        }
    };

    const validateHex = (hex: string) => {
        const hexRegex = /^[0-9A-Fa-f]+$/;
        return hexRegex.test(hex);
    }

    const validateDec = (dec: string) => {
        const decRegex = /^[0-9]+$/;
        return decRegex.test(dec);
    }

    return (
        <div className={"border-[1px] border-slate-500 flex flex-col justify-center items-center p-10 bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl space-y-4"}>
            <div className={"flex space-x-4"}>
                <button onClick={flipConversion} className={""}>
                    <svg className="w-6 h-6 text-white hover:text-gray-300 transition-all duration-200" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3" />
                    </svg>
                </button>
                <h1 className={"text-2xl font-mono"}>
                    {isFlipped ? "Decimal to Hexadecimal" : "Hexadecimal to Decimal"}
                </h1>
            </div>
            <div className={"flex space-x-4"}>
                <input
                    className={`rounded-lg text-xl p-2 ${error == "" ? 'bg-slate-600' : 'bg-red-950' } transition-all duration-200 text-white`}
                    type="text"
                    placeholder={isFlipped ? "Decimal Value" : "Hexadecimal Value"}
                    value={isFlipped ? dec : hex}
                    onChange={(e) => isFlipped ? setDec(e.target.value) : setHex(e.target.value)}
                />
                <button
                    className="transition-all duration-200 p-2 bg-slate-600 hover:bg-green-700 rounded-md text-xl"
                    onClick={handleConvert}
                >
                    Convert
                </button>
                <input
                    className="rounded-lg text-xl p-2 bg-slate-700 text-white"
                    type="text"
                    placeholder={isFlipped ? "Hexadecimal Value" : "Decimal Value"}
                    value={isFlipped ? hex : dec}
                    readOnly
                />
            </div>
            <p className={"text-red-500 text-lg"}>{error}</p>
        </div>
    );
}
