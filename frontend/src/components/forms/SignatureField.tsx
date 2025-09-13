import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Pen, Edit3 } from "lucide-react";

interface SignatureFieldProps {
  value: string;
  onChange: (signature: string) => void;
  placeholder?: string;
}

export const SignatureField = ({ 
  value, 
  onChange, 
  placeholder = "Click to sign" 
}: SignatureFieldProps) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modalCanvasRef = useRef<HTMLCanvasElement>(null);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement) => {
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    const canvas = modalCanvasRef.current;
    if (!canvas) return;
    
    const { x, y } = getCoordinates(e, canvas);
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    
    const canvas = modalCanvasRef.current;
    if (!canvas) return;
    
    const { x, y } = getCoordinates(e, canvas);
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'hsl(var(--foreground))';
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
  };

  const saveSignature = () => {
    const canvas = modalCanvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL();
      onChange(dataURL);
      setIsModalOpen(false);
      
      // Update preview canvas
      updatePreviewCanvas(dataURL);
    }
  };

  const updatePreviewCanvas = (dataURL: string) => {
    const previewCanvas = canvasRef.current;
    if (previewCanvas && dataURL) {
      const ctx = previewCanvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        ctx?.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        ctx?.drawImage(img, 0, 0, previewCanvas.width, previewCanvas.height);
      };
      img.src = dataURL;
    }
  };

  const clearSignature = () => {
    const previewCanvas = canvasRef.current;
    const modalCanvas = modalCanvasRef.current;
    
    if (previewCanvas) {
      const ctx = previewCanvas.getContext('2d');
      ctx?.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    }
    
    if (modalCanvas) {
      const ctx = modalCanvas.getContext('2d');
      ctx?.clearRect(0, 0, modalCanvas.width, modalCanvas.height);
    }
    
    onChange('');
  };

  const clearModalSignature = () => {
    const canvas = modalCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Update preview when value changes
  useEffect(() => {
    if (value) {
      updatePreviewCanvas(value);
    }
  }, [value]);

  return (
    <div className="space-y-2">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            {value ? 'Signature captured' : placeholder}
          </span>
          <div className="flex gap-2">
            {value && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={clearSignature}
                className="h-7 px-2"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <div className="relative cursor-pointer">
              <canvas
                ref={canvasRef}
                width={300}
                height={80}
                className="border border-border rounded w-full bg-background hover:bg-muted/50 transition-colors"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {!value && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Edit3 className="h-4 w-4" />
                    <span className="text-sm">Click to sign</span>
                  </div>
                )}
              </div>
            </div>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Digital Signature</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Please sign in the area below using your mouse or touch device.
              </p>
              
              <div className="border border-border rounded-lg p-4 bg-background">
                <canvas
                  ref={modalCanvasRef}
                  width={600}
                  height={200}
                  className="border border-dashed border-border rounded cursor-crosshair w-full bg-white touch-none"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
              </div>
              
              <div className="flex justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={clearModalSignature}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={saveSignature}
                  >
                    Save Signature
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        {value && (
          <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
            <Pen className="h-3 w-3" />
            Signed
          </div>
        )}
      </Card>
    </div>
  );
};