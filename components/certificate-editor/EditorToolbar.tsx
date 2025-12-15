import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Save } from 'lucide-react';

interface EditorToolbarProps {
  onDownloadPreview: () => void;
  onSave: () => void;
  saving: boolean;
}

export function EditorToolbar({ onDownloadPreview, onSave, saving }: EditorToolbarProps) {
  return (
    <Card className="shadow-lg">
      <CardContent className="flex flex-wrap gap-2 p-4 justify-between items-center">
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <span className="hidden sm:inline">💡 Click to select • Double-click text to edit • Drag to move</span>
          <span className="sm:hidden">💡 Click & Edit</span>
        </div>
        <div className="flex gap-2">
          <Button onClick={onDownloadPreview} variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Preview</span>
          </Button>
          <Button onClick={onSave} size="sm" disabled={saving} className="gap-2 shadow-md">
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
