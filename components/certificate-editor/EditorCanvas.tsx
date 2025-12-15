import { RefObject } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface EditorCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export function EditorCanvas({ canvasRef }: EditorCanvasProps) {
  return (
    <Card className="shadow-xl">
      <CardContent className="p-4">
        <div className="overflow-auto bg-gray-50 rounded-lg p-4 border-2 border-muted">
          <canvas ref={canvasRef} className="shadow-md" />
        </div>
      </CardContent>
    </Card>
  );
}
