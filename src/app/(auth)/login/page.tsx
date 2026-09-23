"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!email || !password) return;

    const success = await login(email, password);
    if (success) {
      router.push("/today");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-appBg relative overflow-hidden font-sans">
      {/* Background shape */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-[40%] bg-surface z-0 hidden lg:block opacity-50" 
        style={{ clipPath: "polygon(100% 0, 0 50%, 100% 100%)" }} 
      />

      {/* Left Column */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative z-10">
        <div>
          <span className="font-bold text-[28px] tracking-tight text-ink">
            journal.
          </span>
        </div>
        
        <div className="max-w-[480px] -mt-20">
          <h1 className="text-[52px] font-bold leading-[1.1] text-ink tracking-tight">
            Clear your mind and even <br/>
            <span className="bg-accent text-[#0a1a10] px-2 py-0 inline-block mt-2">clearer thoughts</span>
          </h1>
          <p className="mt-6 text-[18px] text-ink2 font-medium">
            Made for deep thinkers everywhere.
          </p>
          <div className="mt-8">
            <button className="flex items-center gap-2 px-5 py-2 rounded-md border border-line text-ink font-medium hover:bg-surface2 transition-colors">
              Learn More
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        <div />
      </div>

      {/* Right Column */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 lg:p-14 relative z-10">
        {/* Mobile Logo */}
        <div className="absolute top-8 left-8 lg:hidden">
          <span className="font-bold text-[24px] tracking-tight text-ink">
            journal.
          </span>
        </div>

        <div className="w-full max-w-[440px] bg-surface border border-line rounded-xl shadow-2xl p-10">
          <h2 className="text-center text-[26px] font-bold text-ink mb-8">Log in</h2>
          
          <button className="w-full flex items-center justify-center gap-3 h-[46px] rounded-md border border-line hover:bg-surface2 transition-colors text-[14px] text-ink2 font-medium mb-8">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Log In Using Google
          </button>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-line"></div>
            <span className="text-[12px] text-ink3">or</span>
            <div className="flex-1 h-px bg-line"></div>
          </div>
          
          <p className="text-center text-[12px] text-ink3 mb-6">Log in using email address</p>
          
          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="relative border border-line rounded-md px-3 py-1.5 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all">
              <label className="block text-[10px] text-ink3 font-medium">Email address</label>
              <input 
                type="email" 
                placeholder="jdoe@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-ink3 mt-0.5" 
              />
            </div>
            
            <div className="relative border border-line rounded-md px-3 py-1.5 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all">
              <label className="block text-[10px] text-ink3 font-medium">Password</label>
              <div className="flex items-center">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-ink3 mt-0.5" 
                />
                {showPassword ? (
                  <EyeOff size={16} className="text-ink3 cursor-pointer hover:text-ink2" onClick={() => setShowPassword(false)} />
                ) : (
                  <Eye size={16} className="text-ink3 cursor-pointer hover:text-ink2" onClick={() => setShowPassword(true)} />
                )}
              </div>
            </div>
            
            <div className="text-right">
              <Link href="#" className="text-[12px] text-accent hover:underline font-medium">Forgot password?</Link>
            </div>
            
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full h-[46px] rounded-md bg-accent text-[#0a1a10] text-[14px] font-medium hover:bg-accent/90 transition-colors mt-2 disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>
          
          <p className="text-center text-[13px] text-ink2">
            Need to create an account? <Link href="/start" className="text-accent hover:underline font-medium">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
