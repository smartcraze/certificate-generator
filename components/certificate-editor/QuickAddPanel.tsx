import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Type, Square, Plus } from 'lucide-react';
import { PRESET_FIELDS } from './preset-fields';
import type { PresetField } from './types';

interface QuickAddPanelProps {
  onAddPresetField: (preset: PresetField) => void;
  onAddText: () => void;
  onAddRectangle: () => void;
}

export function QuickAddPanel({ onAddPresetField, onAddText, onAddRectangle }: QuickAddPanelProps) {
  return (
    <div className="space-y-4">
      <Card className="shadow-lg">
        <CardContent className="p-4 space-y-3">
          <h3 className="font-semibold text-sm flex items-center gap-2 text-primary">
            <Plus className="h-4 w-4" />
            Quick Add Fields
          </h3>
          <div className="space-y-2">
            {PRESET_FIELDS.map((preset) => {
              const Icon = preset.icon;
              return (
                <Button
                  key={preset.id}
                  onClick={() => onAddPresetField(preset)}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start hover:bg-primary/5 transition-colors"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {preset.label}
                </Button>
              );
            })}
          </div>
          <div className="pt-3 border-t space-y-2">
            <p className="text-xs text-muted-foreground mb-2">Custom Elements</p>
            <Button onClick={onAddText} variant="outline" size="sm" className="w-full justify-start hover:bg-primary/5">
              <Type className="h-4 w-4 mr-2" />
              Custom Text
            </Button>
            <Button onClick={onAddRectangle} variant="outline" size="sm" className="w-full justify-start hover:bg-primary/5">
              <Square className="h-4 w-4 mr-2" />
              Shape
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
