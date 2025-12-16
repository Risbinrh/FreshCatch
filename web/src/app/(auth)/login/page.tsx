'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Fish, Phone, ArrowRight, Loader2, CheckCircle, Zap, User } from 'lucide-react';
import Link from 'next/link';
import { APP_NAME } from '@/constants';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  // Demo login - instant access
  const handleDemoLogin = () => {
    setIsLoading(true);
    // Store demo user in localStorage
    localStorage.setItem('freshcatch_user', JSON.stringify({
      id: 'demo_user',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      email: 'priya@demo.com',
      isLoggedIn: true,
    }));
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  const handleSendOTP = () => {
    if (phone.length === 10) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep('otp');
      }, 1500);
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerifyOTP = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      setIsLoading(true);
      // Store user in localStorage
      localStorage.setItem('freshcatch_user', JSON.stringify({
        id: 'user_' + phone,
        name: 'Customer',
        phone: '+91 ' + phone,
        isLoggedIn: true,
      }));
      setTimeout(() => {
        router.push('/');
      }, 1500);
    }
  };

  // Admin demo login
  const handleAdminLogin = () => {
    setIsLoading(true);
    localStorage.setItem('freshcatch_admin', JSON.stringify({
      id: 'admin_user',
      name: 'Admin User',
      role: 'super_admin',
      isLoggedIn: true,
    }));
    setTimeout(() => {
      router.push('/admin/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
              <Fish className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-primary">{APP_NAME}</span>
          </Link>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back!</CardTitle>
            <CardDescription>
              {step === 'phone'
                ? 'Enter your mobile number to continue'
                : `We've sent a 6-digit OTP to +91 ${phone}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Demo Login Buttons */}
            <div className="p-4 bg-gradient-to-r from-primary/10 to-cyan-100 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Quick Demo Access</span>
                <Badge variant="secondary" className="text-xs">For Demo</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                  className="h-10 bg-primary hover:bg-primary/90"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <User className="h-4 w-4 mr-2" />
                      Customer
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleAdminLogin}
                  disabled={isLoading}
                  variant="outline"
                  className="h-10 border-primary text-primary hover:bg-primary hover:text-white"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Admin
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Click to instantly login as demo user
              </p>
            </div>

            <div className="relative">
              <Separator />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-muted-foreground">
                or login with OTP
              </span>
            </div>

            {step === 'phone' ? (
              <>
                {/* Phone Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mobile Number</label>
                  <div className="flex">
                    <div className="flex items-center px-3 border border-r-0 rounded-l-lg bg-slate-50 text-muted-foreground">
                      +91
                    </div>
                    <Input
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="rounded-l-none"
                      maxLength={10}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Demo: Use any 10-digit number, OTP is 123456
                  </p>
                </div>

                <Button
                  className="w-full h-12"
                  onClick={handleSendOTP}
                  disabled={phone.length !== 10 || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                <div className="relative">
                  <Separator />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-muted-foreground">
                    or continue with
                  </span>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12" onClick={handleDemoLogin}>
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="h-12" onClick={handleDemoLogin}>
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* OTP Input */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-center block">Enter OTP</label>
                  <div className="flex justify-center gap-2">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOTPChange(index, e.target.value)}
                        className="w-12 h-12 text-center text-xl font-bold"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Demo: Enter any 6 digits (e.g., 123456)
                  </p>
                </div>

                <Button
                  className="w-full h-12"
                  onClick={handleVerifyOTP}
                  disabled={otp.join('').length !== 6 || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Verify & Login
                      <CheckCircle className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Didn&apos;t receive OTP?{' '}
                    <Button variant="link" className="p-0 h-auto text-primary">
                      Resend OTP
                    </Button>
                  </p>
                </div>

                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setStep('phone')}
                >
                  Change Phone Number
                </Button>
              </>
            )}

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-primary font-medium hover:underline">
                Register Now
              </Link>
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
