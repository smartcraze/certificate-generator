import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ShapePropertiesPanelProps {
  selectedObject: any;
  onUpdateProperty: (property: string, value: any) => void;
}

export function ShapePropertiesPanel({ selectedObject, onUpdateProperty }: ShapePropertiesPanelProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fill" className="text-sm font-medium text-zinc-900">Fill Color</Label>
        <div className="flex gap-2">
          <div className="relative">
            <Input
              id="fill"
              type="color"
              value={selectedObject.fill || '#000000'}
              onChange={(e) => onUpdateProperty('fill', e.target.value)}
              className="w-12 h-10 cursor-pointer p-1 border-zinc-300"
            />
          </div>
          <Input
            type="text"
            value={selectedObject.fill || '#000000'}
            onChange={(e) => onUpdateProperty('fill', e.target.value)}
            className="flex-1 font-mono text-sm border-zinc-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="stroke" className="text-sm font-medium text-zinc-900">Stroke Color</Label>
        <div className="flex gap-2">
          <div className="relative">
            <Input
              id="stroke"
              type="color"
              value={selectedObject.stroke || '#000000'}
              onChange={(e) => onUpdateProperty('stroke', e.target.value)}
              className="w-12 h-10 cursor-pointer p-1 border-zinc-300"
            />
          </div>
          <Input
            type="text"
            value={selectedObject.stroke || '#000000'}
            onChange={(e) => onUpdateProperty('stroke', e.target.value)}
            className="flex-1 font-mono text-sm border-zinc-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="strokeWidth" className="text-sm font-medium text-zinc-900">Stroke Width</Label>
        <Input
          id="strokeWidth"
          type="number"
          value={selectedObject.strokeWidth || 1}
          onChange={(e) => onUpdateProperty('strokeWidth', parseInt(e.target.value))}
          className="border-zinc-300 focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
