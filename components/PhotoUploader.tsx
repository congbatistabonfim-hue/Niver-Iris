import React, { useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { PhotoMemory } from '../types';
import { fileToBase64 } from '../services/geminiService';

interface Props {
  onPhotosSelected: (photos: PhotoMemory[]) => void;
}

export const PhotoUploader: React.FC<Props> = ({ onPhotosSelected }) => {
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newPhotos: PhotoMemory[] = [];
      
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        const previewUrl = URL.createObjectURL(file);
        const base64 = await fileToBase64(file);
        
        newPhotos.push({
          id: crypto.randomUUID(),
          file,
          previewUrl,
          base64,
          title: file.name
        });
      }
      
      onPhotosSelected(newPhotos);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 px-4">
      <label 
        htmlFor="photo-upload" 
        className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gold-400 border-dashed rounded-3xl cursor-pointer bg-gold-100 hover:bg-white transition-all duration-300 group overflow-hidden"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 relative z-10">
          <div className="bg-white p-4 rounded-full shadow-md mb-4 group-hover:scale-110 transition-transform duration-300">
            <Upload className="w-8 h-8 text-gold-600" />
          </div>
          <p className="mb-2 text-xl font-serif text-gray-800 text-center">
            <span className="font-bold">Clique para adicionar fotos</span> da viagem
          </p>
          <p className="text-sm text-gray-500 text-center px-8">
            Carregue suas fotos do Rio, aniversário ou momentos especiais para transformá-las em vídeo.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        <input 
          id="photo-upload" 
          type="file" 
          multiple 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};