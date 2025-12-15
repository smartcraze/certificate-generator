import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic } from 'lucide-react';

interface TextPropertiesPanelProps {
  selectedObject: any;
  onUpdateProperty: (property: string, value: any) => void;
}

export function TextPropertiesPanel({ selectedObject, onUpdateProperty }: TextPropertiesPanelProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="text" className="text-sm font-medium">Text Content</Label>
        <textarea
          id="text"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-20 focus:ring-2 focus:ring-primary/20"
          value={selectedObject.text || ''}
          onChange={(e) => onUpdateProperty('text', e.target.value)}
          placeholder="Enter your text here"
        />
        <p className="text-xs text-muted-foreground">
          💡 Double-click text on canvas for direct editing
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="fontSize" className="text-sm font-medium">Font Size</Label>
          <Input
            id="fontSize"
            type="number"
            value={selectedObject.fontSize || 20}
            onChange={(e) => onUpdateProperty('fontSize', parseInt(e.target.value))}
            className="focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fontFamily" className="text-sm font-medium">Font</Label>
          <select
            id="fontFamily"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20"
            value={selectedObject.fontFamily || 'Arial'}
            onChange={(e) => onUpdateProperty('fontFamily', e.target.value)}
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Georgia">Georgia</option>
            <option value="Courier New">Courier New</option>
            <option value="Verdana">Verdana</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Palatino">Palatino</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fill" className="text-sm font-medium">Text Color</Label>
        <div className="flex gap-2">
          <Input
            id="fill"
            type="color"
            value={selectedObject.fill || '#000000'}
            onChange={(e) => onUpdateProperty('fill', e.target.value)}
            className="w-20 h-10 cursor-pointer"
          />
          <Input
            type="text"
            value={selectedObject.fill || '#000000'}
            onChange={(e) => onUpdateProperty('fill', e.target.value)}
            className="flex-1 font-mono text-sm"
            placeholder="#000000"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Text Style</Label>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={selectedObject.fontWeight === 'bold' ? 'default' : 'outline'}
            onClick={() => onUpdateProperty('fontWeight', selectedObject.fontWeight === 'bold' ? 'normal' : 'bold')}
            className="flex-1"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={selectedObject.fontStyle === 'italic' ? 'default' : 'outline'}
            onClick={() => onUpdateProperty('fontStyle', selectedObject.fontStyle === 'italic' ? 'normal' : 'italic')}
            className="flex-1"
          >
            <Italic className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Text Alignment</Label>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={selectedObject.textAlign === 'left' ? 'default' : 'outline'}
            onClick={() => onUpdateProperty('textAlign', 'left')}
            className="flex-1"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={selectedObject.textAlign === 'center' ? 'default' : 'outline'}
            onClick={() => onUpdateProperty('textAlign', 'center')}
            className="flex-1"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={selectedObject.textAlign === 'right' ? 'default' : 'outline'}
            onClick={() => onUpdateProperty('textAlign', 'right')}
            className="flex-1"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
