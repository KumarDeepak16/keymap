"use client";

// Global error boundary — replaces the whole document when the root layout
// itself throws. Must render its own <html>/<body>.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#faf9f6",
          color: "#1a1a17",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <p style={{ fontFamily: "monospace", fontSize: 13, color: "#9a988e" }}>Fatal error</p>
        <h1 style={{ fontSize: "2rem", margin: "0.5rem 0" }}>KeyMap hit a snag</h1>
        <p style={{ color: "#6b6a63", maxWidth: 380 }}>
          The application failed to load. Reloading usually fixes it.
        </p>
        <button
          onClick={reset}
          style={{
            marginTop: "1.5rem",
            padding: "0.65rem 1.25rem",
            borderRadius: 6,
            border: "none",
            background: "#1a1a17",
            color: "#faf9f6",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Reload
        </button>
      </body>
    </html>
  );
}
