"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center px-4">
      <h2 className="text-lg font-semibold text-stone-800 mb-2">Something went wrong</h2>
      <p className="text-stone-600 text-sm mb-4 text-center max-w-md">
        {error.message || "An error occurred."}
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-emerald-600 px-4 py-2 text-white text-sm font-medium hover:bg-emerald-700"
      >
        Try again
      </button>
    </div>
  );
}
