import { useEffect } from 'react';

export const useEventListener=(eventType: string, handler: (e: any) => void) => {
    useEffect(() => {
        window.addEventListener(eventType, handler);
        return () => window.removeEventListener(eventType, handler);
      },[eventType, handler])
}