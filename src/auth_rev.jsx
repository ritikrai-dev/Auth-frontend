import { useState } from "react";
import { Toaster, toast } from "sonner";

const API_BASE = "https://auth-backend-n2vm.onrender.com";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Playfair+Display:wght@400;500;600;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'DM Mono', monospace;
    background: #0a0a0a;
    min-height: 100vh;
  }

  .auth-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background:
      radial-gradient(circle at 85% 15%, rgba(201,169,110,0.09), transparent 28%),
      radial-gradient(circle at 10% 90%, rgba(201,169,110,0.06), transparent 25%),
      #0a0a0a;
    position: relative;
    overflow: hidden;
  }

  /* Animated background glow */

  .auth-wrapper::before {
    content: '';
    position: absolute;
    width: 420px;
    height: 420px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(201,169,110,0.10) 0%,
      transparent 68%
    );
    top: -180px;
    right: -120px;
    animation: floatGlow 7s ease-in-out infinite alternate;
    pointer-events: none;
  }

  .auth-wrapper::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(201,169,110,0.07) 0%,
      transparent 70%
    );
    bottom: -150px;
    left: -100px;
    animation: floatGlow 9s ease-in-out infinite alternate-reverse;
    pointer-events: none;
  }

  @keyframes floatGlow {
    from {
      transform: translate(0, 0) scale(1);
    }

    to {
      transform: translate(-25px, 25px) scale(1.12);
    }
  }

  /* Card */

  .auth-card {
    width: 100%;
    max-width: 430px;
    padding: 46px 42px;
    background: rgba(22, 22, 22, 0.92);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    position: relative;
    z-index: 1;

    box-shadow:
      0 25px 80px rgba(0,0,0,0.55),
      inset 0 1px 0 rgba(255,255,255,0.03);

    backdrop-filter: blur(14px);

    animation: cardEnter 0.7s cubic-bezier(.22,1,.36,1);
  }

  @keyframes cardEnter {
    from {
      opacity: 0;
      transform: translateY(35px) scale(0.97);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* Logo */

  .auth-logo {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 600;
    color: #c9a96e;
    letter-spacing: -1px;
    margin-bottom: 8px;
  }

  .auth-tagline {
    font-size: 0.68rem;
    color: #666;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 38px;
  }

  /* Tabs */

  .auth-tabs {
    display: flex;
    margin-bottom: 30px;
    border-bottom: 1px solid #292929;
    position: relative;
  }

  .auth-tab {
    flex: 1;
    background: none;
    border: none;
    padding: 11px 10px;
    font-family: 'DM Mono', monospace;
    font-size: 0.76rem;
    color: #555;
    cursor: pointer;

    border-bottom: 2px solid transparent;
    margin-bottom: -1px;

    transition:
      color 0.25s ease,
      border-color 0.25s ease,
      transform 0.2s ease;
  }

  .auth-tab.active {
    color: #c9a96e;
    border-bottom-color: #c9a96e;
  }

  .auth-tab:hover:not(.active) {
    color: #999;
    transform: translateY(-1px);
  }

  /* Form */

  .form-group {
    margin-bottom: 18px;
  }

  .form-label {
    display: block;
    font-size: 0.67rem;
    color: #777;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .form-input {
    width: 100%;
    background: #191919;
    border: 1px solid #2c2c2c;
    border-radius: 9px;
    padding: 13px 14px;

    font-family: 'DM Mono', monospace;
    font-size: 0.82rem;
    color: #ededed;

    outline: none;

    transition:
      border-color 0.25s ease,
      box-shadow 0.25s ease,
      background 0.25s ease,
      transform 0.2s ease;
  }

  .form-input::placeholder {
    color: #414141;
  }

  .form-input:hover {
    border-color: #3a3a3a;
  }

  .form-input:focus {
    background: #1c1c1c;
    border-color: #c9a96e;

    box-shadow:
      0 0 0 3px rgba(201,169,110,0.08),
      0 8px 25px rgba(0,0,0,0.15);

    transform: translateY(-1px);
  }

  /* Button */

  .btn-auth {
    width: 100%;
    padding: 14px;

    margin-top: 8px;

    background: linear-gradient(
      135deg,
      #c9a96e,
      #b89458
    );

    color: #0d0d0d;

    border: none;
    border-radius: 9px;

    font-family: 'DM Mono', monospace;
    font-size: 0.82rem;
    font-weight: 500;

    cursor: pointer;
    letter-spacing: 0.5px;

    box-shadow:
      0 8px 25px rgba(201,169,110,0.12);

    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      filter 0.2s ease;
  }

  .btn-auth:hover {
    transform: translateY(-2px);
    filter: brightness(1.08);

    box-shadow:
      0 12px 30px rgba(201,169,110,0.20);
  }

  .btn-auth:active {
    transform: translateY(0);
  }

  .btn-auth:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  /* Footer text */

  .auth-divider {
    text-align: center;
    font-size: 0.68rem;
    color: #4d4d4d;
    margin-top: 22px;
    letter-spacing: 0.2px;
  }

  .auth-divider span {
    color: #c9a96e;
    cursor: pointer;
    text-decoration: none;

    transition:
      color 0.2s ease,
      opacity 0.2s ease;
  }

  .auth-divider span:hover {
    color: #e0c48d;
  }

  /* Small decorative line */

  .auth-decoration {
    width: 32px;
    height: 2px;
    background: #c9a96e;
    margin-bottom: 18px;
    opacity: 0.7;
  }

  /* Mobile */

  @media (max-width: 480px) {
    .auth-wrapper {
      padding: 16px;
    }

    .auth-card {
      padding: 38px 25px;
      border-radius: 16px;
    }

    .auth-logo {
      font-size: 1.8rem;
    }

    .auth-tagline {
      margin-bottom: 32px;
    }
  }
`;

function Auth({ onLogin }) {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function switchTab(t) {
    setTab(t);
    setEmail("");
    setPassword("");
  }

  async function handleSubmit() {
    if (!email || !password) {
      toast.error("Please complete all fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const endpoint =
        tab === "login"
          ? `${API_BASE}/login`
          : `${API_BASE}/register`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong.");
        return;
      }

      if (tab === "signup") {
        toast.success("Account created successfully.");
        switchTab("login");
      } else {
        toast.success("Welcome back. 👋");

        localStorage.setItem("token", data.ACCESS_token);

        setTimeout(() => {
          if (onLogin) {
            onLogin(data.ACCESS_token);
          }
        }, 800);
      }
    } catch {
      toast.error("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <>
      <style>{styles}</style>

      <Toaster
        position="top-center"
        theme="dark"
        richColors
        toastOptions={{
          style: {
            fontFamily: "DM Mono, monospace",
            fontSize: "0.82rem",
          },
          duration: 3000,
        }}
      />

      <div className="auth-wrapper">

        <div className="auth-card">

          <div className="auth-decoration"></div>

          <div className="auth-logo">
            Notes.
          </div>

          <div className="auth-tagline">
            Capture ideas. Keep them close.
          </div>

          <div className="auth-tabs">

            <button
              className={`auth-tab ${
                tab === "login" ? "active" : ""
              }`}
              onClick={() => switchTab("login")}
            >
              Login
            </button>

            <button
              className={`auth-tab ${
                tab === "signup" ? "active" : ""
              }`}
              onClick={() => switchTab("signup")}
            >
              Create Account
            </button>

          </div>

          <div className="form-group">

            <label className="form-label">
              Email address
            </label>

            <input
              className="form-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />

          </div>

          <div className="form-group">

            <label className="form-label">
              Password
            </label>

            <input
              className="form-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />

          </div>

          <button
            className="btn-auth"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Authenticating..."
              : tab === "login"
              ? "Continue to Notes"
              : "Create My Account"}
          </button>

          <div className="auth-divider">

            {tab === "login" ? (
              <>
                New to Notes?{" "}
                <span onClick={() => switchTab("signup")}>
                  Create an account
                </span>
              </>
            ) : (
              <>
                Already using Notes?{" "}
                <span onClick={() => switchTab("login")}>
                  Sign in
                </span>
              </>
            )}

          </div>

        </div>

      </div>
    </>
  );
}

export default Auth;
