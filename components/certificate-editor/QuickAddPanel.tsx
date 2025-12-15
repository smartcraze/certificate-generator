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
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-zinc-900 mb-3">Preset Fields</h3>
        <div className="space-y-2">
          {PRESET_FIELDS.map((preset) => {
            const Icon = preset.icon;
            return (
              <Button
                key={preset.id}
                onClick={() => onAddPresetField(preset)}
                variant="outline"
                className="w-full justify-start h-10 border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300"
                size="sm"
              >
                <Icon className="h-4 w-4 text-zinc-700" />
                <span className="ml-2 text-sm">{preset.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
        
      <div>
        <h3 className="text-sm font-semibold text-zinc-900 mb-3">Custom Elements</h3>
        <div className="space-y-2">
          <Button
            onClick={onAddText}
            variant="outline"
            className="w-full justify-start h-10 border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300"
            size="sm"
          >
            <Type className="h-4 w-4 text-zinc-700" />
            <span className="ml-2 text-sm">Add Text</span>
          </Button>
          <Button
            onClick={onAddRectangle}
            variant="outline"
            className="w-full justify-start h-10 border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300"
            size="sm"
          >
            <Square className="h-4 w-4 text-zinc-700" />
            <span className="ml-2 text-sm">Add Shape</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
