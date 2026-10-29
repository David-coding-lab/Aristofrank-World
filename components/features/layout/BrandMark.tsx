/** Triple-bar gold emblem used as the brand mark. */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      width="170"
      height="212"
      viewBox="0 0 170 212"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="32.8816" cy="106" rx="32.8816" ry="106" fill="#F2CC0D" />
      <ellipse cx="84.8011" cy="106" rx="32.8816" ry="106" fill="#F2CC0D" />
      <ellipse cx="136.72" cy="106" rx="32.8816" ry="106" fill="#F2CC0D" />
    </svg>
  )
}
