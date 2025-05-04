
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploaderProps {
  initialImage?: string;
  onChange: (imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ initialImage = '', onChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string>(initialImage);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image is too large. Maximum size is 5MB.');
      return;
    }

    // Check file type
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(file.type)) {
      toast.error('Invalid file type. Please upload a JPEG, JPG, PNG, or WebP image.');
      return;
    }

    setIsLoading(true);
    
    // Convert the file to a data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      onChange(result); // Pass the data URL back to the parent component
      setIsLoading(false);
    };
    
    reader.onerror = () => {
      toast.error('Failed to read the image file.');
      setIsLoading(false);
    };
    
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div 
        className={`border-2 border-dashed rounded-lg p-4 h-48 flex flex-col items-center justify-center cursor-pointer bg-muted/30 transition-colors hover:bg-muted/50 ${
          previewUrl ? "border-primary" : "border-border"
        }`}
        onClick={() => document.getElementById('image-upload')?.click()}
      >
        {previewUrl ? (
          <div className="relative w-full h-full">
            <img 
              src={previewUrl} 
              alt="Product preview" 
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/50 transition-opacity text-white">
              Click to change image
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <Upload className="mb-2 h-8 w-8" />
            <p className="text-sm font-medium">Click to upload product image</p>
            <p className="text-xs mt-1">JPEG, JPG, PNG or WebP (max 5MB)</p>
          </div>
        )}
        <input 
          type="file"
          id="image-upload"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          className="hidden"
          onChange={handleFileChange}
          disabled={isLoading}
        />
      </div>
      {previewUrl && (
        <Button 
          type="button" 
          variant="outline"
          className="w-full"
          onClick={() => {
            setPreviewUrl('');
            onChange('');
          }}
        >
          Remove Image
        </Button>
      )}
    </div>
  );
};

export default ImageUploader;
