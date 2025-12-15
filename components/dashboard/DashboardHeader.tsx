import { Sparkles } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-muted-foreground mt-2 flex items-center gap-2">
        <Sparkles className="h-4 w-4" />
        {subtitle}
      </p>
    </div>
  );
}
