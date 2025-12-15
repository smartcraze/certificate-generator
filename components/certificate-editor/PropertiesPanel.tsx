import { Card, CardContent } from '@/components/ui/card';
import { Type } from 'lucide-react';
import { TextPropertiesPanel } from './TextPropertiesPanel';
import { ShapePropertiesPanel } from './ShapePropertiesPanel';

interface PropertiesPanelProps {
  selectedObject: any;
  onUpdateProperty: (property: string, value: any) => void;
}

export function PropertiesPanel({ selectedObject, onUpdateProperty }: PropertiesPanelProps) {
  if (!selectedObject) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
        </div>
        <p className="text-sm font-medium text-zinc-900 mb-1">No element selected</p>
        <p className="text-xs text-zinc-500">
          Select an element to edit its properties
        </p>
      </div>
    );
  }

  const isText = selectedObject.type === 'i-text' || selectedObject.type === 'text';
  const isShape = selectedObject.type === 'rect' || selectedObject.type === 'circle';

  return (
    <div>
      <h3 className="text-sm font-semibold text-zinc-900 mb-4">Properties</h3>
      {isText && (
        <TextPropertiesPanel 
          selectedObject={selectedObject} 
          onUpdateProperty={onUpdateProperty}
        />
      )}
      {isShape && (
        <ShapePropertiesPanel 
          selectedObject={selectedObject} 
          onUpdateProperty={onUpdateProperty}
        />
      )}
    </div>
  );
}
