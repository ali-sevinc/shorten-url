"use client";

import { useState } from "react";
import Modal from "./Modal";
import { HiCheck, HiClipboardCopy } from "react-icons/hi";

type PropsType = {
  showModal: boolean;
  onClose: () => void;
  isSuccess: string;
  slug: string;
};
export default function Result({
  showModal,
  onClose,
  isSuccess,
  slug,
}: PropsType) {
  const [isCoppied, setIsCoppied] = useState(false);
  function copyShortenUrl() {
    if (!isSuccess) return;
    navigator.clipboard.writeText(`https://surl-ali.vercel.app/${slug}`);
    setIsCoppied(true);

    setTimeout(() => setIsCoppied(false), 1500);
  }

  return (
    <Modal open={showModal} onClose={onClose}>
      <div className="flex flex-col gap-4 p-8 text-blue-50 text-lg relative">
        {isCoppied && (
          <p className="absolute top-0 left-[calc(50%-3rem)] w-[6rem] text-sm text-green-200 text-center">
            Coppied
          </p>
        )}
        <h2 className="text-2xl font-semibold text-center">Shortened URL</h2>
        <div className="flex items-center">
          <p className="flex items-center">
            <b className="bg-blue-50 text-blue-700 p-1 rounded-l-xl">
              http://localhost:3000/{slug}
            </b>
            <button
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-2 text-xl rounded-r-xl border-l-2"
              onClick={copyShortenUrl}
            >
              {isCoppied ? <HiCheck /> : <HiClipboardCopy />}
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
}
