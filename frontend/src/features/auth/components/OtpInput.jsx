import { useState, useRef, useEffect } from 'react';

export const OtpInput = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    if (newOtp.every(val => val !== '') && onComplete) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          ref={(ref) => (inputRefs.current[index] = ref)}
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-14 border border-gray-300 rounded-md text-center text-xl font-semibold text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-all shadow-sm"
        />
      ))}
    </div>
  );
};
