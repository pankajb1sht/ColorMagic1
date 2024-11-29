import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImageDown, Upload } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';
import { ColorCard } from '../components/ColorCard';

export default function ImageExtractor() {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const extractColors = async (imageUrl: string) => {
    setLoading(true);
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageUrl;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const tensor = tf.browser.fromPixels(img)
        .resizeNearestNeighbor([50, 50])
        .toFloat()
        .div(255.0);

      const pixels = await tensor.array();
      const colorMap = new Map<string, number>();

      for (let i = 0; i < pixels.length; i++) {
        for (let j = 0; j < pixels[i].length; j++) {
          const [r, g, b] = pixels[i][j];
          const hex = rgbToHex(
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255)
          );
          colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
        }
      }

      const sortedColors = Array.from(colorMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([color]) => color);

      setColors(sortedColors);
      tensor.dispose();
    } catch (error) {
      console.error('Error extracting colors:', error);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setImage(dataUrl);
        extractColors(dataUrl);
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <ImageDown className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-4 text-3xl font-bold text-gray-900">AI Color Extractor</h2>
          <p className="mt-2 text-gray-600">
            Upload an image and let AI extract a beautiful color palette
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

        {loading && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Extracting colors...
            </div>
          </div>
        )}

        {image && (
          <div className="mt-8">
            <div className="relative rounded-lg overflow-hidden">
              <img src={image} alt="Uploaded" className="w-full h-64 object-cover" />
            </div>
          </div>
        )}

        {colors.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Extracted Colors</h3>
            <div className="grid grid-cols-5 gap-4 h-32">
              {colors.map((color, index) => (
                <ColorCard key={color} color={color} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}