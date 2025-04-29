import { Link } from 'react-router-dom'
import Logo from "../assets/logo.png";

function AffiliateSignUp() {
  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="max-w-md w-full my-20">
        <div className="flex flex-col items-center mb-6">
          <Link to="/">
            <img src={Logo} alt="logo" className="h-8 w-auto" />
          </Link>
          <h2 className="text-3xl sm:text-4xl font-bold mt-6 text-center sm:text-left">
            Affiliate Signup
          </h2>
          <h4 className="text-lg my-2 text-center">
          Register to LambdaTest Affiliate Program in a few steps and start earning money.
          </h4>
          <p className="mb-4 text-gray-900 text-center sm:text-left">
            Already have an account?{" "}
            <Link to="/login" className="border-b border-black font-semibold">
              Login now.
            </Link>
          </p>
        </div>

        <form
          className="space-y-4"
        >
          <div>
            <label className="block text-gray-600 font-medium">
               Email
            </label>
            <input
              type="email"
              placeholder="e.g: john@toyota.com"
              className="w-full p-3 border-gray-400 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">First Name</label>
            <input
              type="text"
              placeholder="John"
              className="w-full p-3 mt-1 border-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Last Name</label>
            <input
              type="text"
              placeholder="Doe"
              className="w-full p-3 mt-1 border-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Website</label>
            <input
              type="text"
              placeholder="toyota.com"
              className="w-full p-3 mt-1 border-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Company Name</label>
            <input
              type="text"
              placeholder="Toyota"
              className="w-full p-3 mt-1 border-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Password</label>
            <input
              type="text"
              placeholder=""
              className="w-full p-3 mt-1 border-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

        <div className='text-gray-600'>
          <input type='checkbox' className='mr-2'/>
          <label>I agree to receive email notifications(like when I earn a commission) and other important emails regarding the affiliate program</label>
        </div>
        <div className='text-gray-600'>
          <input type='checkbox' className='mr-2'/>
          <label>I agree to <Link to="/affiliate-terms"><span className='font-bold border-b'>affiliate terms</span></Link></label>
        </div>
        <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-700 transition disabled:bg-gray-400"
          >
           Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default AffiliateSignUp