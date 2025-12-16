'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Fish, Phone, ArrowRight, Loader2, CheckCircle, Zap, User, Waves, Sparkles } from 'lucide-react';
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
    const userData = {
      id: 'demo_user',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      email: 'priya@demo.com',
      isLoggedIn: true,
    };
    localStorage.setItem('freshcatch_user', JSON.stringify(userData));
    document.cookie = `freshcatch_user=${JSON.stringify(userData)}; path=/; max-age=${60 * 60 * 24 * 7}`;
    setTimeout(() => {
      router.push('/home');
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
      const userData = {
        id: 'user_' + phone,
        name: 'Customer',
        phone: '+91 ' + phone,
        isLoggedIn: true,
      };
      localStorage.setItem('freshcatch_user', JSON.stringify(userData));
      document.cookie = `freshcatch_user=${JSON.stringify(userData)}; path=/; max-age=${60 * 60 * 24 * 7}`;
      setTimeout(() => {
        router.push('/home');
      }, 1500);
    }
  };

  const handleAdminLogin = () => {
    setIsLoading(true);
    const adminData = {
      id: 'admin_user',
      name: 'Admin User',
      role: 'super_admin',
      isLoggedIn: true,
    };
    localStorage.setItem('freshcatch_admin', JSON.stringify(adminData));
    document.cookie = `freshcatch_user=${JSON.stringify(adminData)}; path=/; max-age=${60 * 60 * 24 * 7}`;
    setTimeout(() => {
      router.push('/admin/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 p-12 flex-col justify-between overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0 opacity-20">
          <svg viewBox="0 0 1440 320" className="w-full">
            <path fill="white" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
              <Fish className="h-8 w-8 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">{APP_NAME}</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-6 text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Trusted by 10,000+ Customers</span>
          </div>
          <h1 className="text-5xl font-bold leading-tight">
            Fresh Fish,
            <br />
            <span className="text-white/90">Delivered to Your Door</span>
          </h1>
          <p className="text-xl text-white/80 max-w-md">
            Experience the finest seafood delivery service in Chennai. From ocean to table in hours.
          </p>

          {/* Features */}
          <div className="space-y-3 pt-4">
            {[
              'Premium quality from local fishermen',
              'Sunrise delivery as early as 6 AM',
              'Free delivery on orders above ₹300',
              'Multiple cleaning options available',
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-8 text-white/60 text-sm">
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Support</Link>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <Fish className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {APP_NAME}
              </span>
            </Link>
          </div>

          <Card className="border-2 shadow-2xl shadow-blue-500/10">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">
                  {step === 'phone' ? 'Welcome Back!' : 'Verify OTP'}
                </h2>
                <p className="text-muted-foreground">
                  {step === 'phone'
                    ? 'Enter your mobile number to continue'
                    : `Enter the 6-digit code sent to +91 ${phone}`}
                </p>
              </div>

              {/* Quick Demo Access */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-900">Quick Demo Access</span>
                  <Badge variant="secondary" className="text-xs ml-auto">For Testing</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={handleDemoLogin}
                    disabled={isLoading}
                    className="h-11 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/30"
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
                    className="h-11 border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
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
              </div>

              <div className="relative mb-6">
                <Separator />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-muted-foreground">
                  or continue with mobile
                </span>
              </div>

              {step === 'phone' ? (
                <>
                  {/* Phone Input */}
                  <div className="space-y-2 mb-6">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4 text-blue-600" />
                      Mobile Number
                    </label>
                    <div className="flex">
                      <div className="flex items-center px-4 border-2 border-r-0 rounded-l-xl bg-slate-50 text-muted-foreground font-semibold">
                        +91
                      </div>
                      <Input
                        type="tel"
                        placeholder="Enter 10-digit number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="rounded-l-none border-2 h-12 text-lg"
                        maxLength={10}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Waves className="h-3 w-3" />
                      Demo: Use any 10-digit number, OTP is 123456
                    </p>
                  </div>

                  <Button
                    className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/30"
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

                  <div className="relative my-6">
                    <Separator />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-muted-foreground">
                      or sign in with
                    </span>
                  </div>

                  {/* Social Login */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <Button variant="outline" className="h-11 border-2" onClick={handleDemoLogin}>
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
                    <Button variant="outline" className="h-11 border-2" onClick={handleDemoLogin}>
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
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-center gap-3">
                      {otp.map((digit, index) => (
                        <Input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOTPChange(index, e.target.value)}
                          className="w-14 h-14 text-center text-2xl font-bold border-2 focus:border-blue-500"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-center text-muted-foreground">
                      Demo: Enter any 6 digits (e.g., 123456)
                    </p>
                  </div>

                  <Button
                    className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/30 mb-4"
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

                  <div className="text-center space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Didn&apos;t receive code?{' '}
                      <Button variant="link" className="p-0 h-auto text-blue-600 font-semibold">
                        Resend OTP
                      </Button>
                    </p>
                    <Button
                      variant="ghost"
                      className="text-sm"
                      onClick={() => setStep('phone')}
                    >
                      ← Change Phone Number
                    </Button>
                  </div>
                </>
              )}

              <p className="text-center text-sm text-muted-foreground mt-6">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-blue-600 font-semibold hover:underline">
                  Register Now
                </Link>
              </p>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-foreground">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
