"use client";
import { ReactNode, useRef, useEffect } from "react";

export default function Modal({
  children,
  open,
  onClose,
}: {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(
    function () {
      if (!ref.current) return;
      if (open) {
        ref.current.showModal();
      } else {
        ref.current.close();
      }
    },
    [open]
  );

  return (
    <dialog ref={ref} onClose={onClose} className="backdrop:bg-stone-600/20">
      {children}
    </dialog>
  );
}
