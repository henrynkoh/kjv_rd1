"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", padding: "2rem", textAlign: "center" }}>
        <h2 style={{ color: "#1c1917", marginBottom: "0.5rem" }}>Something went wrong</h2>
        <p style={{ color: "#57534e", marginBottom: "1rem" }}>{error.message || "An error occurred."}</p>
        <button
          onClick={reset}
          style={{
            background: "#059669",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
