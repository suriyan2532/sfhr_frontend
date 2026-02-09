'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Lock, Mail, Hexagon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      // Here we would handle the login logic
      // For now, prompt user it's a demo
      alert("Login logic would execute here. Redirecting to employee dashboard...");
      window.location.href = "/employees"; // Redirect to employees for demo
    }, 1500);
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      {/* Left Side - Hero/Branding */}
      <div className="hidden bg-zinc-900 lg:flex flex-col justify-between p-10 text-white relative overflow-hidden">
         {/* Abstract geometric shapes for premium feel */}
         <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute -top-20 -left-20 w-96 h-96 bg-white rounded-full blur-3xl"
         />
         <motion.div 
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10 flex items-center gap-2 text-xl font-bold"
         >
           <Hexagon className="w-8 h-8 text-blue-500" />
           <span>Safari HR</span>
         </motion.div>

         <div className="z-10">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3, duration: 0.8 }}
             className="text-4xl font-bold leading-tight tracking-tight"
           >
             Manage your workforce <br/> with confidence.
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5, duration: 0.8 }}
             className="mt-4 text-zinc-400 text-lg"
           >
             Streamline HR operations, track attendance, and manage employee data all in one place.
           </motion.p>
         </div>

         <div className="z-10 text-sm text-zinc-500">
           &copy; 2026 Safari HR Inc.
         </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center py-12">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto grid w-[350px] gap-6"
        >
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    className="pl-9"
                    required
                  />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type="password" className="pl-9" required />
              </div>
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Signing in..." : "Login"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
