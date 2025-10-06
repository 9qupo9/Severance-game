import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

interface MediaPreloaderState {
  loadingProgress: number;
  isLoaded: boolean;
  loadedFiles: number;
  totalFiles: number;
  errors: string[];
}

export const useMediaPreloader = () => {
  const [state, setState] = useState<MediaPreloaderState>({
    loadingProgress: 0,
    isLoaded: false,
    loadedFiles: 0,
    totalFiles: 0,
    errors: []
  });

  const hasStarted = useRef(false);

  const mediaFiles = useMemo(() => [
    '/fon.mp4',
    '/fon2.mp4',
    '/intro.mp4',
    '/intro.mp3',
    '/sound.mp3'
  ], []);

  const preloadMedia = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      fetch(src)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.blob();
        })
        .then(blob => {
          
          const url = URL.createObjectURL(blob);
          
          URL.revokeObjectURL(url);
          resolve();
        })
        .catch(error => {
          reject(new Error(`Failed to load ${src}: ${error.message}`));
        });
    });
  }, []);

  const startPreloading = useCallback(async () => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    setState({
      loadingProgress: 0,
      isLoaded: false,
      loadedFiles: 0,
      totalFiles: mediaFiles.length,
      errors: []
    });

    const totalFiles = mediaFiles.length;
    let loadedCount = 0;

    
    for (const file of mediaFiles) {
      try {
        await preloadMedia(file);
        loadedCount++;
        
        const progress = Math.round((loadedCount / totalFiles) * 100);
        
        setState(prev => ({
          ...prev,
          loadedFiles: loadedCount,
          loadingProgress: progress,
          isLoaded: loadedCount === totalFiles
        }));
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : `Failed to load ${file}`;
        console.warn(errorMessage);
        
        loadedCount++;
        const progress = Math.round((loadedCount / totalFiles) * 100);
        
        setState(prev => ({
          ...prev,
          loadedFiles: loadedCount,
          loadingProgress: progress,
          isLoaded: loadedCount === totalFiles,
          errors: [...prev.errors, errorMessage]
        }));
      }
    }
  }, [mediaFiles, preloadMedia]);

  useEffect(() => {
    startPreloading();
  }, [startPreloading]);

  return state;
};