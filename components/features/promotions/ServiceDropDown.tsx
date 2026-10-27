
"use client";

import { useState } from "react";

interface ServiceDropDownProps {
  service: string;
  description: string;
}

function ServiceDropDown({
  service,
  description,
}: ServiceDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border-t border-[#3A382C] py-5">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
      >
        <h3 className="font-['Open_Sans'] text-base font-semibold text-white sm:text-lg">
          {service}
        </h3>

        <span
          className="material-symbols-outlined shrink-0 text-2xl text-white transition-transform duration-300"
          aria-hidden="true"
        >
          {isOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          isOpen
            ? "mt-3 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="font-['Open_Sans'] text-sm font-semibold leading-6 text-[#908F8B] sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ServiceDropDown;
