'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, FabricImage, IText, Rect } from 'fabric';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Type, 
  Image as ImageIcon, 
  Square, 
  Download, 
  Save,
  Trash2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic
} from 'lucide-react';

interface CertificateEditorProps {
  templateUrl: string;
  initialConfig?: string;
  onSave: (config: string, preview: string) => Promise<void>;
}

export default function CertificateEditor({ templateUrl, initialConfig, onSave }: CertificateEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new Canvas(canvasRef.current, {
      width: 1200,
      height: 849, // A4 landscape ratio
      backgroundColor: '#ffffff',
    });

    // Load the template image
    const imageUrl = templateUrl.startsWith('http') ? templateUrl : templateUrl;
    
    FabricImage.fromURL(imageUrl, {
      crossOrigin: templateUrl.startsWith('http') ? 'anonymous' : undefined
    }).then((img) => {
      if (!img) {
        console.warn('Failed to load template image');
        return;
      }
      
      img.scaleToWidth(1200);
      img.selectable = false;
      img.evented = false;
      fabricCanvas.add(img);
      fabricCanvas.sendObjectToBack(img);
      fabricCanvas.renderAll();
    }).catch((error) => {
      console.error('Error loading template:', error);
      // Continue without background image
    });

    // Load initial config if exists
    if (initialConfig) {
      try {
        const config = JSON.parse(initialConfig);
        if (config.objects) {
          // Small delay to ensure background is loaded first
          setTimeout(() => {
            fabricCanvas.loadFromJSON(config, () => {
              fabricCanvas.renderAll();
            });
          }, 100);
        }
      } catch (e) {
        console.error('Error loading config:', e);
      }
    }

    // Handle object selection
    fabricCanvas.on('selection:created', (e) => {
      setSelectedObject(e.selected?.[0]);
    });

    fabricCanvas.on('selection:updated', (e) => {
      setSelectedObject(e.selected?.[0]);
    });

    fabricCanvas.on('selection:cleared', () => {
      setSelectedObject(null);
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, [templateUrl]);

  const addText = () => {
    if (!canvas) return;

    const text = new IText('Sample Text', {
      left: 100,
      top: 100,
      fontFamily: 'Arial',
      fontSize: 40,
      fill: '#000000',
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
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
  };

  const deleteSelected = () => {
    if (!canvas || !selectedObject) return;

    canvas.remove(selectedObject);
    canvas.renderAll();
    setSelectedObject(null);
  };

  const updateTextProperty = (property: string, value: any) => {
    if (!canvas || !selectedObject) return;

    selectedObject.set(property, value);
    canvas.renderAll();
  };

  const handleSave = async () => {
    if (!canvas) return;

    setSaving(true);
    try {
      // Save canvas configuration
      const config = JSON.stringify(canvas.toJSON());

      // Generate preview image
      const preview = canvas.toDataURL({
        format: 'png',
        quality: 0.8,
      });

      await onSave(config, preview);
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save template');
    } finally {
      setSaving(false);
    }
  };

  const downloadPreview = () => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
    });

    const link = document.createElement('a');
    link.download = 'certificate-preview.png';
    link.href = dataURL;
    link.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-6">
      <div className="space-y-4">
        {/* Toolbar */}
        <Card>
          <CardContent className="flex flex-wrap gap-2 p-4">
            <Button onClick={addText} variant="outline" size="sm">
              <Type className="h-4 w-4 mr-2" />
              Add Text
            </Button>
            <Button onClick={addRectangle} variant="outline" size="sm">
              <Square className="h-4 w-4 mr-2" />
              Add Shape
            </Button>
            <Button
              onClick={deleteSelected}
              variant="outline"
              size="sm"
              disabled={!selectedObject}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <div className="ml-auto flex gap-2">
              <Button onClick={downloadPreview} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSave} size="sm" disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Template'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Canvas */}
        <Card>
          <CardContent className="p-4">
            <div className="overflow-auto bg-gray-100 rounded-lg p-4">
              <canvas ref={canvasRef} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Properties Panel */}
      <div>
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-lg">Properties</h3>

            {selectedObject && selectedObject.type === 'i-text' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text">Text Content</Label>
                  <Input
                    id="text"
                    value={selectedObject.text || ''}
                    onChange={(e) => updateTextProperty('text', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fontSize">Font Size</Label>
                  <Input
                    id="fontSize"
                    type="number"
                    value={selectedObject.fontSize || 20}
                    onChange={(e) => updateTextProperty('fontSize', parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fontFamily">Font Family</Label>
                  <select
                    id="fontFamily"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={selectedObject.fontFamily || 'Arial'}
                    onChange={(e) => updateTextProperty('fontFamily', e.target.value)}
                  >
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Verdana">Verdana</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fill">Text Color</Label>
                  <Input
                    id="fill"
                    type="color"
                    value={selectedObject.fill || '#000000'}
                    onChange={(e) => updateTextProperty('fill', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Text Style</Label>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={selectedObject.fontWeight === 'bold' ? 'default' : 'outline'}
                      onClick={() => updateTextProperty('fontWeight', selectedObject.fontWeight === 'bold' ? 'normal' : 'bold')}
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedObject.fontStyle === 'italic' ? 'default' : 'outline'}
                      onClick={() => updateTextProperty('fontStyle', selectedObject.fontStyle === 'italic' ? 'normal' : 'italic')}
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Text Alignment</Label>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={selectedObject.textAlign === 'left' ? 'default' : 'outline'}
                      onClick={() => updateTextProperty('textAlign', 'left')}
                    >
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedObject.textAlign === 'center' ? 'default' : 'outline'}
                      onClick={() => updateTextProperty('textAlign', 'center')}
                    >
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedObject.textAlign === 'right' ? 'default' : 'outline'}
                      onClick={() => updateTextProperty('textAlign', 'right')}
                    >
                      <AlignRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : selectedObject ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fill">Fill Color</Label>
                  <Input
                    id="fill"
                    type="color"
                    value={selectedObject.fill || '#000000'}
                    onChange={(e) => updateTextProperty('fill', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stroke">Stroke Color</Label>
                  <Input
                    id="stroke"
                    type="color"
                    value={selectedObject.stroke || '#000000'}
                    onChange={(e) => updateTextProperty('stroke', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="strokeWidth">Stroke Width</Label>
                  <Input
                    id="strokeWidth"
                    type="number"
                    value={selectedObject.strokeWidth || 1}
                    onChange={(e) => updateTextProperty('strokeWidth', parseInt(e.target.value))}
                  />
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Select an object to edit its properties
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
