import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, Settings, TrendingUp } from 'lucide-react';

interface Project {
  id: string;
  ProjectName: string;
  description: string | null;
  createdAt: string;
  _count?: {
    templates: number;
    generatedCertificates: number;
  };
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50">
      <CardHeader className="space-y-2">
        <CardTitle className="flex items-center justify-between">
          <span className="truncate text-xl">{project.ProjectName}</span>
        </CardTitle>
        <CardDescription className="line-clamp-2 min-h-10">
          {project.description || 'No description provided'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-xs">Templates</span>
            </div>
            <p className="text-2xl font-bold text-primary">
              {project._count?.templates || 0}
            </p>
          </div>
          <div className="bg-green-500/5 p-3 rounded-lg border border-green-500/10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-xs">Generated</span>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {project._count?.generatedCertificates || 0}
            </p>
          </div>
        </div>
        <div className="flex items-center mt-4 text-xs text-muted-foreground">
          <Calendar className="mr-1.5 h-3.5 w-3.5" />
          <span>Created {new Date(project.createdAt).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          })}</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 bg-muted/30 group-hover:bg-muted/50 transition-colors">
        <Link href={`/dashboard/project/${project.id}`} className="flex-1">
          <Button variant="default" className="w-full shadow-sm">
            Open Project
          </Button>
        </Link>
        <Link href={`/dashboard/project/${project.id}/settings`}>
          <Button variant="outline" size="icon" className="shadow-sm">
            <Settings className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
