import { ImageResponse } from "next/og";

export const alt = "Two Element Media — Cape Town studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#000",
          color: "#fff",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 48,
            border: "1px solid rgba(255,255,255,0.16)",
            display: "flex",
            padding: 56,
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 22,
                letterSpacing: 8,
                textTransform: "uppercase",
                opacity: 0.7,
              }}
            >
              TWO ELEMENT MEDIA
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 72,
                lineHeight: 1.02,
                marginTop: 28,
                fontWeight: 600,
                letterSpacing: -2,
              }}
            >
              <div style={{ display: "flex" }}>Two elements.</div>
              <div style={{ display: "flex" }}>One studio.</div>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 24,
                fontSize: 24,
                opacity: 0.72,
              }}
            >
              Cape Town · content, social, paid media, web
            </div>
          </div>
          <svg width="220" height="180" viewBox="0 0 48 40">
            <polygon
              points="16,3 31,31 1,31"
              stroke="#fff"
              strokeWidth="1.4"
              fill="none"
            />
            <polygon
              points="32,9 47,37 17,37"
              stroke="#fff"
              strokeWidth="1.4"
              fill="none"
            />
          </svg>
        </div>
      </div>
    ),
    size,
  );
}
