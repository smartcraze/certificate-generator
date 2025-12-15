'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Download } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Template {
  id: string;
  name: string;
  fileUrl: string;
  configJSON: string;
}

export default function GenerateCertificate({ 
  params 
}: { 
  params: Promise<{ id: string; templateId: string }> 
}) {
  const { id: projectId, templateId } = use(params);
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    name: '',
    date: new Date().toLocaleDateString(),
  });

  useEffect(() => {
    fetchTemplate();
  }, [projectId, templateId]);

  const fetchTemplate = async () => {
    try {
      const response = await fetch(`/api/project/${projectId}/templates/${templateId}`);
      if (response.ok) {
        const data = await response.json();
        setTemplate(data.template);
      }
    } catch (error) {
      console.error('Error fetching template:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    // This would integrate with the certificate generation logic
    alert('Certificate generation will be implemented with fabric.js rendering');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Template not found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href={`/dashboard/project/${projectId}`}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Project
          </Button>
        </Link>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Generate Certificate</CardTitle>
              <CardDescription>
                Fill in the details to generate a certificate using {template.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Recipient Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <Button onClick={handleGenerate} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Generate Certificate
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Template Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={template.fileUrl}
                alt={template.name}
                className="w-full h-auto rounded-lg border"
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
