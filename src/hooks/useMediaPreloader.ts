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
  const loadedCache = useRef(new Set<string>());

  const mediaFiles = useMemo(() => [
    // Video files
    '/fon.mp4',
    '/fon2.mp4',
    '/intro.mp4',
    // Audio files
    '/intro.mp3',
    '/sound.mp3',
    // Image files
    '/controls.png',
    '/error.png',
    '/logo-game.png'
  ], []);

  const preloadMedia = useCallback((src: string): Promise<void> => {
    
    if (loadedCache.current.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      fetch(src)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.blob();
        })
        .then(blob => {
         
          loadedCache.current.add(src);
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

    
    for (let i = 0; i < mediaFiles.length; i++) {
      const file = mediaFiles[i];
      try {
        await preloadMedia(file);
        
        setState(prev => {
          const newLoadedCount = prev.loadedFiles + 1;
          const progress = Math.round((newLoadedCount / totalFiles) * 100);
          
          return {
            ...prev,
            loadedFiles: newLoadedCount,
            loadingProgress: progress,
            isLoaded: newLoadedCount === totalFiles
          };
        });
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : `Failed to load ${file}`;
        console.warn(errorMessage);
        
        setState(prev => {
          const newLoadedCount = prev.loadedFiles + 1;
          const progress = Math.round((newLoadedCount / totalFiles) * 100);
          
          return {
            ...prev,
            loadedFiles: newLoadedCount,
            loadingProgress: progress,
            isLoaded: newLoadedCount === totalFiles,
            errors: [...prev.errors, errorMessage]
          };
        });
      }
    }
  }, [mediaFiles, preloadMedia]);

  useEffect(() => {
    startPreloading();
  }, [startPreloading]);

  return state;
};