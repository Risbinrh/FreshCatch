'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Fish,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle,
  MapPin,
  User,
  Phone,
  Mail,
  Gift,
} from 'lucide-react';
import Link from 'next/link';
import { APP_NAME, LANGUAGES } from '@/constants';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    otp: '',
    name: '',
    email: '',
    altPhone: '',
    address: '',
    landmark: '',
    pincode: '',
    language: 'en',
    referralCode: '',
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (step === 1 && formData.phone.length === 10) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep(2);
      }, 1000);
    } else if (step === 2 && formData.otp.length === 6) {
      setStep(3);
    } else if (step === 3 && formData.name) {
      setStep(4);
    } else if (step === 4) {
      setIsLoading(true);
      // Complete registration and set auth
      const userData = {
        id: 'user_' + formData.phone,
        name: formData.name,
        phone: '+91 ' + formData.phone,
        email: formData.email,
        isLoggedIn: true,
      };
      localStorage.setItem('freshcatch_user', JSON.stringify(userData));
      // Set cookie for middleware
      document.cookie = `freshcatch_user=${encodeURIComponent(JSON.stringify(userData))}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
              <Fish className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-primary">{APP_NAME}</span>
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium ${s <= step
                  ? 'bg-primary text-white'
                  : 'bg-slate-200 text-slate-500'
                  }`}
              >
                {s < step ? <CheckCircle className="h-5 w-5" /> : s}
              </div>
            ))}
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {step === 1 && 'Create Account'}
              {step === 2 && 'Verify OTP'}
              {step === 3 && 'Your Details'}
              {step === 4 && 'Delivery Address'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Enter your mobile number to get started'}
              {step === 2 && `Enter the 6-digit OTP sent to +91 ${formData.phone}`}
              {step === 3 && 'Tell us a bit about yourself'}
              {step === 4 && 'Where should we deliver your fresh fish?'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step 1: Phone */}
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Mobile Number
                  </label>
                  <div className="flex">
                    <div className="flex items-center px-3 border border-r-0 rounded-l-lg bg-slate-50 text-muted-foreground">
                      +91
                    </div>
                    <Input
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value.replace(/\D/g, '').slice(0, 10),
                        })
                      }
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Gift className="h-4 w-4" />
                    Referral Code (Optional)
                  </label>
                  <Input
                    placeholder="Enter referral code"
                    value={formData.referralCode}
                    onChange={(e) =>
                      setFormData({ ...formData, referralCode: e.target.value.toUpperCase() })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Get ₹50 off on your first order with a referral code!
                  </p>
                </div>
              </>
            )}

            {/* Step 2: OTP */}
            {step === 2 && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-center block">Enter OTP</label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter 6-digit OTP"
                    value={formData.otp}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        otp: e.target.value.replace(/\D/g, '').slice(0, 6),
                      })
                    }
                    className="text-center text-2xl tracking-widest"
                    maxLength={6}
                  />
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  Didn&apos;t receive OTP?{' '}
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Resend
                  </Button>
                </p>
              </>
            )}

            {/* Step 3: Personal Details */}
            {step === 3 && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name *
                  </label>
                  <Input
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email (Optional)
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Alternative Mobile (Optional)</label>
                  <div className="flex">
                    <div className="flex items-center px-3 border border-r-0 rounded-l-lg bg-slate-50 text-muted-foreground">
                      +91
                    </div>
                    <Input
                      type="tel"
                      placeholder="Alternative number"
                      value={formData.altPhone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          altPhone: e.target.value.replace(/\D/g, '').slice(0, 10),
                        })
                      }
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Preferred Language</label>
                  <div className="flex gap-2">
                    {Object.entries(LANGUAGES).map(([key, label]) => (
                      <Button
                        key={key}
                        type="button"
                        variant={formData.language === key ? 'default' : 'outline'}
                        className="flex-1"
                        onClick={() => setFormData({ ...formData, language: key })}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Step 4: Address */}
            {step === 4 && (
              <>
                <div className="p-3 bg-primary/5 rounded-lg flex items-center gap-3 mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Use Current Location</p>
                    <p className="text-xs text-muted-foreground">Detect your location automatically</p>
                  </div>
                  <Button size="sm" variant="outline" className="ml-auto">
                    Detect
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Address *</label>
                  <Input
                    placeholder="House/Flat No., Street, Area"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Landmark</label>
                    <Input
                      placeholder="Near..."
                      value={formData.landmark}
                      onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pincode *</label>
                    <Input
                      placeholder="600001"
                      value={formData.pincode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pincode: e.target.value.replace(/\D/g, '').slice(0, 6),
                        })
                      }
                    />
                  </div>
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-4">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : step === totalSteps ? (
                  <>
                    Complete Registration
                    <CheckCircle className="ml-2 h-5 w-5" />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>

            {step === 1 && (
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="text-primary font-medium hover:underline">
                  Login
                </Link>
              </p>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By registering, you agree to our{' '}
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
