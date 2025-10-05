import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  userAgent: string;
}

export const useDeviceDetection = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    userAgent: ''
  });

  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      
      const mobileRegex = /android|webos|iphone|ipod|blackberry|iemobile|opera mini|mobile/i;
      const tabletRegex = /ipad|android(?=.*tablet)|tablet|kindle|silk|playbook/i;
      
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = Math.min(screenWidth, screenHeight) <= 768 || 
                           Math.min(windowWidth, windowHeight) <= 768;
      
      const isMobileUA = mobileRegex.test(userAgent);
      const isTabletUA = tabletRegex.test(userAgent);
      
      let isMobile = false;
      let isTablet = false;
      let isDesktop = true;
      
      if (isMobileUA && !isTabletUA) {
        isMobile = true;
        isDesktop = false;
      } else if (isTabletUA) {
        isTablet = true;
        isDesktop = false;
      } else if (isSmallScreen && isTouchDevice) {
        isMobile = true;
        isDesktop = false;
      }
      
      if (/iphone|ipod/i.test(userAgent)) {
        isMobile = true;
        isTablet = false;
        isDesktop = false;
      }
      
      if (/android/i.test(userAgent)) {
        if (/mobile/i.test(userAgent)) {
          isMobile = true;
          isTablet = false;
          isDesktop = false;
        } else {
          isTablet = true;
          isMobile = false;
          isDesktop = false;
        }
      }

      return {
        isMobile,
        isTablet,
        isDesktop,
        userAgent
      };
    };

    const updateDeviceInfo = () => {
      const newDeviceInfo = detectDevice();
      setDeviceInfo(newDeviceInfo);
    };

    updateDeviceInfo();

    const handleResize = () => {
      updateDeviceInfo();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return deviceInfo;
};