import { useEffect, useRef } from "react"
import "./style.css";

export function Modal({ isOpen, onClose, title, children }) {
    const dialogRef = useRef(null);

     useEffect(() => {
    if (!dialogRef.current) return;

    if (isOpen && !dialogRef.current.open) {
      dialogRef.current.showModal();
    } else if (!isOpen && dialogRef.current.open) {
      dialogRef.current.close();
    }
  }, [isOpen]);

  if (!isOpen) return null;

    return (
        <dialog className="modal-overlay" ref={dialogRef} open={isOpen}>
            <div className="modal-container">
                <header>
                    <p className="text-sm font-medium">{title}</p>
                </header>
                {children}
            </div>
            
        </dialog>
    )
}