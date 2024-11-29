import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Eraser, Upload, Download } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BackgroundRemoval() {
  const [image, setImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setImage(dataUrl);
        // Here you would integrate with a background removal API
        // For now, we'll just show a toast
        toast.success('Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    multiple: false
  });

  const handleRemoveBackground = async () => {
    if (!image) return;
    
    setLoading(true);
    try {
      // Here you would integrate with a background removal API
      // For demonstration, we'll just show a loading state
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Background removed successfully!');
      setProcessedImage(image); // In reality, this would be the processed image
    } catch (error) {
      toast.error('Failed to remove background');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Eraser className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Background Removal</h2>
          <p className="mt-2 text-gray-600">
            Remove backgrounds from your images with AI precision
          </p>
        </div>

        <div
          {...getRootProps()}
          className={`mt-8 flex justify-center px-6 pt-5 pb-6 border-2 ${
            isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
          } border-dashed rounded-lg cursor-pointer hover:border-indigo-500 transition-colors duration-200`}
        >
          <input {...getInputProps()} />
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                <span>Upload a file</span>
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
          </div>
        </div>

        {image && (
          <div className="mt-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-2">Original Image</h3>
                <div className="relative rounded-lg overflow-hidden bg-gray-50">
                  <img src={image} alt="Original" className="w-full h-64 object-contain" />
                </div>
              </div>
              {processedImage && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Processed Image</h3>
                  <div className="relative rounded-lg overflow-hidden bg-gray-50">
                    <img src={processedImage} alt="Processed" className="w-full h-64 object-contain" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleRemoveBackground}
                disabled={loading}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Eraser className="w-5 h-5" />
                    Remove Background
                  </>
                )}
              </button>
              {processedImage && (
                <a
                  href={processedImage}
                  download="processed-image.png"
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}