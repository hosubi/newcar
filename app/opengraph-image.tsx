import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "새차만들기 - 부산 사상 자동차 광택·세차 전문";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at 30% 20%, rgba(37, 99, 235, 0.15) 0%, transparent 50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at 70% 80%, rgba(37, 99, 235, 0.1) 0%, transparent 40%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 28px",
            borderRadius: "50px",
            background: "rgba(37, 99, 235, 0.15)",
            border: "1px solid rgba(37, 99, 235, 0.3)",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#2563eb",
            }}
          />
          <span style={{ color: "#60a5fa", fontSize: "24px", fontWeight: 700 }}>
            부산 사상 광택·세차 전문
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{ fontSize: "80px" }}>🚗</span>
            <h1
              style={{
                fontSize: "88px",
                fontWeight: 900,
                color: "white",
                margin: 0,
                letterSpacing: "-2px",
              }}
            >
              새차만들기
            </h1>
          </div>

          <p
            style={{
              fontSize: "36px",
              color: "#9ca3af",
              margin: 0,
              fontWeight: 600,
            }}
          >
            광택 · 스팀세차 · 실내세차 · 유리막코팅
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "40px",
          }}
        >
          {["프리미엄 광택", "스팀세차", "유리막코팅"].map((text) => (
            <div
              key={text}
              style={{
                padding: "14px 28px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "white",
                fontSize: "24px",
                fontWeight: 700,
              }}
            >
              {text}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
            marginTop: "48px",
            padding: "24px 48px",
            borderRadius: "20px",
            background: "rgba(37, 99, 235, 0.1)",
            border: "1px solid rgba(37, 99, 235, 0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "32px" }}>📞</span>
            <span
              style={{
                fontSize: "40px",
                fontWeight: 900,
                color: "#2563eb",
              }}
            >
              051-326-9316
            </span>
          </div>
          <div
            style={{
              width: "2px",
              height: "40px",
              background: "rgba(255, 255, 255, 0.2)",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "32px" }}>📍</span>
            <span style={{ fontSize: "28px", color: "#d1d5db", fontWeight: 600 }}>
              부산 사상구
            </span>
          </div>
        </div>

        <p
          style={{
            position: "absolute",
            bottom: "32px",
            fontSize: "22px",
            color: "#6b7280",
            fontWeight: 500,
          }}
        >
          새차만들기 · 부산 사상
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
