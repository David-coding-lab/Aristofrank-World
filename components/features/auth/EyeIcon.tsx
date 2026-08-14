"use client"

interface EyeIconProps {
  show: boolean
  onToggle: () => void
}

export function EyeIcon({ show, onToggle }: EyeIconProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="min-h-[44px] min-w-[44px] flex items-center justify-center"
      aria-label={show ? "Hide password" : "Show password"}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes slashIn {
            0% { stroke-dashoffset: 100; opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 1; }
          }
          @keyframes slashOut {
            0% { stroke-dashoffset: 0; opacity: 1; }
            100% { stroke-dashoffset: 100; opacity: 0; }
          }
        `}</style>
        <path
          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
          fill="#9CA3AF"
        />
        <path
          d="M12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5ZM12 17.5C9.24 17.5 7 15.26 7 12.5C7 9.74 9.24 7.5 12 7.5C14.76 7.5 17 9.74 17 12.5C17 15.26 14.76 17.5 12 17.5Z"
          fill="#9CA3AF"
        />
        <line
          x1="4"
          y1="4"
          x2="20"
          y2="20"
          stroke="#9CA3AF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="100"
          strokeDashoffset="0"
          style={{
            animation: show
              ? "slashOut 0.3s ease-in-out forwards"
              : "slashIn 0.3s ease-in-out forwards",
          }}
        />
      </svg>
    </button>
  )
}
