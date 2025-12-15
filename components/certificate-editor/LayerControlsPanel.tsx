import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';

interface LayerControlsPanelProps {
  selectedObject: any;
  onDuplicate: () => void;
  onBringToFront: () => void;
  onSendToBack: () => void;
  onDelete: () => void;
}

export function LayerControlsPanel({ 
  selectedObject, 
  onDuplicate, 
  onBringToFront, 
  onSendToBack, 
  onDelete 
}: LayerControlsPanelProps) {
  if (!selectedObject) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-zinc-500">
          Select an element to see layer controls
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-zinc-900 mb-3">Layer Controls</h3>
      <div className="space-y-2">
        <Button
          onClick={onDuplicate}
          variant="outline"
          className="w-full justify-start h-10 border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300"
          size="sm"
        >
          <Copy className="h-4 w-4 text-zinc-700" />
          <span className="ml-2 text-sm">Duplicate</span>
        </Button>
        <Button
          onClick={onBringToFront}
          variant="outline"
          className="w-full justify-start h-10 border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300"
          size="sm"
        >
          <ArrowUp className="h-4 w-4 text-zinc-700" />
          <span className="ml-2 text-sm">Bring to Front</span>
        </Button>
        <Button
          onClick={onSendToBack}
          variant="outline"
          className="w-full justify-start h-10 border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300"
          size="sm"
        >
          <ArrowDown className="h-4 w-4 text-zinc-700" />
          <span className="ml-2 text-sm">Send to Back</span>
        </Button>
        <Button
          onClick={onDelete}
          variant="outline"
          className="w-full justify-start h-10 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
          size="sm"
        >
          <Trash2 className="h-4 w-4" />
          <span className="ml-2 text-sm">Delete</span>
        </Button>
      </div>
    </div>
  );
}
