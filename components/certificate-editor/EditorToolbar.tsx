import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Save, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface EditorToolbarProps {
  onDownloadPreview: () => void;
  onSave: () => void;
  saving: boolean;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export function EditorToolbar({ 
  onDownloadPreview, 
  onSave, 
  saving,
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom
}: EditorToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-zinc-900">Certificate Editor</h2>
        <span className="text-sm text-zinc-500 hidden lg:inline">
          Click to select • Double-click to edit • Hold Space to pan • Scroll to zoom
        </span>
      </div>
      <div className="flex items-center gap-4">
        {/* Zoom Controls */}
        <div className="flex items-center gap-2 border-r border-zinc-200 pr-4">
          <Button
            onClick={onZoomOut}
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-zinc-600 font-medium min-w-[60px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            onClick={onZoomIn}
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            onClick={onResetZoom}
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            title="Reset Zoom"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={onDownloadPreview}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </Button>
          <Button
            onClick={onSave}
            size="sm"
            disabled={saving}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}
