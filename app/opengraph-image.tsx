import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Aristofrank World — Where Brands Become Legends"

/** Site-wide OG image: embeds the designed artwork in a 1200×630 canvas. */
export default async function Image() {
  const imageData = await readFile(
    join(process.cwd(), "app/assets/og-image.png"),
    "base64"
  )

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#181711",
      }}
    >
      <img
        src={`data:image/png;base64,${imageData}`}
        alt={alt}
        style={{ height: "100%", objectFit: "contain" }}
      />
    </div>,
    { ...size }
  )
}
