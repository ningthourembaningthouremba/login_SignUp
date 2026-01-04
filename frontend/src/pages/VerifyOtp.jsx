import { useState } from "react";
import { useAuthStore } from "../../store/authStore";

const VerifyOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const { verifyOtp, isLoading } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyOtp(email, otp);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-6 border rounded-lg shadow"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Verify OTP
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full mb-3 p-2 border rounded"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
