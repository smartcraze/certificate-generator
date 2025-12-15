'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, FabricImage, IText, Rect } from 'fabric';
import { toast } from 'sonner';
import { QuickAddPanel } from './QuickAddPanel';
import { LayerControlsPanel } from './LayerControlsPanel';
import { EditorToolbar } from './EditorToolbar';
import { EditorCanvas } from './EditorCanvas';
import { PropertiesPanel } from './PropertiesPanel';
import type { CertificateEditorProps, PresetField } from './types';

export default function CertificateEditor({ 
  templateUrl, 
  initialConfig, 
  onSave 
}: CertificateEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new Canvas(canvasRef.current, {
      width: 1200,
      height: 849,
      backgroundColor: '#ffffff',
    });

    // Load template image
    FabricImage.fromURL(templateUrl, {
      crossOrigin: templateUrl.startsWith('http') ? 'anonymous' : undefined
    }).then((img) => {
      if (!img) return;
      img.scaleToWidth(1200);
      img.selectable = false;
      img.evented = false;
      fabricCanvas.add(img);
      fabricCanvas.sendObjectToBack(img);
      fabricCanvas.renderAll();
    }).catch((error) => {
      console.error('Error loading template:', error);
      toast.error('Failed to load template image');
    });

    // Load initial config
    if (initialConfig) {
      try {
        const config = JSON.parse(initialConfig);
        if (config.objects) {
          setTimeout(() => {
            fabricCanvas.loadFromJSON(config, () => {
              fabricCanvas.renderAll();
            });
          }, 100);
        }
      } catch (error) {
        console.error('Error loading config:', error);
      }
    }

    // Event listeners
    fabricCanvas.on('selection:created', (e) => setSelectedObject(e.selected?.[0]));
    fabricCanvas.on('selection:updated', (e) => setSelectedObject(e.selected?.[0]));
    fabricCanvas.on('selection:cleared', () => setSelectedObject(null));

    setCanvas(fabricCanvas);
    
    return () => {
      fabricCanvas.dispose();
    };
  }, [templateUrl, initialConfig]);

  const addText = () => {
    if (!canvas) return;
    const text = new IText('Click to Edit Text', {
      left: 100,
      top: 100,
      fontFamily: 'Arial',
      fontSize: 40,
      fill: '#000000',
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    toast.success('Text added! Click to edit or drag to move');
  };

  const addPresetField = (preset: PresetField) => {
    if (!canvas) return;
    const text = new IText(preset.defaultText, {
      left: 600,
      top: preset.top,
      fontFamily: preset.fontFamily,
      fontSize: preset.fontSize,
      fill: preset.color,
      originX: 'center',
      textAlign: 'center',
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    toast.success(`${preset.label} field added!`);
  };

  const addRectangle = () => {
    if (!canvas) return;
    const rect = new Rect({
      left: 100,
      top: 100,
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 2,
      width: 200,
      height: 100,
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
    toast.success('Shape added!');
  };

  const deleteSelected = () => {
    if (!canvas || !selectedObject) return;
    canvas.remove(selectedObject);
    canvas.renderAll();
    setSelectedObject(null);
    toast.success('Element deleted');
  };

  const duplicateSelected = () => {
    if (!canvas || !selectedObject) return;
    selectedObject.clone((cloned: any) => {
      cloned.set({
        left: (selectedObject.left || 0) + 20,
        top: (selectedObject.top || 0) + 20,
      });
      canvas.add(cloned);
      canvas.setActiveObject(cloned);
      canvas.renderAll();
      toast.success('Element duplicated');
    });
  };

  const bringToFront = () => {
    if (!canvas || !selectedObject) return;
    canvas.bringObjectToFront(selectedObject);
    canvas.renderAll();
    toast.success('Brought to front');
  };

  const sendToBack = () => {
    if (!canvas || !selectedObject) return;
    canvas.sendObjectToBack(selectedObject);
    canvas.renderAll();
    toast.success('Sent to back');
  };

  const updateProperty = (property: string, value: any) => {
    if (!canvas || !selectedObject) return;
    selectedObject.set(property, value);
    canvas.renderAll();
    setSelectedObject({ ...selectedObject });
  };

  const handleSave = async () => {
    if (!canvas) return;
    setSaving(true);
    try {
      const config = JSON.stringify(canvas.toJSON());
      const preview = canvas.toDataURL({
        format: 'png',
        quality: 0.8,
        multiplier: 1,
      });
      await onSave(config, preview);
      toast.success('Template saved successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save template');
    } finally {
      setSaving(false);
    }
  };

  const downloadPreview = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2,
    });
    const link = document.createElement('a');
    link.download = 'certificate-preview.png';
    link.href = dataURL;
    link.click();
    toast.success('Preview downloaded!');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr,340px] gap-6">
      <div className="space-y-4">
        <QuickAddPanel 
          onAddPresetField={addPresetField}
          onAddText={addText}
          onAddRectangle={addRectangle}
        />
        <LayerControlsPanel
          selectedObject={selectedObject}
          onDuplicate={duplicateSelected}
          onBringToFront={bringToFront}
          onSendToBack={sendToBack}
          onDelete={deleteSelected}
        />
      </div>

      <div className="space-y-4">
        <EditorToolbar
          onDownloadPreview={downloadPreview}
          onSave={handleSave}
          saving={saving}
        />
        <EditorCanvas canvasRef={canvasRef} />
      </div>

      <PropertiesPanel
        selectedObject={selectedObject}
        onUpdateProperty={updateProperty}
      />
    </div>
  );
}
