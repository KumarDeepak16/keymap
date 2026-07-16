import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "KeyMap — The keyboard shortcut reference";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf9f6",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#1a1a17",
              color: "#faf9f6",
              fontSize: 44,
              fontWeight: 700,
              borderRadius: 16,
            }}
          >
            K
          </div>
          <div style={{ fontSize: 36, color: "#1a1a17", fontWeight: 600 }}>KeyMap</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 76, color: "#1a1a17", fontWeight: 700, lineHeight: 1.05 }}>
            Every keyboard shortcut,
          </div>
          <div style={{ fontSize: 76, color: "#6b6a63", fontWeight: 500, lineHeight: 1.05 }}>
            one keystroke away.
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {["Cmd+K", "Ctrl+S", "Shift+P"].map((k) => (
            <div
              key={k}
              style={{
                padding: "12px 22px",
                background: "#f4f2ec",
                border: "1px solid #d8d4c8",
                borderRadius: 10,
                fontSize: 30,
                color: "#1a1a17",
                fontFamily: "monospace",
              }}
            >
              {k}
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 26, color: "#9a988e", alignSelf: "flex-end" }}>
            Windows &amp; macOS · verified
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
