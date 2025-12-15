'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, FileText, Pencil, Trash2, FileSignature } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Template {
  id: string;
  name: string;
  fileUrl: string;
  configJSON: string;
}

interface Project {
  id: string;
  ProjectName: string;
  description: string | null;
  createdAt: string;
}

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchProjectData();
    }
  }, [status, id]);

  const fetchProjectData = async () => {
    try {
      const [projectRes, templatesRes] = await Promise.all([
        fetch(`/api/project/${id}`),
        fetch(`/api/project/${id}/templates`)
      ]);

      if (projectRes.ok) {
        const projectData = await projectRes.json();
        setProject(projectData.project);
      }

      if (templatesRes.ok) {
        const templatesData = await templatesRes.json();
        setTemplates(templatesData.templates || []);
      }
    } catch (error) {
      console.error('Error fetching project data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <p className="text-xl text-muted-foreground">Project not found</p>
              <Link href="/dashboard" className="mt-4">
                <Button>Back to Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{project.ProjectName}</h1>
          {project.description && (
            <p className="text-muted-foreground mt-2">{project.description}</p>
          )}
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Certificate Templates</h2>
            <Link href={`/dashboard/project/${id}/template/new`}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Template
              </Button>
            </Link>
          </div>

          {templates.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No templates yet</h3>
                <p className="text-muted-foreground text-center mb-6 max-w-md">
                  Create your first certificate template by uploading a design or using a prebuilt template.
                </p>
                <Link href={`/dashboard/project/${id}/template/new`}>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Template
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="truncate">{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {template.fileUrl && (
                      <div className="aspect-[1.414/1] bg-muted rounded-md overflow-hidden">
                        <img
                          src={template.fileUrl}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Link href={`/dashboard/project/${id}/template/${template.id}/edit`} className="flex-1">
                        <Button variant="default" className="w-full" size="sm">
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </Link>
                      <Link href={`/dashboard/project/${id}/template/${template.id}/generate`} className="flex-1">
                        <Button variant="outline" className="w-full" size="sm">
                          <FileSignature className="mr-2 h-4 w-4" />
                          Generate
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
