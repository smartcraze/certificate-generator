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
  return (
    <Card className="shadow-lg">
      <CardContent className="p-4 space-y-2">
        <h3 className="font-semibold text-sm mb-3 text-primary">Layer Controls</h3>
        <Button
          onClick={onDuplicate}
          variant="outline"
          size="sm"
          className="w-full justify-start"
          disabled={!selectedObject}
        >
          <Copy className="h-4 w-4 mr-2" />
          Duplicate
        </Button>
        <Button
          onClick={onBringToFront}
          variant="outline"
          size="sm"
          className="w-full justify-start"
          disabled={!selectedObject}
        >
          <ArrowUp className="h-4 w-4 mr-2" />
          Bring to Front
        </Button>
        <Button
          onClick={onSendToBack}
          variant="outline"
          size="sm"
          className="w-full justify-start"
          disabled={!selectedObject}
        >
          <ArrowDown className="h-4 w-4 mr-2" />
          Send to Back
        </Button>
        <Button
          onClick={onDelete}
          variant="outline"
          size="sm"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/5"
          disabled={!selectedObject}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardContent>
    </Card>
  );
}
