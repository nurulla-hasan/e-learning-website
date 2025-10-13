import { useRef, useState } from "react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation";

const VerifyOtpForm = () => {
    const [code, setCode] = useState(["", "", "", "", ""])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();


    const handleInputChange = (index: number, value: string) => {
        const digit = value.replace(/[^0-9]/g, "")

        if (digit.length > 1) return // Prevent pasting multiple chars

        const newCode = [...code]
        newCode[index] = digit
        setCode(newCode)

        // Auto-focus next input
        if (digit && index < 4) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        // Handle backspace
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handleVerify = () => {
        const verificationCode = code.join("")
        if (verificationCode.length === 5) {
            console.log("Verification code:", verificationCode)
            // Handle verification logic here
            router.push("/reset-password")
        }
    }

   

    return (
        <>
            <div className="flex justify-center gap-3 mb-8">
                {code?.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => {
                            inputRefs.current[index] = el
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-12 text-center text-lg font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                        placeholder=""
                    />
                ))}
            </div>

            <Button
                onClick={handleVerify}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 rounded-lg transition-colors mb-6"
                disabled={code.join("").length !== 5}
            >
                Verify
            </Button>
        </>
    )
}

export default VerifyOtpForm