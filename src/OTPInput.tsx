import React, { useState, useRef } from 'react';

const OTPInput: React.FC = () => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
    const inputRefs = useRef<HTMLInputElement[]>([]); // Ensure it's always an array

    const handleChange = (index: number, value: string) => {
        if (/\d/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to the next input
            if (index < 5 && value !== '') {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (/^\d{6}$/.test(pastedData)) {
            const newOtp = pastedData.split('');
            setOtp(newOtp);

            // Focus on the last input
            inputRefs.current[5]?.focus();
        }
    };

    return (
        <div className="flex space-x-2">
            {otp.map((digit, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onPaste={handlePaste}
                    ref={(el) => {
                        if (el) inputRefs.current[index] = el;
                    }}
                    className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
            ))}
        </div>
    );
};

export default OTPInput;
