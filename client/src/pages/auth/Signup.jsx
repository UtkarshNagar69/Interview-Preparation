import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiArrowRight,
  FiCamera,
  FiEye,
  FiEyeOff,
  FiShield,
  FiZap,
  FiCheckCircle,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    bio: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [mouse, setMouse] = useState({
    x: 50,
    y: 50,
  });

  const [trail, setTrail] = useState({
    x: 50,
    y: 50,
  });

  // =========================================================
  // MOUSE TRACKING
  // =========================================================

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // =========================================================
  // MOUSE TRAIL
  // =========================================================

  useEffect(() => {
    let animationFrame;

    const animate = () => {
      setTrail((previous) => ({
        x: previous.x + (mouse.x - previous.x) * 0.07,
        y: previous.y + (mouse.y - previous.y) * 0.07,
      }));

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [mouse.x, mouse.y]);

  // =========================================================
  // INPUT HANDLER
  // =========================================================

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // PROFILE IMAGE
  // =========================================================

  const changeImageHandler = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Profile Image must be less than 2MB");
      return;
    }

    const allowedTypes = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, PNG and WEBP images are allowed");
      return;
    }

    setProfileImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("password", formData.password);
      data.append("bio", formData.bio);

      if (profileImage) {
        data.append("profileImage", profileImage);
      }

      const response = await api.post("/users/signup", data);

      toast.success(response.data.msg || "Signup Successful");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        bio: "",
      });

      setProfileImage(null);
      setPreview(null);

      navigate("/login");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.msg || "Signup Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">

      {/* =========================================================
          LIVE BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        {/* Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(16,185,129,0.10),transparent_32%),radial-gradient(circle_at_85%_30%,rgba(20,184,166,0.08),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(245,158,11,0.05),transparent_35%)]" />

        {/* Grid */}
        <div
          className="absolute inset-[-100px] opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            animation: "registerGrid 26s linear infinite",
          }}
        />

        {/* Green Orb */}
        <div
          className="absolute -left-40 -top-32 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.09] blur-[130px]"
          style={{
            animation: "registerOrbOne 16s ease-in-out infinite",
          }}
        />

        {/* Teal Orb */}
        <div
          className="absolute -right-40 top-[20%] h-[520px] w-[520px] rounded-full bg-teal-500/[0.08] blur-[140px]"
          style={{
            animation: "registerOrbTwo 20s ease-in-out infinite",
          }}
        />

        {/* Amber Orb */}
        <div
          className="absolute bottom-[-200px] left-[30%] h-[430px] w-[430px] rounded-full bg-amber-500/[0.05] blur-[130px]"
          style={{
            animation: "registerOrbThree 18s ease-in-out infinite",
          }}
        />

        {/* Floating dots */}
        <span
          className="absolute left-[10%] top-[25%] h-1.5 w-1.5 rounded-full bg-emerald-300/70"
          style={{
            animation: "registerDotOne 8s ease-in-out infinite",
          }}
        />

        <span
          className="absolute left-[38%] top-[12%] h-1 w-1 rounded-full bg-teal-300/60"
          style={{
            animation: "registerDotTwo 9s ease-in-out infinite",
          }}
        />

        <span
          className="absolute right-[20%] top-[35%] h-1.5 w-1.5 rounded-full bg-amber-300/60"
          style={{
            animation: "registerDotThree 7s ease-in-out infinite",
          }}
        />

        <span
          className="absolute right-[12%] bottom-[20%] h-1 w-1 rounded-full bg-emerald-300/50"
          style={{
            animation: "registerDotFour 10s ease-in-out infinite",
          }}
        />

      </div>

      {/* =========================================================
          MOUSE SPOTLIGHT
      ========================================================== */}

      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background: `radial-gradient(
            420px circle at ${mouse.x}% ${mouse.y}%,
            rgba(16,185,129,0.13),
            rgba(20,184,166,0.05) 32%,
            transparent 70%
          )`,
        }}
      />

      {/* Mouse trail */}
      <div
        className="pointer-events-none fixed z-[1] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/[0.03] blur-[110px]"
        style={{
          left: `${trail.x}%`,
          top: `${trail.y}%`,
        }}
      />

      {/* Cursor */}
      <div
        className="pointer-events-none fixed z-50 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/40 bg-emerald-300/10 shadow-[0_0_25px_rgba(16,185,129,0.4)] md:block"
        style={{
          left: `${mouse.x}%`,
          top: `${mouse.y}%`,
        }}
      />

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1450px] items-center px-4 py-8 sm:px-6 lg:px-10">

        <div className="grid w-full items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">

          {/* =====================================================
              LEFT SIDE
          ====================================================== */}

          <div className="hidden lg:block">

            {/* Brand */}
            <div className="mb-14 flex items-center gap-3">

              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-white/[0.06] shadow-[0_10px_40px_rgba(16,185,129,0.15)] backdrop-blur-2xl">

                <span className="relative text-sm font-bold text-emerald-300">
                  IP
                </span>

              </div>

              <div>
                <h2 className="text-sm font-bold tracking-wide">
                  InterviewPrep
                </h2>

                <p className="mt-1 text-xs text-slate-600">
                  AI Interview Platform
                </p>
              </div>

            </div>

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/[0.07] px-4 py-2 text-xs font-medium text-emerald-300 backdrop-blur-xl">

              <FiZap size={14} />

              Start Your Journey

            </div>

            {/* Heading */}
            <h1 className="max-w-xl text-5xl font-bold leading-[1.08] tracking-tight xl:text-6xl">

              Build your profile.
              <br />

              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                Build your confidence.
              </span>

            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-500">
              Create your InterviewPrep profile and get personalized
              interview preparation, AI-powered feedback, and meaningful
              progress insights.
            </p>

            {/* Feature cards */}
            <div className="mt-10 space-y-3">

              <Feature
                icon={<FiCheckCircle />}
                title="Personalized preparation"
                description="Practice interviews based on your goals and skill level."
              />

              <Feature
                icon={<FiZap />}
                title="AI-powered feedback"
                description="Understand where you can improve after every interview."
              />

              <Feature
                icon={<FiShield />}
                title="Your data stays protected"
                description="Your profile and interview information remain secure."
              />

            </div>

            <div className="mt-10 text-xs text-slate-700">
              Practice • Improve • Succeed
            </div>

          </div>

          {/* =====================================================
              RIGHT SIDE
          ====================================================== */}

          <div className="flex justify-center">

            <div className="w-full max-w-[500px]">

              {/* Mobile Logo */}
              <div className="mb-8 flex items-center gap-3 lg:hidden">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/15 bg-white/[0.06] backdrop-blur-xl">

                  <span className="text-sm font-bold text-emerald-300">
                    IP
                  </span>

                </div>

                <div>
                  <h2 className="text-sm font-bold">
                    InterviewPrep
                  </h2>

                  <p className="text-xs text-slate-600">
                    AI Interview Platform
                  </p>
                </div>

              </div>

              {/* =================================================
                  GLASS CARD
              ================================================== */}

              <div className="relative overflow-hidden rounded-[32px] border border-white/[0.13] bg-white/[0.045] p-[1px] shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-3xl">

                {/* Glass shine */}
                <div className="pointer-events-none absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                <div className="rounded-[31px] border border-white/[0.05] bg-[#070B14]/80 px-5 py-7 backdrop-blur-3xl sm:px-8 sm:py-9">

                  {/* Header */}
                  <div className="mb-7">

                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/10">

                      <FiUser size={19} />

                    </div>

                    <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">
                      Get started
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight">
                      Create your account
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Create your profile and start preparing for your next
                      interview.
                    </p>

                  </div>

                  {/* Form */}
                  <form
                    className="space-y-4"
                    onSubmit={submitHandler}
                  >

                    {/* Profile Image */}
                    <div className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3 backdrop-blur-xl">

                      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-emerald-400/20 bg-emerald-500/[0.04] text-slate-600">

                        {preview ? (
                          <img
                            src={preview}
                            alt="Profile preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <FiCamera size={22} />
                        )}

                      </div>

                      <div className="min-w-0">

                        <input
                          id="profileImage"
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          onChange={changeImageHandler}
                          className="hidden"
                        />

                        <label
                          htmlFor="profileImage"
                          className="cursor-pointer text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
                        >
                          Upload profile photo
                        </label>

                        <p className="mt-1 text-xs text-slate-600">
                          JPG, PNG or WEBP · Up to 2MB
                        </p>

                      </div>

                    </div>

                    {/* Full Name */}
                    <InputField
                      icon={<FiUser />}
                      label="Full name"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={changeHandler}
                    />

                    {/* Email */}
                    <InputField
                      icon={<FiMail />}
                      label="Email address"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={changeHandler}
                    />

                    {/* Phone */}
                    <InputField
                      icon={<FiPhone />}
                      label="Phone number"
                      name="phone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={changeHandler}
                    />

                    {/* Password */}
                    <div>

                      <label className="mb-2 block text-xs font-medium text-slate-400">
                        Password
                      </label>

                      <div className="group relative">

                        <FiLock
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 transition group-focus-within:text-emerald-400"
                        />

                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={changeHandler}
                          required
                          className="h-13 w-full rounded-2xl border border-white/[0.08] bg-white/[0.035] pl-11 pr-12 text-sm text-white outline-none backdrop-blur-xl transition placeholder:text-slate-700 hover:border-white/[0.14] focus:border-emerald-400/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-emerald-500/10"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword((prev) => !prev)
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 transition hover:text-slate-300"
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showPassword ? (
                            <FiEyeOff size={18} />
                          ) : (
                            <FiEye size={18} />
                          )}
                        </button>

                      </div>

                    </div>

                    {/* Bio */}
                    <div>

                      <label className="mb-2 block text-xs font-medium text-slate-400">
                        Short bio
                        <span className="ml-2 text-[10px] text-slate-700">
                          Optional
                        </span>
                      </label>

                      <textarea
                        rows="3"
                        name="bio"
                        placeholder="Tell us a little about yourself..."
                        value={formData.bio}
                        onChange={changeHandler}
                        className="w-full resize-none rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none backdrop-blur-xl transition placeholder:text-slate-700 hover:border-white/[0.14] focus:border-emerald-400/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-emerald-500/10"
                      />

                    </div>

                    {/* Security */}
                    <div className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
                        <FiShield size={15} />
                      </div>

                      <p className="text-[10px] leading-4 text-slate-600">
                        Your profile information is securely protected.
                      </p>

                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative mt-2 flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 bg-[length:200%_100%] text-sm font-semibold text-slate-950 shadow-xl shadow-emerald-500/20 transition-all duration-500 hover:bg-[100%_0] hover:shadow-emerald-400/30 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60"
                    >

                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                      {loading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />

                          Creating account...
                        </>
                      ) : (
                        <>
                          Create Account

                          <FiArrowRight
                            size={17}
                            className="transition-transform duration-200 group-hover:translate-x-1"
                          />
                        </>
                      )}

                    </button>

                  </form>

                </div>
              </div>

              {/* Login */}
              <p className="mt-6 text-center text-sm text-slate-500">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="font-semibold text-emerald-400 transition hover:text-emerald-300"
                >
                  Sign in
                </Link>

              </p>

              {/* Footer */}
              <div className="mt-5 flex items-center justify-center gap-3 text-[10px] text-slate-700">

                <span>© 2026 InterviewPrep</span>

                <span>•</span>

                <span>Privacy</span>

                <span>•</span>

                <span>Terms</span>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* =========================================================
          ANIMATIONS
      ========================================================== */}

      <style>{`
        @keyframes registerGrid {
          from {
            transform: translate(0, 0);
          }

          to {
            transform: translate(60px, 60px);
          }
        }

        @keyframes registerOrbOne {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }

          50% {
            transform: translate(100px, 80px) scale(1.08);
          }
        }

        @keyframes registerOrbTwo {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }

          50% {
            transform: translate(-100px, 70px) scale(1.07);
          }
        }

        @keyframes registerOrbThree {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }

          50% {
            transform: translate(90px, -70px) scale(1.06);
          }
        }

        @keyframes registerDotOne {
          0%,
          100% {
            transform: translate(0, 0);
            opacity: 0.25;
          }

          50% {
            transform: translate(60px, -50px);
            opacity: 1;
          }
        }

        @keyframes registerDotTwo {
          0%,
          100% {
            transform: translate(0, 0);
            opacity: 0.2;
          }

          50% {
            transform: translate(-50px, 70px);
            opacity: 0.9;
          }
        }

        @keyframes registerDotThree {
          0%,
          100% {
            transform: translate(0, 0);
            opacity: 0.25;
          }

          50% {
            transform: translate(-70px, -40px);
            opacity: 1;
          }
        }

        @keyframes registerDotFour {
          0%,
          100% {
            transform: translate(0, 0);
            opacity: 0.25;
          }

          50% {
            transform: translate(50px, 50px);
            opacity: 0.9;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
};

// =============================================================
// INPUT FIELD
// =============================================================

const InputField = ({
  icon,
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </label>

      <div className="group relative">

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 transition group-focus-within:text-emerald-400">
          {icon}
        </span>

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          className="h-13 w-full rounded-2xl border border-white/[0.08] bg-white/[0.035] pl-11 pr-4 text-sm text-white outline-none backdrop-blur-xl transition placeholder:text-slate-700 hover:border-white/[0.14] focus:border-emerald-400/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-emerald-500/10"
        />

      </div>
    </div>
  );
};

// =============================================================
// FEATURE
// =============================================================

const Feature = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4 backdrop-blur-2xl transition hover:border-emerald-400/15 hover:bg-white/[0.05]">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-600">
          {description}
        </p>
      </div>

    </div>
  );
};

export default Register;