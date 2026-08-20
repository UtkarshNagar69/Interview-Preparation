import {
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiClock,
  FiPlay,
  FiTarget,
  FiTrendingUp,
  FiZap,
  FiBookOpen,
  FiActivity,
  FiShield,
} from "react-icons/fi";

import { useEffect, useState } from "react";
import Navbar from "../../components/user/Navbar";

const Dashboard = () => {
  const [mouse, setMouse] = useState({
    x: 50,
    y: 50,
  });

  const [trail, setTrail] = useState({
    x: 50,
    y: 50,
  });

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

  useEffect(() => {
    let animationFrame;

    const animate = () => {
      setTrail((previous) => ({
        x: previous.x + (mouse.x - previous.x) * 0.06,
        y: previous.y + (mouse.y - previous.y) * 0.06,
      }));

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [mouse.x, mouse.y]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* =========================================================
          LIVE BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Main ambient gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.10),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.08),transparent_35%)]" />

        {/* Grid */}
        <div
          className="absolute inset-[-100px] opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            animation: "dashboardGrid 25s linear infinite",
          }}
        />

        {/* Green orb */}
        <div
          className="absolute -left-32 -top-20 h-[430px] w-[430px] rounded-full bg-emerald-500/10 blur-[120px]"
          style={{
            animation: "dashboardOrb1 15s ease-in-out infinite",
          }}
        />

        {/* Teal orb */}
        <div
          className="absolute -right-32 top-[25%] h-[460px] w-[460px] rounded-full bg-teal-500/10 blur-[130px]"
          style={{
            animation: "dashboardOrb2 18s ease-in-out infinite",
          }}
        />

        {/* Amber orb */}
        <div
          className="absolute bottom-[-180px] left-[35%] h-[400px] w-[400px] rounded-full bg-amber-500/[0.05] blur-[120px]"
          style={{
            animation: "dashboardOrb3 20s ease-in-out infinite",
          }}
        />

        {/* Floating dots */}
        <span
          className="absolute left-[15%] top-[22%] h-1.5 w-1.5 rounded-full bg-emerald-300/70"
          style={{
            animation: "dashboardDot1 7s ease-in-out infinite",
          }}
        />

        <span
          className="absolute left-[45%] top-[15%] h-1 w-1 rounded-full bg-teal-300/70"
          style={{
            animation: "dashboardDot2 9s ease-in-out infinite",
          }}
        />

        <span
          className="absolute right-[18%] top-[30%] h-1.5 w-1.5 rounded-full bg-amber-300/60"
          style={{
            animation: "dashboardDot3 8s ease-in-out infinite",
          }}
        />

        <span
          className="absolute bottom-[22%] right-[25%] h-1 w-1 rounded-full bg-emerald-300/60"
          style={{
            animation: "dashboardDot4 10s ease-in-out infinite",
          }}
        />
      </div>

      {/* =========================================================
          MOUSE GLOW
      ========================================================== */}

      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background: `radial-gradient(
            380px circle at ${mouse.x}% ${mouse.y}%,
            rgba(16,185,129,0.12),
            rgba(20,184,166,0.05) 35%,
            transparent 70%
          )`,
        }}
      />

      {/* Mouse trail */}
      <div
        className="pointer-events-none fixed z-[1] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/[0.03] blur-[100px]"
        style={{
          left: `${trail.x}%`,
          top: `${trail.y}%`,
        }}
      />

      {/* Cursor */}
      <div
        className="pointer-events-none fixed z-50 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/40 bg-emerald-300/10 shadow-[0_0_20px_rgba(16,185,129,0.35)] md:block"
        style={{
          left: `${mouse.x}%`,
          top: `${mouse.y}%`,
        }}
      />

      {/* =========================================================
          NAVBAR
      ========================================================== */}

      <div className="relative z-20">
        <Navbar />
      </div>

      {/* =========================================================
          MAIN
      ========================================================== */}

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome */}
        <section className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-xl">
              <FiActivity size={13} />
              Dashboard Overview
            </div>

            <p className="mb-2 text-sm font-medium text-emerald-400">
              Welcome back 👋
            </p>

            <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                ace
              </span>{" "}
              your next interview?
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Practice interviews, improve your skills and track your
              performance with AI-powered insights.
            </p>
          </div>

          <button className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/10 transition hover:-translate-y-0.5 hover:shadow-emerald-400/20 sm:w-auto">
            <FiPlay size={16} />

            Start Interview

            <FiArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </section>

        {/* =======================================================
            STATS
        ======================================================== */}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<FiTarget />}
            title="Total Interviews"
            value="12"
            subtitle="+3 this month"
            color="emerald"
          />

          <StatCard
            icon={<FiCheckCircle />}
            title="Completed"
            value="8"
            subtitle="67% completion"
            color="teal"
          />

          <StatCard
            icon={<FiTrendingUp />}
            title="Average Score"
            value="78%"
            subtitle="+8% improvement"
            color="amber"
          />

          <StatCard
            icon={<FiClock />}
            title="Practice Hours"
            value="14h"
            subtitle="+2.5h this week"
            color="emerald"
          />
        </section>

        {/* =======================================================
            PERFORMANCE + PRACTICE
        ======================================================== */}

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Performance */}
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.10] bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:col-span-2">
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-emerald-500/[0.06] blur-[80px]" />

            <div className="relative">
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                      <FiBarChart2 size={18} />
                    </div>

                    <div>
                      <h2 className="font-semibold">
                        Performance Overview
                      </h2>

                      <p className="mt-1 text-xs text-slate-600">
                        Your interview performance
                      </p>
                    </div>
                  </div>
                </div>

                <button className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-xs text-slate-500 transition hover:border-emerald-400/20 hover:text-emerald-400">
                  Last 30 days
                </button>
              </div>

              <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
                {/* Score */}
                <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-white/[0.06]" />

                  <div className="absolute inset-2 rounded-full border-[7px] border-emerald-500/10" />

                  <div className="absolute inset-2 rotate-[-40deg] rounded-full border-[7px] border-emerald-400/70 border-b-transparent border-r-transparent" />

                  <div className="absolute inset-6 rounded-full bg-emerald-500/[0.04]" />

                  <div className="relative text-center">
                    <p className="text-3xl font-bold">78%</p>

                    <p className="mt-1 text-[10px] text-slate-600">
                      Average
                    </p>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-emerald-400/10 bg-emerald-400/[0.05] px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                      +8.4%
                    </span>

                    <span className="text-[10px] text-slate-700">
                      vs last month
                    </span>
                  </div>

                  <p className="mt-4 text-lg font-semibold">
                    Good progress!
                  </p>

                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                    Your performance is improving. Keep practicing to reach
                    your target score and strengthen your weaker areas.
                  </p>

                  <button className="mt-5 text-xs font-semibold text-emerald-400 transition hover:text-emerald-300">
                    View full performance →
                  </button>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-8 grid gap-5 border-t border-white/[0.06] pt-6 sm:grid-cols-3">
                <ProgressItem
                  label="Technical"
                  value="84%"
                  width="84%"
                />

                <ProgressItem
                  label="Communication"
                  value="72%"
                  width="72%"
                />

                <ProgressItem
                  label="Confidence"
                  value="78%"
                  width="78%"
                />
              </div>
            </div>
          </div>

          {/* Practice */}
          <div className="relative overflow-hidden rounded-[28px] border border-emerald-400/15 bg-gradient-to-br from-emerald-500/[0.10] via-teal-500/[0.04] to-white/[0.02] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-400/10 blur-[70px]" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/15 bg-emerald-500/10 text-emerald-400">
                <FiZap size={21} />
              </div>

              <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-400">
                Quick Practice
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Practice Interview
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Start a realistic mock interview and get AI-powered feedback
                on your answers.
              </p>

              <div className="mt-5 flex items-center gap-3 text-[10px] text-slate-600">
                <span>AI powered</span>
                <span>•</span>
                <span>15–20 min</span>
              </div>

              <button className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/10 transition hover:-translate-y-0.5">
                Start Practice

                <FiArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </section>

        {/* =======================================================
            RECENT ACTIVITY
        ======================================================== */}

        <section className="mt-6 rounded-[28px] border border-white/[0.10] bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400">
                  <FiActivity size={17} />
                </div>

                <div>
                  <h2 className="font-semibold">
                    Recent Activity
                  </h2>

                  <p className="mt-1 text-xs text-slate-600">
                    Your latest interview activity
                  </p>
                </div>
              </div>
            </div>

            <button className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-xs font-semibold text-emerald-400 transition hover:border-emerald-400/20">
              View all
            </button>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-[#030712]/60 p-4 transition hover:border-emerald-400/15 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <FiCheckCircle size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Technical Interview
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  Completed recently
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end sm:gap-7">
              <span className="flex items-center gap-1.5 text-xs text-slate-600">
                <FiClock size={13} />
                20 min
              </span>

              <span className="rounded-full border border-emerald-400/10 bg-emerald-400/[0.05] px-3 py-1.5 text-xs font-semibold text-emerald-400">
                82%
              </span>
            </div>
          </div>
        </section>

        {/* =======================================================
            QUICK LINKS
        ======================================================== */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <QuickCard
            icon={<FiPlay />}
            title="Mock Interview"
            description="Practice a real interview"
            color="emerald"
          />

          <QuickCard
            icon={<FiBookOpen />}
            title="Practice Questions"
            description="Improve your technical skills"
            color="teal"
          />

          <QuickCard
            icon={<FiBarChart2 />}
            title="Your Performance"
            description="Analyze your progress"
            color="amber"
          />
        </section>
      </main>

      {/* ==========================================================
          CSS ANIMATIONS
      =========================================================== */}

      <style>{`
        @keyframes dashboardGrid {
          from {
            transform: translate(0, 0);
          }

          to {
            transform: translate(60px, 60px);
          }
        }

        @keyframes dashboardOrb1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }

          50% {
            transform: translate(100px, 70px) scale(1.08);
          }
        }

        @keyframes dashboardOrb2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }

          50% {
            transform: translate(-100px, 70px) scale(1.08);
          }
        }

        @keyframes dashboardOrb3 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }

          50% {
            transform: translate(80px, -80px) scale(1.06);
          }
        }

        @keyframes dashboardDot1 {
          0%,
          100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }

          50% {
            transform: translate(60px, -40px);
            opacity: 1;
          }
        }

        @keyframes dashboardDot2 {
          0%,
          100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }

          50% {
            transform: translate(-40px, 60px);
            opacity: 0.9;
          }
        }

        @keyframes dashboardDot3 {
          0%,
          100% {
            transform: translate(0, 0);
            opacity: 0.25;
          }

          50% {
            transform: translate(-60px, -50px);
            opacity: 1;
          }
        }

        @keyframes dashboardDot4 {
          0%,
          100% {
            transform: translate(0, 0);
            opacity: 0.25;
          }

          50% {
            transform: translate(50px, 40px);
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

/* ================================================================
   STAT CARD
================================================================ */

const StatCard = ({
  icon,
  title,
  value,
  subtitle,
  color = "emerald",
}) => {
  const styles = {
    emerald: {
      icon: "bg-emerald-500/10 text-emerald-400",
      hover: "hover:border-emerald-400/20",
      text: "text-emerald-400",
    },

    teal: {
      icon: "bg-teal-500/10 text-teal-400",
      hover: "hover:border-teal-400/20",
      text: "text-teal-400",
    },

    amber: {
      icon: "bg-amber-500/10 text-amber-300",
      hover: "hover:border-amber-400/20",
      text: "text-amber-300",
    },
  };

  const style = styles[color];

  return (
    <div
      className={`group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.04] p-5 shadow-xl shadow-black/20 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 ${style.hover}`}
    >
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/[0.025] blur-2xl" />

      <div className="relative flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${style.icon}`}
        >
          {icon}
        </div>

        <FiArrowRight
          size={16}
          className="text-slate-700 transition group-hover:translate-x-1 group-hover:text-slate-400"
        />
      </div>

      <p className="relative mt-5 text-xs text-slate-500">
        {title}
      </p>

      <p className="relative mt-1 text-2xl font-bold tracking-tight">
        {value}
      </p>

      <p className={`relative mt-3 text-[10px] ${style.text}`}>
        {subtitle}
      </p>
    </div>
  );
};

/* ================================================================
   PROGRESS ITEM
================================================================ */

const ProgressItem = ({
  label,
  value,
  width,
}) => {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] text-slate-500">
          {label}
        </span>

        <span className="text-[11px] font-medium text-slate-400">
          {value}
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
          style={{
            width: width,
          }}
        />
      </div>
    </div>
  );
};

/* ================================================================
   QUICK CARD
================================================================ */

const QuickCard = ({
  icon,
  title,
  description,
  color = "emerald",
}) => {
  const styles = {
    emerald: {
      icon: "bg-emerald-500/10 text-emerald-400",
      hover: "hover:border-emerald-400/20",
      arrow: "group-hover:text-emerald-400",
    },

    teal: {
      icon: "bg-teal-500/10 text-teal-400",
      hover: "hover:border-teal-400/20",
      arrow: "group-hover:text-teal-400",
    },

    amber: {
      icon: "bg-amber-500/10 text-amber-300",
      hover: "hover:border-amber-400/20",
      arrow: "group-hover:text-amber-300",
    },
  };

  const style = styles[color];

  return (
    <button
      className={`group flex w-full items-center gap-4 rounded-[22px] border border-white/[0.08] bg-white/[0.04] p-4 text-left shadow-xl shadow-black/10 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06] ${style.hover}`}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.icon}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-600">
          {description}
        </p>
      </div>

      <FiArrowRight
        size={16}
        className={`text-slate-700 transition group-hover:translate-x-1 ${style.arrow}`}
      />
    </button>
  );
};

export default Dashboard;