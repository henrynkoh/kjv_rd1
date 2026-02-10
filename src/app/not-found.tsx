import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold text-stone-900 mb-2">404</h1>
      <p className="text-stone-600 mb-6">This page could not be found.</p>
      <Link
        href="/"
        className="rounded-lg bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-700"
      >
        Go home
      </Link>
    </div>
  );
}
