import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

// Route segment config
export const runtime = "nodejs";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  try {
    const imagePath = path.join(process.cwd(), "public", "profileImg.png");
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = `data:image/png;base64,${imageBuffer.toString("base64")}`;

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
          }}
        >
          <img
            src={base64Image}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    console.error("Error generating dynamic favicon:", error);
    // Fallback: simple dark circle if image reading fails
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            background: "#171717",
            borderRadius: "50%",
          }}
        />
      ),
      {
        ...size,
      }
    );
  }
}
