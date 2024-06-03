"use client";
// components/LoginForm.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { setUserCookie } from "@/lib/auth";
import toast from "react-hot-toast";
import { Button } from "@nextui-org/button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Loading from "@/app/ui/Loading/loading-overlay";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (checkbox) {
      localStorage.setItem("email", email);
    }
    try {
      await setUserCookie({ email, password });
      toast.success("LogIn successfully");
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  useMemo(() => {
    setLoading(true);
    if (localStorage.getItem("email")) {
      setEmail(localStorage.getItem("email") as string);
      setLoading(false);
    }
  }, []);

  return (
    <div className="h-[80vh] flex">
      {loading && <Loading />}
      <form
        onSubmit={handleSubmit}
        className="w-1/2 flex gap-6 flex-col justify-center items-center"
      >
        <h2 className="text-[32px]">TicketFlicks</h2>
        {error && (
          <div className="w-[450px] h-12 bg-rose-200 border border-red-600 p-2 rounded-lg">
            <p style={{ color: "red" }}>{error + "!"}</p>
          </div>
        )}
        <div>
          <p>Email:</p>
          <input
            className="bg-transparent border border-white rounded-md px-3 py-2 w-[450px]"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <p>Password:</p>
          <input
            className="bg-transparent border border-white rounded-md px-3 py-2 w-[450px]"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-2 justify-start w-[450px]">
          <input
            type="checkbox"
            checked={checkbox}
            id="checkbox"
            onChange={() => setCheckbox(!checkbox)}
          />
          <p>Remember me?</p>
        </div>
        <Button type="submit" className="rounded-lg w-[450px]">
          Login <ArrowRightIcon className="w-6" />
        </Button>
        <p>
          Don't have an account? <button>Sign up!</button>
        </p>
      </form>
      <div className="w-1/2"></div>
    </div>
  );
};

export default LoginForm;
