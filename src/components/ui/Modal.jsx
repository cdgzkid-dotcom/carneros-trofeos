import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

/**
 * Wrapper genérico de modal con:
 * - Backdrop blur + click para cerrar
 * - Animación slideUp
 * - Focus trap manual (sin librerías externas)
 * - Escape key para cerrar
 *
 * Props:
 *   isOpen   {boolean}  — controla visibilidad
 *   onClose  {function} — callback al cerrar
 *   children {node}
 */
export default function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);

  // Focus trap + Escape key
  useEffect(() => {
    if (!isOpen) return;

    const modalEl = modalRef.current;
    if (!modalEl) return;

    const FOCUSABLE = 'button, input, select, textarea, [href], [tabindex]:not([tabindex="-1"])';
    const focusables = [...modalEl.querySelectorAll(FOCUSABLE)];
    const first = focusables[0];
    const last  = focusables[focusables.length - 1];

    // Focus el primer elemento al abrir
    const raf = requestAnimationFrame(() => first?.focus());

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Bloquear scroll del body mientras el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className="modal-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-box" ref={modalRef}>
        {children}
      </div>
    </div>,
    document.body
  );
}
