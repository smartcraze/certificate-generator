'use client';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Award, FileText, Zap, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Generate Certificates
              <span className="block text-primary mt-2">At Scale</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Create, customize, and distribute beautiful certificates with QR verification.
              Perfect for events, courses, and achievements.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link href="/auth/signin">
                <Button size="lg" className="gap-2">
                  Get Started
                  <Award className="h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Custom Templates</h3>
                <p className="text-muted-foreground">
                  Upload your own certificate designs and customize them with dynamic fields
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Bulk Generation</h3>
                <p className="text-muted-foreground">
                  Generate hundreds or thousands of certificates in minutes with CSV uploads
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">QR Verification</h3>
                <p className="text-muted-foreground">
                  Each certificate includes a unique QR code for instant authenticity verification
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
