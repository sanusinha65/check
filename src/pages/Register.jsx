import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../api/supabaseClient";
import { createUserAndTeam } from "../api/supabase";
import Logo from "../assets/logo.png";
import Cookies from 'js-cookie';
import MixpanelService from "../utils/mixpanel";
import Meta from "../helper/Meta";

export default function Register() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const length = 6; // Change this based on OTP length
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // First, check if user exists - using proper query
      const { data: existingUser, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (existingUser) {
        setMessage("This email is already registered. Please login instead.");
        setLoading(false);
        return;
      }

      // Send OTP
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          data: {
            full_name: fullName,
          },
          shouldCreateUser: true,
        },
      });

      if (otpError) throw otpError;

      setShowOtpInput(true);
      setMessage("Please verify with the OTP sent to your email.");
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
      // Verify OTP
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp.join(""),
        type: "email",
      });

      if (error) throw error;

      if (data?.session) {
        try {
          // Create user and team entries
          const userData = await createUserAndTeam({
            email,
            full_name: fullName,
          });

          console.log("Setting cookies...");
      
          const cookieOptions = {
            expires: 30, // Set to 7 days
            sameSite: 'Lax',
            secure: true,
            path: '/',
            domain: '.outx.ai',
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
          
          // Create a task record for the new user
          try {
            // Set scheduled_at to 1 year ago from now
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
            
            const { error: taskError } = await supabase.from("tasks").insert([
              {
                task_type: "linkedin_premium",
                user_id: userData.user.id,
                team_id: userData.team.id,
                scheduled_at: oneYearAgo.toISOString(),
                created_at: new Date().toISOString(),
              },
            ]);
            
            if (taskError) {
              console.error("Error creating initial task:", taskError);
            } else {
              console.log("Initial task created successfully");
            }
          } catch (taskError) {
            console.error("Failed to create initial task:", taskError);
            // Continue with registration flow even if task creation fails
          }
          
          MixpanelService.trackRegistration(data.session.user.id, data.session.user.email, data.session.user.user_metadata.full_name);
          
          // Navigate to dashboard
          navigate("/dashboard")
        // eslint-disable-next-line no-unused-vars
        } catch (dbError) {
          throw new Error("Failed to create user profile. Please try again.");
        }
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
        title="Sign Up - Start Scraping LinkedIn with Outx.ai" 
        description="Create your Outx.ai account to start scraping Sales Navigator and tracking LinkedIn posts today." 
        keywords="LinkedIn scraper signup, Outx.ai register, LinkedIn tracking signup" 
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
          <h2 className="text-3xl sm:text-4xl font-bold mt-6 text-center sm:text-left">
            Create an account.
          </h2>
          <h4 className="text-lg my-2 text-center sm:text-left">
            Reveal up to 25 contact details per month, free.
          </h4>
          <p className="mb-4 text-gray-900 text-center sm:text-left">
            Already have an account?{" "}
            <Link to="/login" className="border-b border-black font-semibold">
              Login now.
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

        <form
          onSubmit={showOtpInput ? handleVerifyOTP : handleSignup}
          className="space-y-4"
        >
          <div>
            <label className="block text-gray-600 font-medium">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="w-full p-3 mt-1 border-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">
              Your email
            </label>
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
            {loading
              ? "Processing..."
              : showOtpInput
              ? "Verify OTP →"
              : "Create my account →"}
          </button>

          <p className="text-[12px] leading-4 text-gray-600 text-center sm:text-left">
            By creating an account, I agree to the
            <Link
              to="/terms-of-service"
              className="text-gray-800 underline mx-1"
            >
              Terms of Service
            </Link>
            ,
            <Link to="/cookie-policy" className="text-gray-800 underline mx-1">
              Cookie Policy
            </Link>
            and
            <Link to="/privacy-policy" className="text-gray-800 underline mx-1">
              Privacy Policy
            </Link>
            . I also agree to receive emails and communication relating to OutX
            services and offers.
          </p>
        </form>
      </div>
    </div>
    </>
  );
}
