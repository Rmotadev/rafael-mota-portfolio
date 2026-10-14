import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

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
          background: "#0a0a0b",
          borderRadius: 14,
          border: "2px solid #26262a",
          color: "#ededeb",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: -1.5,
        }}
      >
        RM<span style={{ color: "#5b80ff" }}>.</span>
      </div>
    ),
    size,
  );
}
