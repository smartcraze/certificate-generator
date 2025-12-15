'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Upload, Image as ImageIcon } from 'lucide-react';
import { Navbar } from '@/components/layout';
import { useDropzone } from 'react-dropzone';

const PREBUILT_TEMPLATES = [
  {
    id: 'classic-1',
    name: 'Classic Certificate',
    thumbnail: '/templates/classic-certificate.svg',
    url: '/templates/classic-certificate.svg'
  },
  {
    id: 'modern-1',
    name: 'Modern Achievement',
    thumbnail: '/templates/modern-achievement.svg',
    url: '/templates/modern-achievement.svg'
  },
  {
    id: 'elegant-1',
    name: 'Elegant Award',
    thumbnail: '/templates/elegant-award.svg',
    url: '/templates/elegant-award.svg'
  },
];

export default function NewTemplate({ params }: { params: Promise<{ id: string }> }) {
  const { id: projectId } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>('');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setUploadedFile(file);
        setUploadedFileUrl(URL.createObjectURL(file));
        setSelectedTemplate(null);
      }
    }
  });

  const handleSelectPrebuilt = (template: typeof PREBUILT_TEMPLATES[0]) => {
    setSelectedTemplate(template.id);
    setUploadedFileUrl(template.url);
    setUploadedFile(null);
    if (!templateName) {
      setTemplateName(template.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!templateName || !uploadedFileUrl) {
      toast.error('Please provide a template name and select a template');
      return;
    }

    setLoading(true);

    try {
      // In a real app, you would upload the file to a storage service here
      // For now, we'll use the URL directly
      const response = await fetch(`/api/project/${projectId}/templates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: templateName,
          fileUrl: uploadedFileUrl,
          configJSON: JSON.stringify({
            fields: []
          }),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        const templateId = result.data?.template?.id;
        if (templateId) {
          toast.success(result.message || 'Template created successfully!');
          router.push(`/dashboard/project/${projectId}/template/${templateId}/edit`);
        } else {
          toast.error('Template created but ID not found');
        }
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to create template');
      }
    } catch (error) {
      console.error('Error creating template:', error);
      toast.error('Failed to create template');
    } finally {
      setLoading(false);
    }
  };

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

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Create Certificate Template</CardTitle>
              <CardDescription>
                Upload your own design or choose from our prebuilt templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Template Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Completion Certificate"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-4">
                <Label>Upload Custom Template</Label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  {uploadedFile ? (
                    <div>
                      <p className="text-sm font-medium mb-2">{uploadedFile.name}</p>
                      <p className="text-xs text-muted-foreground">Click or drag to replace</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-medium mb-2">
                        Drag & drop your certificate template here
                      </p>
                      <p className="text-xs text-muted-foreground">
                        or click to browse (PNG, JPG, SVG)
                      </p>
                    </div>
                  )}
                </div>

                {uploadedFileUrl && uploadedFile && (
                  <div className="mt-4">
                    <img
                      src={uploadedFileUrl}
                      alt="Preview"
                      className="max-w-full h-auto rounded-lg border"
                    />
                  </div>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or choose a prebuilt template
                  </span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {PREBUILT_TEMPLATES.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? 'ring-2 ring-primary'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => handleSelectPrebuilt(template)}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-[1.414/1] bg-muted rounded-md overflow-hidden mb-3">
                        <img
                          src={template.thumbnail}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm font-medium text-center">{template.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={loading || !templateName || !uploadedFileUrl}
              className="flex-1"
            >
              {loading ? 'Creating...' : 'Continue to Editor'}
            </Button>
            <Link href={`/dashboard/project/${projectId}`}>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
