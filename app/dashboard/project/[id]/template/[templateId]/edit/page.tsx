'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CertificateEditor from '@/components/CertificateEditor';

interface Template {
  id: string;
  name: string;
  fileUrl: string;
  configJSON: string;
}

export default function EditTemplate({ 
  params 
}: { 
  params: Promise<{ id: string; templateId: string }> 
}) {
  const { id: projectId, templateId } = use(params);
  const router = useRouter();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleSave = async (config: string, preview: string) => {
    try {
      const response = await fetch(`/api/project/${projectId}/templates/${templateId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          configJSON: config,
          fileUrl: preview, // Update with the preview if needed
        }),
      });

      if (response.ok) {
        alert('Template saved successfully!');
      } else {
        throw new Error('Failed to save template');
      }
    } catch (error) {
      console.error('Error saving template:', error);
      throw error;
    }
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
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link href={`/dashboard/project/${projectId}`}>
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Project
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{template.name}</h1>
        </div>

        <CertificateEditor
          templateUrl={template.fileUrl}
          initialConfig={template.configJSON}
          onSave={handleSave}
        />
      </main>
    </div>
  );
}
