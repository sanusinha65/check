import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../api/supabaseClient";
import Logo from "../assets/logo.png";
import Cookies from 'js-cookie';
import MixpanelService from "../utils/mixpanel";
import Meta from "../helper/Meta"

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const length = 6; // Change this based on OTP length
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Check if user exists
      const { data: existingUser } = await supabase
        .from('users')
        .select()
        .eq('email', email)
        .single();

      if (!existingUser) {
        setMessage("Email not registered. Please create an account first.");
        return;
      }

      // Send OTP
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        },
      });

      if (otpError) throw otpError;

      setShowOtpInput(true);
      setMessage("Please enter the OTP sent to your email.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp.join(""),
        type: "email",
      });

      if (error) throw error;

      if (data?.session) {
        console.log("Setting cookies...");
      
        const cookieOptions = {
          expires: 30, // Set to 7 days instead of using session expiry
          sameSite: 'Lax',
          secure: true,
          path: '/',
          domain: '.outx.ai', // Add the root domain to allow subdomain access
        };
      
        // Set the session cookie with complete session data
        Cookies.set('outx_session', JSON.stringify({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: data.session.expires_at,
          created_at: Math.floor(Date.now() / 1000),
          user: {
            id: data.session.user.id,
            email: data.session.user.email,
          }
        }), cookieOptions);
      
        console.log("Cookies set successfully!");
        MixpanelService.trackLogin(data.session.user.id, data.session.user.email, data.session.user.user_metadata.full_name);
        navigate("/dashboard");
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d+$/.test(pastedData) && pastedData.length === otp.length) {
      setOtp(pastedData.split(""));
    }
  };
  

  return (
    <>
    <Meta 
        title="Login - Outx.ai" 
        description="Login to your Outx.ai account to manage LinkedIn scraping and keyword tracking." 
        keywords="Outx.ai login, LinkedIn scraping login, LinkedIn tracking login" 
    />
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <Link to="/">
            <div className="flex items-center">
              <img src={Logo} alt="logo" className="h-10 w-auto" />
              <span className="font-bold text-2xl text-[#6241D3]">OUTX</span>
            </div>
          </Link>
          <h2 className="text-3xl sm:text-4xl font-bold mt-6 mb-2 text-center sm:text-left">
            Welcome back.
          </h2>
          <p className="mb-4 text-gray-900 text-center sm:text-left">
            Youre new here?{" "}
            <Link
              to="/register"
              className="border-b border-black font-semibold"
            >
              Create an account.
            </Link>
          </p>
        </div>

        {message && (
          <div
            className={`p-4 rounded-md mb-4 ${
              message.includes("error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={showOtpInput ? handleVerifyOTP : handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Your email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g: john@toyota.com"
              className="w-full p-3 border-gray-400 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          {showOtpInput && (
            <div>
              <label className="block text-gray-600 font-medium">Enter otp</label>
              <div className="flex items-center space-x-4">
              {/* First Box */}
              <div className="flex space-x-2 mt-1">
                {otp.slice(0, 3).map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    value={digit}
                    onPaste={handlePaste}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    maxLength={1}
                    className="lg:w-12 lg:h-12 w-10 h-10 border border-gray-300 rounded-md text-center text-lg outline-none focus:ring-2 focus:ring-gray-500"
                  />
                ))}
              </div>
      
              {/* Separator */}
              <span className="text-lg font-bold text-gray-600">-</span>
      
              {/* Second Box */}
              <div className="flex space-x-2 mt-1">
                {otp.slice(3, 6).map((digit, index) => (
                  <input
                    key={index + 3}
                    ref={(el) => (inputRefs.current[index + 3] = el)}
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index + 3)}
                    onKeyDown={(e) => handleKeyDown(e, index + 3)}
                    onPaste={handlePaste}
                    maxLength={1}
                    className="lg:w-12 lg:h-12 w-10 h-10 rounded-md border border-gray-300 text-center text-lg outline-none focus:ring-2 focus:ring-gray-500"
                  />
                ))}
              </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6241D3] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#a093cc] transition disabled:bg-gray-400"
          >
            {loading ? "Processing..." : showOtpInput ? "Verify OTP →" : "Login →"}
          </button>

          {/* Policy agreements */}
          <p className="text-[12px] leading-4 text-gray-600 text-center sm:text-left">
            By logging in, I agree to the
            <Link
              to="/terms-of-service"
              className="text-gray-800 underline mx-1"
            >
              Terms of Service
            </Link>
            ,
            <Link 
            to="/cookie-policy"
            className="text-gray-800 underline mx-1"
            >
              Cookie Policy
            </Link>
            and
            <Link 
            to="/privacy-policy"
            className="text-gray-800 underline mx-1"
            >
              Privacy Policy
            </Link>
            . I also agree to receive emails and communication relating to OutX services and offers.
          </p>
        </form>
      </div>
    </div>
    </>
  );
}
