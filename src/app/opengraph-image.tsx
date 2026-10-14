import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a0b",
          backgroundImage:
            "radial-gradient(circle at 80% 0%, rgba(47,92,255,0.16), transparent 45%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 64px 64px, 64px 64px",
          color: "#ededeb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              border: "2px solid #2a2a2e",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            RM<span style={{ color: "#5b80ff" }}>.</span>
          </div>
          <span style={{ fontSize: 26, color: "#9a9a9f" }}>{site.name}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -4, lineHeight: 1.02, maxWidth: 980 }}>
            Transformo ideias em experiências digitais.
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 32, color: "#9a9a9f" }}>
            <span style={{ color: "#5b80ff" }}>Desenvolvedor Web</span>
            <span>&nbsp;· Automação & IA</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
