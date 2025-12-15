import { Card, CardContent } from '@/components/ui/card';
import { Type } from 'lucide-react';
import { TextPropertiesPanel } from './TextPropertiesPanel';
import { ShapePropertiesPanel } from './ShapePropertiesPanel';

interface PropertiesPanelProps {
  selectedObject: any;
  onUpdateProperty: (property: string, value: any) => void;
}

export function PropertiesPanel({ selectedObject, onUpdateProperty }: PropertiesPanelProps) {
  return (
    <Card className="shadow-lg sticky top-4">
      <CardContent className="p-4 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
        <h3 className="font-semibold text-lg text-primary sticky top-0 bg-card py-2 -mt-2">
          {selectedObject ? 'Edit Properties' : 'Properties'}
        </h3>

        {selectedObject && selectedObject.type === 'i-text' ? (
          <TextPropertiesPanel 
            selectedObject={selectedObject} 
            onUpdateProperty={onUpdateProperty} 
          />
        ) : selectedObject ? (
          <ShapePropertiesPanel 
            selectedObject={selectedObject} 
            onUpdateProperty={onUpdateProperty} 
          />
        ) : (
          <div className="text-center py-12">
            <Type className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-sm text-muted-foreground font-medium mb-1">
              No element selected
            </p>
            <p className="text-xs text-muted-foreground">
              Click an element on the canvas or add new fields from the left panel
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
