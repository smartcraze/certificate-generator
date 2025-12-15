'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { toast } from 'sonner';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ArrowLeft, Save, Trash2, AlertTriangle } from 'lucide-react';
import { Navbar } from '@/components/layout';

interface Project {
  id: string;
  ProjectName: string;
  description: string | null;
  createdAt: string;
}

export default function ProjectSettings({ params }: { params: Promise<{ id: string }> }) {
  const { id: projectId } = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchProject();
    }
  }, [status, projectId]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/project/${projectId}`);
      if (response.ok) {
        const result = await response.json();
        const projectData = result.data?.project;
        if (projectData) {
          setProject(projectData);
          setFormData({
            name: projectData.ProjectName,
            description: projectData.description || ''
          });
        }
      } else {
        const error = await response.json();
        console.error('Error:', error.message);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/project/${projectId}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectName: formData.name,
          description: formData.description,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || 'Project updated successfully!');
        fetchProject();
      } else {
        toast.error(result.message || 'Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (confirmText !== project?.ProjectName) {
      toast.error('Project name does not match');
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(`/api/project/${projectId}/delete`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || 'Project deleted successfully!');
        router.push('/dashboard');
      } else {
        toast.error(result.message || 'Failed to delete project');
        setDeleting(false);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
      setDeleting(false);
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
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Link href={`/dashboard/project/${projectId}`}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Project
          </Button>
        </Link>

        <div className="space-y-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Update your project information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <Button type="submit" disabled={saving}>
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                <div className="space-y-1">
                  <h4 className="font-semibold text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Delete Project
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete this project and all its templates and certificates.
                    This action cannot be undone.
                  </p>
                </div>
                <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="ml-4">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-5 w-5" />
                        Delete Project
                      </DialogTitle>
                      <DialogDescription>
                        This will permanently delete <strong>{project.ProjectName}</strong> and all of its certificate templates, generated certificates, datasets and records. This action cannot be undone!
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 pt-4">
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Certificate templates</li>
                        <li>Generated certificates</li>
                        <li>Datasets and records</li>
                      </ul>
                      <div className="font-semibold text-destructive text-sm">
                        ⚠️ This action cannot be undone!
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="confirm">
                          Type <span className="font-mono font-bold">{project.ProjectName}</span> to confirm
                        </Label>
                        <Input
                          id="confirm"
                          value={confirmText}
                          onChange={(e) => setConfirmText(e.target.value)}
                          placeholder="Enter project name"
                          className="font-mono"
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setDeleteDialogOpen(false);
                          setConfirmText('');
                        }}
                        disabled={deleting}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={confirmText !== project.ProjectName || deleting}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {deleting ? 'Deleting...' : 'Delete Project'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
