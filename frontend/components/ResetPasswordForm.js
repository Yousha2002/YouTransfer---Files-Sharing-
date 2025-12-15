"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPassword,
  clearError,
  clearMessage,
} from "../store/slices/authSlice";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function ResetPasswordForm({ token }) {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, message, error } = useSelector((state) => state.auth);
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
    }
  }, [token]);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }, [message, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(clearMessage());

    if (!token) {
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      dispatch(clearError());

      return;
    }

    if (formData.newPassword.length < 6) {
      dispatch(clearError());

      return;
    }

    dispatch(resetPassword({ token, newPassword: formData.newPassword }));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) dispatch(clearError());
  };

  if (!tokenValid) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Invalid Reset Link
        </h2>
        <p className="text-gray-600 mb-4">
          This password reset link is invalid or has expired.
        </p>
        <a
          href="/forgot-password"
          className="bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#234C6A] hover:to-[#1B3C53] transition-all duration-300 inline-block"
        >
          Get New Link
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* New Password Field */}
      <div>
        <label className="block text-md font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          New Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            minLength="6"
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent transition-all placeholder-gray-400"
            placeholder="Enter new password (min. 6 characters)"
          />
          <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Confirm Password Field */}
      <div>
        <label className="block text-md font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Confirm New Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength="6"
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent transition-all placeholder-gray-400"
            placeholder="Confirm new password"
          />
          <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Password Requirements */}
      <div className="bg-gray-50 p-4 rounded-xl">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">
          Password Requirements:
        </h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li
            className={`flex items-center gap-1 ${
              formData.newPassword.length >= 6 ? "text-green-600" : ""
            }`}
          >
            {formData.newPassword.length >= 6 ? "✓" : "•"} Minimum 6 characters
          </li>
          <li
            className={`flex items-center gap-1 ${
              formData.newPassword === formData.confirmPassword &&
              formData.newPassword
                ? "text-green-600"
                : ""
            }`}
          >
            {formData.newPassword === formData.confirmPassword &&
            formData.newPassword
              ? "✓"
              : "•"}{" "}
            Passwords must match
          </li>
        </ul>
      </div>

      {/* Success Message */}
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <span className="text-lg">✓</span>
          <span>{message}. Redirecting to login...</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <span className="text-lg">⚠</span>
          <span>{error}</span>
        </div>
      )}

      {/* Validation Error for Password Mismatch */}
      {formData.newPassword &&
        formData.confirmPassword &&
        formData.newPassword !== formData.confirmPassword && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
            <span className="text-lg">⚠</span>
            <span>
              Passwords do not match. Please ensure both passwords are
              identical.
            </span>
          </div>
        )}

      {/* Validation Error for Password Length */}
      {formData.newPassword && formData.newPassword.length < 6 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <span className="text-lg">⚠</span>
          <span>Password must be at least 6 characters long.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={
          loading ||
          !tokenValid ||
          formData.newPassword !== formData.confirmPassword ||
          formData.newPassword.length < 6
        }
        className="w-full bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white py-3.5 rounded-xl font-semibold hover:from-[#234C6A] hover:to-[#1B3C53] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        {loading ? "Resetting Password..." : "Reset Password"}
      </button>
    </form>
  );
}
