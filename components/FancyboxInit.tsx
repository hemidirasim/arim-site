'use client'

import { useEffect } from 'react'

export default function FancyboxInit() {
  useEffect(() => {
    // Initialize Fancybox when jQuery and Fancybox are loaded
    const initFancybox = () => {
      if (typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fancybox) {
        (window as any).jQuery('[data-fancybox="gallery"]').fancybox({
          buttons: [
            "zoom",
            "slideShow",
            "thumbs",
            "close"
          ],
          loop: true,
          protect: true
        })
      }
    }

    // Check if already loaded
    initFancybox()

    // If not loaded yet, wait for it
    const checkInterval = setInterval(initFancybox, 100)
    
    // Cleanup
    return () => {
      clearInterval(checkInterval)
      if (typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fancybox) {
        (window as any).jQuery.fancybox.destroy()
      }
    }
  }, [])

  return null
}
