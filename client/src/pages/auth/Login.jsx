import { Link, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiShield,
  FiZap,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

  // ============================================================
  // MOUSE TRACKING
  // ============================================================

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // ============================================================
  // SMOOTH MOUSE TRAIL
  // ============================================================

  useEffect(() => {
    let animationFrame;

    const animate = () => {
      setTrail((prev) => ({
        x: prev.x + (mouse.x - prev.x) * 0.08,
        y: prev.y + (mouse.y - prev.y) * 0.08,
      }));

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [mouse]);

  // ============================================================
  // FORM
  // ============================================================

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================================
  // LOGIN
  // ============================================================

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/users/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.data.token);

      toast.success(response.data.msg || "Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.msg ||
          "Login Failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">

      {/* ==========================================================
          LIVE BACKGROUND
      =========================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        {/* Base atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(20,184,166,0.07),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(245,158,11,0.05),transparent_30%)]" />

        {/* Animated Orb 1 */}
        <div
          className="absolute h-[420px] w-[420px] rounded-full bg-emerald-500/[0.09] blur-[110px]"
          style={{
            left: "5%",
            top: "5%",
            animation: "floatOne 16s ease-in-out infinite",
          }}
        />

        {/* Animated Orb 2 */}
        <div
          className="absolute h-[500px] w-[500px] rounded-full bg-teal-500/[0.08] blur-[130px]"
          style={{
            right: "-5%",
            top: "20%",
            animation: "floatTwo 20s ease-in-out infinite",
          }}
        />

        {/* Animated Orb 3 */}
        <div
          className="absolute h-[400px] w-[400px] rounded-full bg-amber-400/[0.06] blur-[120px]"
          style={{
            left: "35%",
            bottom: "-15%",
            animation: "floatThree 18s ease-in-out infinite",
          }}
        />

        {/* Animated Orb 4 */}
        <div
          className="absolute h-[250px] w-[250px] rounded-full bg-emerald-300/[0.05] blur-[90px]"
          style={{
            right: "30%",
            top: "8%",
            animation: "floatFour 13s ease-in-out infinite",
          }}
        />

        {/* Moving grid */}
        <div
          className="absolute inset-[-100px] opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            animation: "gridMove 25s linear infinite",
          }}
        />

        {/* Horizontal light streak */}
        <div
          className="absolute left-[-20%] top-[25%] h-px w-[55%] bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent"
          style={{
            animation: "streakOne 12s linear infinite",
          }}
        />

        <div
          className="absolute right-[-20%] top-[70%] h-px w-[50%] bg-gradient-to-r from-transparent via-teal-400/15 to-transparent"
          style={{
            animation: "streakTwo 15s linear infinite",
          }}
        />

        {/* Floating particles */}
        <div
          className="absolute left-[8%] top-[20%] h-1.5 w-1.5 rounded-full bg-emerald-300/70"
          style={{ animation: "particleOne 7s ease-in-out infinite" }}
        />

        <div
          className="absolute left-[18%] top-[68%] h-1 w-1 rounded-full bg-teal-300/60"
          style={{ animation: "particleTwo 9s ease-in-out infinite" }}
        />

        <div
          className="absolute left-[42%] top-[12%] h-1.5 w-1.5 rounded-full bg-amber-300/70"
          style={{ animation: "particleThree 8s ease-in-out infinite" }}
        />

        <div
          className="absolute right-[28%] top-[18%] h-1 w-1 rounded-full bg-emerald-300/60"
          style={{ animation: "particleFour 11s ease-in-out infinite" }}
        />

        <div
          className="absolute right-[12%] top-[45%] h-1.5 w-1.5 rounded-full bg-teal-300/60"
          style={{ animation: "particleFive 10s ease-in-out infinite" }}
        />

        <div
          className="absolute right-[35%] bottom-[15%] h-1 w-1 rounded-full bg-amber-300/50"
          style={{ animation: "particleSix 8s ease-in-out infinite" }}
        />

        <div
          className="absolute left-[28%] bottom-[12%] h-1.5 w-1.5 rounded-full bg-emerald-300/50"
          style={{ animation: "particleSeven 12s ease-in-out infinite" }}
        />

      </div>

      {/* ==========================================================
          MOUSE SPOTLIGHT
      =========================================================== */}

      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background: `radial-gradient(
            420px circle at ${mouse.x}% ${mouse.y}%,
            rgba(16,185,129,0.14),
            rgba(20,184,166,0.06) 30%,
            transparent 70%
          )`,
        }}
      />

      {/* Mouse trail */}
      <div
        className="pointer-events-none fixed z-[1] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/[0.035] blur-[110px]"
        style={{
          left: `${trail.x}%`,
          top: `${trail.y}%`,
        }}
      />

      {/* Cursor aura */}
      <div
        className="pointer-events-none fixed z-[60] hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/50 bg-emerald-300/10 shadow-[0_0_25px_rgba(52,211,153,0.45)] md:block"
        style={{
          left: `${mouse.x}%`,
          top: `${mouse.y}%`,
        }}
      />

      {/* ==========================================================
          CONTENT
      =========================================================== */}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] items-center px-4 py-6 sm:px-6 md:px-10 lg:px-12">

        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">

          {/* ======================================================
              LEFT SECTION
          ======================================================= */}

          <div className="hidden lg:block">

            {/* Logo */}
            <div className="mb-14 flex items-center gap-3">

              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.07] shadow-[0_10px_40px_rgba(16,185,129,0.15)] backdrop-blur-2xl">

                <span className="relative text-sm font-bold">
                  IP
                </span>

              </div>

              <div>
                <h2 className="text-sm font-bold tracking-wide">
                  InterviewPrep
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  AI Interview Platform
                </p>
              </div>

            </div>

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/[0.07] px-4 py-2 text-xs font-medium text-emerald-300 backdrop-blur-xl">

              <FiZap size={14} />

              AI-Powered Interview Preparation

            </div>

            {/* Heading */}
            <h1 className="max-w-2xl text-5xl font-bold leading-[1.08] tracking-tight xl:text-6xl">

              Prepare with
              <br />

              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                confidence.
              </span>

            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-400 xl:text-base">
              Practice technical and HR interviews, improve your answers,
              and track your progress with intelligent AI-powered feedback.
            </p>

            {/* Feature cards */}
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">

              <div className="group rounded-2xl border border-white/[0.09] bg-white/[0.04] p-4 shadow-xl shadow-black/20 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-emerald-400/20 hover:bg-white/[0.07]">

                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <FiZap size={17} />
                </div>

                <p className="text-sm font-semibold">
                  AI Feedback
                </p>

                <p className="mt-1 text-[11px] leading-4 text-slate-600">
                  Intelligent feedback on your answers.
                </p>

              </div>

              <div className="group rounded-2xl border border-white/[0.09] bg-white/[0.04] p-4 shadow-xl shadow-black/20 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-teal-400/20 hover:bg-white/[0.07]">

                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400">
                  <FiCheckCircle size={17} />
                </div>

                <p className="text-sm font-semibold">
                  Real Practice
                </p>

                <p className="mt-1 text-[11px] leading-4 text-slate-600">
                  Simulate realistic interviews.
                </p>

              </div>

              <div className="group rounded-2xl border border-white/[0.09] bg-white/[0.04] p-4 shadow-xl shadow-black/20 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-amber-400/20 hover:bg-white/[0.07]">

                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300">
                  <FiShield size={17} />
                </div>

                <p className="text-sm font-semibold">
                  Track Growth
                </p>

                <p className="mt-1 text-[11px] leading-4 text-slate-600">
                  Monitor your interview progress.
                </p>

              </div>

            </div>

            <div className="mt-10 flex items-center gap-2 text-xs text-slate-600">
              <FiShield
                className="text-emerald-500/70"
                size={13}
              />
              Secure authentication · Private interview data
            </div>

          </div>

          {/* ======================================================
              RIGHT SECTION
          ======================================================= */}

          <div className="flex w-full justify-center">

            <div className="w-full max-w-[440px]">

              {/* Mobile Logo */}
              <div className="mb-8 flex items-center gap-3 lg:hidden">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] shadow-lg backdrop-blur-xl">
                  <span className="text-sm font-bold">
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

              {/* ==================================================
                  GLASS CARD
              =================================================== */}

              <div className="relative rounded-[32px] border border-white/[0.14] bg-white/[0.045] p-[1px] shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-3xl">

                {/* Glass highlight */}
                <div className="pointer-events-none absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                <div className="rounded-[31px] border border-white/[0.05] bg-[#070B14]/75 px-5 py-7 backdrop-blur-3xl sm:px-8 sm:py-9">

                  {/* Header */}
                  <div className="mb-8">

                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/10">

                      <FiLock size={19} />

                    </div>

                    <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">
                      Welcome back
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight">
                      Sign in
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Continue your interview preparation journey.
                    </p>

                  </div>

                  {/* Form */}
                  <form
                    onSubmit={submitHandler}
                    className="space-y-5"
                  >

                    {/* Email */}
                    <div>

                      <label className="mb-2 block text-xs font-medium text-slate-400">
                        Email address
                      </label>

                      <div className="group relative">

                        <FiMail
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-emerald-400"
                        />

                        <input
                          type="email"
                          name="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={changeHandler}
                          required
                          autoComplete="email"
                          className="h-14 w-full rounded-2xl border border-white/[0.08] bg-white/[0.035] pl-11 pr-4 text-sm text-white outline-none backdrop-blur-xl transition-all duration-200 placeholder:text-slate-700 hover:border-white/[0.14] focus:border-emerald-400/50 focus:bg-white/[0.05] focus:shadow-[0_0_30px_rgba(16,185,129,0.08)] focus:ring-4 focus:ring-emerald-500/10"
                        />

                      </div>

                    </div>

                    {/* Password */}
                    <div>

                      <div className="mb-2 flex items-center justify-between">

                        <label className="text-xs font-medium text-slate-400">
                          Password
                        </label>

                        <button
                          type="button"
                          onClick={() =>
                            navigate("/forgot-password")
                          }
                          className="text-xs font-medium text-emerald-400 transition hover:text-emerald-300"
                        >
                          Forgot password?
                        </button>

                      </div>

                      <div className="group relative">

                        <FiLock
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-emerald-400"
                        />

                        <input
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          name="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={changeHandler}
                          required
                          autoComplete="current-password"
                          className="h-14 w-full rounded-2xl border border-white/[0.08] bg-white/[0.035] pl-11 pr-12 text-sm text-white outline-none backdrop-blur-xl transition-all duration-200 placeholder:text-slate-700 hover:border-white/[0.14] focus:border-emerald-400/50 focus:bg-white/[0.05] focus:shadow-[0_0_30px_rgba(16,185,129,0.08)] focus:ring-4 focus:ring-emerald-500/10"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword((prev) => !prev)
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 transition-colors hover:text-slate-300"
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

                    {/* Remember */}
                    <div className="flex items-center justify-between pt-1">

                      <label
                        htmlFor="remember"
                        className="flex cursor-pointer items-center gap-2"
                      >

                        <input
                          id="remember"
                          type="checkbox"
                          className="h-4 w-4 cursor-pointer rounded border-white/10 bg-white/5 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0"
                        />

                        <span className="text-xs text-slate-500">
                          Keep me signed in
                        </span>

                      </label>

                      <div className="flex items-center gap-1.5 text-[10px] text-slate-600">

                        <FiShield
                          size={13}
                          className="text-emerald-500/70"
                        />

                        Secure

                      </div>

                    </div>

                    {/* Login button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 bg-[length:200%_100%] text-sm font-semibold text-slate-950 shadow-xl shadow-emerald-500/20 transition-all duration-500 hover:bg-[100%_0] hover:shadow-emerald-400/30 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60"
                    >

                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                      {loading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign in

                          <FiArrowRight
                            size={17}
                            className="transition-transform duration-200 group-hover:translate-x-1"
                          />
                        </>
                      )}

                    </button>

                  </form>

                  {/* Security */}
                  <div className="mt-7 flex items-center gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.03] px-4 py-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                      <FiShield size={16} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-300">
                        Secure authentication
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-600">
                        Your login information stays protected.
                      </p>
                    </div>

                  </div>

                </div>
              </div>

              {/* Register */}
              <p className="mt-6 text-center text-sm text-slate-500">
                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="font-semibold text-emerald-400 transition hover:text-emerald-300"
                >
                  Create account
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

      {/* ==========================================================
          ANIMATIONS
      =========================================================== */}

      <style>{`
        @keyframes floatOne {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          25% {
            transform: translate3d(100px, 60px, 0) scale(1.08);
          }

          50% {
            transform: translate3d(40px, 160px, 0) scale(0.95);
          }

          75% {
            transform: translate3d(-70px, 80px, 0) scale(1.05);
          }
        }

        @keyframes floatTwo {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          30% {
            transform: translate3d(-100px, 70px, 0) scale(1.08);
          }

          60% {
            transform: translate3d(-60px, -80px, 0) scale(0.94);
          }

          85% {
            transform: translate3d(60px, -40px, 0) scale(1.04);
          }
        }

        @keyframes floatThree {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          35% {
            transform: translate3d(120px, -70px, 0) scale(1.1);
          }

          70% {
            transform: translate3d(-60px, -130px, 0) scale(0.92);
          }
        }

        @keyframes floatFour {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(-120px, 80px, 0);
          }
        }

        @keyframes gridMove {
          0% {
            transform: translate3d(0, 0, 0);
          }

          100% {
            transform: translate3d(60px, 60px, 0);
          }
        }

        @keyframes streakOne {
          0% {
            transform: translateX(-20vw);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          80% {
            opacity: 0.4;
          }

          100% {
            transform: translateX(160vw);
            opacity: 0;
          }
        }

        @keyframes streakTwo {
          0% {
            transform: translateX(20vw);
            opacity: 0;
          }

          20% {
            opacity: 0.8;
          }

          80% {
            opacity: 0.3;
          }

          100% {
            transform: translateX(-160vw);
            opacity: 0;
          }
        }

        @keyframes particleOne {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.3;
          }

          50% {
            transform: translate3d(80px, -50px, 0);
            opacity: 1;
          }
        }

        @keyframes particleTwo {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.2;
          }

          50% {
            transform: translate3d(-60px, -90px, 0);
            opacity: 0.9;
          }
        }

        @keyframes particleThree {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.3;
          }

          50% {
            transform: translate3d(40px, 80px, 0);
            opacity: 1;
          }
        }

        @keyframes particleFour {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.2;
          }

          50% {
            transform: translate3d(-90px, 40px, 0);
            opacity: 1;
          }
        }

        @keyframes particleFive {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.3;
          }

          50% {
            transform: translate3d(60px, -70px, 0);
            opacity: 0.9;
          }
        }

        @keyframes particleSix {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.2;
          }

          50% {
            transform: translate3d(-80px, -60px, 0);
            opacity: 0.9;
          }
        }

        @keyframes particleSeven {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.3;
          }

          50% {
            transform: translate3d(70px, -80px, 0);
            opacity: 0.8;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;