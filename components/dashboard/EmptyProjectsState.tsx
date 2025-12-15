import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Award } from 'lucide-react';

export function EmptyProjectsState() {
  return (
    <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
      <CardContent className="flex flex-col items-center justify-center py-20">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl"></div>
          <Award className="h-20 w-20 text-primary relative z-10" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">No projects yet</h3>
        <p className="text-muted-foreground text-center mb-8 max-w-md leading-relaxed">
          Get started by creating your first project. You'll be able to upload templates
          and generate professional certificates in minutes.
        </p>
        <Link href="/dashboard/project/new">
          <Button size="lg" className="shadow-lg">
            <Plus className="mr-2 h-5 w-5" />
            Create Your First Project
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
