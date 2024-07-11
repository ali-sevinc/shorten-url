"use client";

import { shortenUrl } from "@/lib/actions";
import { FormStateType } from "@/lib/types";
import { useFormState } from "react-dom";
import Modal from "./Modal";

export default function Home() {
  const [formState, formAction] = useFormState(shortenUrl, {} as FormStateType);
  console.log(formState);

  const isSuccess = Array.isArray(formState) && formState[0].slug;
  let showModal = isSuccess ? true : false;

  function copyShortenUrl() {
    if (!isSuccess) return;
    navigator.clipboard.writeText(
      `http://localhost:3000/${formState[0]?.slug}`
    );
  }

  return (
    <>
      <div className="bg-blue-50 min-h-screen grid items-center">
        <div className="max-w-6xl mx-auto bg-blue-500 p-4 flex flex-col gap-8 pt-8 rounded-xl">
          <h1 className=" text-blue-50 font-semibold text-4xl">
            Welcome the SURL
          </h1>
          <form action={formAction} className="flex flex-col gap-5 text-lg">
            <div className="flex flex-col">
              <label className="text-blue-50" htmlFor="url">
                Long URL
              </label>
              <input
                className={`px-2 py-1 font-semibold tracking-wider ${
                  !Array.isArray(formState) && formState?.urlError
                    ? "border-red-500 bg-red-200"
                    : ""
                }`}
                type="url"
                id="url"
                name="longUrl"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-blue-50" htmlFor="shorten">
                Shorten URL
              </label>
              <input
                className={`px-2 py-1 font-semibold tracking-wider ${
                  !Array.isArray(formState) && formState?.existedError
                    ? "border-red-500 bg-red-200"
                    : ""
                }`}
                type="text"
                id="shorten"
                name="shortUrl"
              />
            </div>
            <div className="text-center">
              <button className="border-2 bg-blue-50 rounded px-4 py-2 hover:bg-blue-200 duration-200">
                Submit
              </button>
            </div>
          </form>
          {!Array.isArray(formState) && formState?.createError && (
            <p>{formState?.createError}</p>
          )}
        </div>
      </div>
      {isSuccess && (
        <Modal open={showModal} onClose={() => (showModal = false)}>
          <div className="flex gap-4">
            <p>
              new url: <b>http://localhost:3000/{formState[0]?.slug}</b>
            </p>
            <button onClick={copyShortenUrl}>Copy</button>
          </div>
        </Modal>
      )}
    </>
  );
}
