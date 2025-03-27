import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus to next input
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate OTP
    const newErrors = {};
    if (otp.some(digit => !digit)) {
      newErrors.otp = '*Please enter the complete OTP';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Here you would typically verify the OTP with your backend
      // For now, we'll simulate the API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // On successful verification, navigate to password reset page
      navigate('/reset-password');
    } catch (error) {
      setErrors({
        auth: '*Invalid OTP. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = () => {
    console.log('Resending OTP...');
    // Implement OTP resend logic here
  };

  return (
    <div className="min-h-screen mt-16 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full rounded-[30px] bg-[#F2FAFA] p-8 relative">
        <button 
          className="absolute top-6 right-6 text-black hover:text-gray-700"
          onClick={() => navigate('/')}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <h2 className="text-[32px] font-bold text-center mb-6 font-poppins">Verify OTP</h2>
        <p className="text-center text-gray-600 mb-8 font-poppins">
          We've sent a 6-digit code to your email. Please enter it below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2196F3] font-poppins text-[18px]"
                maxLength="1"
                inputMode="numeric"
              />
            ))}
          </div>
          {errors.otp && (
            <p className="text-red-500 text-center text-sm font-poppins">{errors.otp}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2196F3] text-white py-3 rounded-xl hover:bg-[#1976D2] focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:ring-offset-2 disabled:opacity-50 transition-colors font-poppins text-[18px]"
          >
            {isSubmitting ? 'Verifying...' : 'Verify OTP'}
          </button>

          <div className="text-center font-poppins">
            Didn't receive code?{' '}
            <button 
              type="button"
              onClick={handleResendOtp}
              className="text-[#2196F3] hover:text-[#1976D2] focus:outline-none"
            >
              Resend OTP
            </button>
          </div>

          {errors.auth && (
            <p className="text-red-500 text-center text-sm font-poppins">{errors.auth}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;