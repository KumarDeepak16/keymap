import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// The KeyMap "K" mark: ink tile, bone glyph.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1a17",
          color: "#faf9f6",
          fontSize: 44,
          fontWeight: 700,
          fontFamily: "monospace",
          borderRadius: 14,
        }}
      >
        K
      </div>
    ),
    { ...size },
  );
}
