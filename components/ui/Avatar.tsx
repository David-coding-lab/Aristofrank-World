import Image from "next/image"

// Deterministic palette so a given user always gets the same colour.
const AVATAR_COLORS = [
  "#181711",
  "#F2CC0D",
  "#3D7EA6",
  "#4E9F82",
  "#C2557A",
  "#6C5CE7",
  "#E58F65",
  "#2D1B69",
]

function colorForName(name: string): string {
  const seed = name.trim().charCodeAt(0) || 0
  return AVATAR_COLORS[seed % AVATAR_COLORS.length]
}

interface AvatarProps {
  /** User's display name — its first letter is used for the fallback avatar. */
  name: string
  /** Optional custom avatar image. When absent, a coloured initial is shown. */
  src?: string
  /** Rendered width/height in pixels (avatar is always a circle). */
  size?: number
  className?: string
}

/**
 * Circular avatar. Renders the user's uploaded image when `src` is provided,
 * otherwise falls back to the first letter of their name on a colour derived
 * from that name.
 */
export function Avatar({ name, src, size = 40, className = "" }: AvatarProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={`${name}'s avatar`}
        width={size}
        height={size}
        className={`rounded-full object-cover ${className}`}
      />
    )
  }

  const initial = name.trim().charAt(0).toUpperCase() || "?"

  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        backgroundColor: colorForName(name),
        fontSize: Math.round(size * 0.45),
      }}
      className={`inline-flex select-none items-center justify-center rounded-full font-semibold text-white ${className}`}
    >
      {initial}
    </span>
  )
}
