'use client';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Award, FileText, Zap, Shield, Sparkles, CheckCircle } from 'lucide-react';
import { Navbar } from '@/components/layout';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push('/dashboard');
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-primary/5">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-primary/5">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-primary/5">
      <Navbar />
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-primary font-medium">Professional Certificate Platform</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Generate Certificates
              <span className="block bg-linear-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent mt-2">
                At Scale
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Create, customize, and distribute beautiful certificates with QR verification.
              Perfect for events, courses, and achievements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/auth/signin">
                <Button size="lg" className="gap-2 shadow-xl hover:shadow-2xl transition-shadow text-lg px-8 py-6">
                  Get Started Free
                  <Award className="h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 shadow-lg">
                View Demo
              </Button>
            </div>
            <div className="pt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Free templates included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Unlimited projects</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features that make certificate generation simple and professional
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-lg">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">Custom Templates</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Upload your own certificate designs or use our professional prebuilt templates. 
                  Customize with dynamic fields and real-time editing.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center shadow-lg">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold">Bulk Generation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Generate hundreds or thousands of certificates in minutes with CSV uploads.
                  Automated processing with progress tracking.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-linear-to-br from-green-500/20 to-green-500/5 flex items-center justify-center shadow-lg">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold">QR Verification</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Each certificate includes a unique QR code for instant authenticity verification.
                  Public verification portal included.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-8 pb-8 space-y-4">
              <h2 className="text-3xl font-bold">Ready to get started?</h2>
              <p className="text-muted-foreground">
                Sign in with Google to create your first certificate project
              </p>
              <Link href="/auth/signin">
                <Button size="lg" className="gap-2">
                  Sign In Now
                  <Award className="h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
