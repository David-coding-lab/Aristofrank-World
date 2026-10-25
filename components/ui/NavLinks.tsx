
"use client";

import { useState } from "react";

interface NavLinksProps {
  links: string[];
  defaultActive?: string;
  onChange?: (link: string) => void;
}

function NavLinks({
  links,
  defaultActive,
  onChange,
}: NavLinksProps) {
  const [activeLink, setActiveLink] = useState(
    defaultActive ?? links[0] ?? ""
  );

  const handleClick = (link: string) => {
    setActiveLink(link);
    onChange?.(link);
  };

  return (
    <nav className="flex flex-wrap items-center gap-2 sm:gap-3">
      {links.map((link) => (
        <button
          key={link}
          type="button"
          onClick={() => handleClick(link)}
          aria-pressed={activeLink === link}
          className={`
            rounded-lg px-3 py-1.5
            sm:px-4 sm:py-2
            text-xs sm:text-sm md:text-base
            font-['Open_Sans',sans-serif] font-semibold
            whitespace-nowrap transition-colors duration-200
            ${
              activeLink === link
                ? "bg-accent text-[#171611]"
                : "bg-[#393628] text-white hover:bg-[#4A4737]"
            }
          `}
        >
          {link}
        </button>
      ))}
    </nav>
  );
}

export default NavLinks;
