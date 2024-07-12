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
    <dialog
      ref={ref}
      onClose={onClose}
      className="backdrop:bg-stone-600/70 px-4 py-2 rounded-xl bg-blue-500 relative"
    >
      {children}
      <button
        onClick={() => onClose()}
        className="absolute right-4 top-1 text-blue-50 hover:text-red-100 text-lg font-bold"
      >
        x
      </button>
    </dialog>
  );
}
