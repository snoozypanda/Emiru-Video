import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import emiruLogo from "@/assets/login/emirulogo1.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center px-4 py-12">
      {/* Camera background */}
      <div
        className="pointer-events-none absolute inset-0 scale-105 bg-[url('/login/login-bg-camera.png')] bg-cover bg-center"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85" aria-hidden />
      {/* Floor reflection hint */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-[420px] rounded-[30px] border border-white/15 bg-black/45 px-8 py-10 shadow-[0_25px_80px_rgba(0,0,0,0.65)] ring-1 ring-inset ring-white/[0.06] backdrop-blur-[20px] supports-[backdrop-filter]:bg-black/35">
        <div className="flex flex-col items-center text-center">
          <img
            src={emiruLogo}
            alt="Emiru Video"
            className="h-auto max-h-[102px] w-auto max-w-[340px] object-contain"
          />
          
        </div>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4">
          <label className="sr-only" htmlFor="login-username">
            Username or email
          </label>
          <input
            id="login-username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username or email"
            className="w-full rounded-xl border border-emiru-white/35 bg-black/20 px-5 py-3.5 text-sm font-medium text-emiru-white placeholder:text-emiru-white/45 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] outline-none transition-[box-shadow,border-color,background-color] focus:border-emiru-white/55 focus:bg-black/25 focus:ring-2 focus:ring-emiru-white/10 [-webkit-autofill]:shadow-[0_0_0px_1000px_rgba(0,0,0,0.22)_inset] [-webkit-autofill]:text-emiru-white [-webkit-autofill]:caret-emiru-white"
          />

          <div className="relative">
            <label className="sr-only" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-xl border border-emiru-white/35 bg-black/20 py-3.5 pl-5 pr-12 text-sm font-medium text-emiru-white placeholder:text-emiru-white/45 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] outline-none transition-[box-shadow,border-color,background-color] focus:border-emiru-white/55 focus:bg-black/25 focus:ring-2 focus:ring-emiru-white/10 [-webkit-autofill]:shadow-[0_0_0px_1000px_rgba(0,0,0,0.22)_inset] [-webkit-autofill]:text-emiru-white [-webkit-autofill]:caret-emiru-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-emiru-white/65 transition-colors hover:text-emiru-white"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-[18px] w-[18px]" strokeWidth={1.5} /> : <Eye className="h-[18px] w-[18px]" strokeWidth={1.5} />}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-emiru-white/70 transition-colors hover:text-emiru-white"
            >
              Forget your password
            </button>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-emiru-yellow py-3.5 text-center text-sm font-bold uppercase tracking-[0.16em] text-emiru-black shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-[transform,opacity,box-shadow] hover:opacity-95 hover:shadow-[0_14px_34px_rgba(0,0,0,0.42)] active:scale-[0.99]"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
