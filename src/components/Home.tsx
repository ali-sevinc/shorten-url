"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { shortenUrl } from "@/lib/actions";
import { FormStateType } from "@/lib/types";

import Result from "./Result";

export default function Home() {
  const [formState, formAction] = useFormState(shortenUrl, {} as FormStateType);
  const [showModal, setShowModal] = useState(false);
  const [shortened, setShortened] = useState<string>("http://localhost:3000/");

  const isSuccess = Array.isArray(formState) && formState[0].slug;

  useEffect(
    function () {
      if (isSuccess) {
        setShowModal(true);
      }
    },
    [isSuccess]
  );

  return (
    <>
      <div className="bg-blue-50 min-h-screen grid items-center">
        <div className="max-w-xl mx-auto w-full bg-blue-500 p-4 flex flex-col gap-8  rounded-xl">
          <h1 className=" text-blue-50 font-semibold text-center text-4xl">
            SURL
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
                onChange={(e) =>
                  setShortened("http://localhost:3000/" + e.target.value)
                }
              />
            </div>
            <div className="flex flex-col">
              <p className="text-blue-50">Prewiev</p>
              <b className="truncate bg-blue-50 px-2 py-1">{shortened}</b>
            </div>
            <FormButton />
          </form>
          {!Array.isArray(formState) && formState?.createError && (
            <p>{formState?.createError}</p>
          )}
        </div>
      </div>
      {isSuccess && showModal && (
        <Result
          isSuccess={isSuccess}
          onClose={() => setShowModal(false)}
          showModal={showModal}
          slug={formState[0]?.slug}
        />
      )}
    </>
  );
}

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <div className="text-center">
      <button
        disabled={pending}
        className="border-2 border-blue-200 bg-blue-50 rounded px-4 py-2 hover:bg-blue-200 duration-200"
      >
        {pending ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
