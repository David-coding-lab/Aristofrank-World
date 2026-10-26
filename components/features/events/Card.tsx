
"use client";

import Image from "next/image";

interface EventCardProps {
  eventImage: string;
  eventDescription: string;
  eventDate: string;
  eventTitle: string;
  eventLocation: string;
}

const Cards = ({
  eventImage,
  eventDescription,
  eventDate,
  eventTitle,
  eventLocation,
}: EventCardProps) => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-t-xl bg-[#211F10]">
      {/* Event image and dark overlay */}
      <div className="relative h-[190px] w-full">
        <Image
          src={eventImage}
          alt={eventDescription}
          fill
          sizes="(max-width: 640px) 100vw, 320px"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Event details */}
      <div className="flex flex-col px-5 pb-4 pt-5 text-start">
        <p className="font-['Open_Sans',sans-serif] text-sm fontu-bold text-accent">
          {eventDate}
        </p>

        <h3 className="mt-2 font-['Open_Sans',sans-serif] text-lg font-semibold leading-snug text-white">
          {eventTitle}
        </h3>

        <p className="mt-4 font-['Open_Sans',sans-serif] text-sm font-normal leading-snug text-sand">
          {eventDescription}
        </p>

        {/* Location */}
        <div className="mt-7 flex items-center gap-1 font-['Open_Sans',sans-serif] text-sm text-[#74726D]">
          <span
            className="material-symbols-outlined text-[18px]"
            aria-hidden="true"
          >
            location_on
          </span>

          <span>{eventLocation}</span>
        </div>

        {/* Ticket button */}
        <button
          type="button"
          className="mt-4 w-full cursor-pointer rounded-lg bg-accent px-4 py-3.5 font-['Open_Sans',sans-serif] text-sm font-semibold text-primary transition-opacity hover:opacity-85"
        >
          Buy Ticket
        </button>
      </div>
    </div>
  );
};

export default Cards;
