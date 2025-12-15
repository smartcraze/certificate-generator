import { RefObject } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface EditorCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export function EditorCanvas({ canvasRef }: EditorCanvasProps) {
  return (
    <div className="bg-white rounded-lg shadow-xl">
      <canvas ref={canvasRef} />
    </div>
  );
}
