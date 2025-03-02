import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useRef } from 'react';
const OTPInput = () => {
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const inputRefs = useRef([]); // Ensure it's always an array
    const handleChange = (index, value) => {
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
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (/^\d{6}$/.test(pastedData)) {
            const newOtp = pastedData.split('');
            setOtp(newOtp);
            // Focus on the last input
            inputRefs.current[5]?.focus();
        }
    };
    return (_jsx("div", { className: "flex space-x-2", children: otp.map((digit, index) => (_jsx("input", { type: "text", maxLength: 1, value: digit, onChange: (e) => handleChange(index, e.target.value), onPaste: handlePaste, ref: (el) => {
                if (el)
                    inputRefs.current[index] = el;
            }, className: "w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" }, index))) }));
};
export default OTPInput;
