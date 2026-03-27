import { useState, useEffect, useCallback } from "react";
import MobileNav from "./MobileNav";

export default function MobileNavWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleToggle = (e: CustomEvent) => {
      setIsOpen(e.detail.open);
    };

    document.addEventListener("toggle-mobile-nav" as keyof EventListener, handleToggle as EventListener);

    return () => {
      document.removeEventListener("toggle-mobile-nav" as keyof EventListener, handleToggle as EventListener);
    };
  }, []);

  return <MobileNav isOpen={isOpen} onClose={handleClose} />;
}