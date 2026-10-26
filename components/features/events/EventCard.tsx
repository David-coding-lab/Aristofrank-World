
"use client";

import { useState } from "react";
import NavLinks from "@/components/ui/NavLinks";
import Cards from "@/components/features/events/Card";

const events = [
  {
    id: "1",
    eventImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60",
    eventDate: "Oct 20, 2024",
    eventTitle: "Brand Master Conference",
    eventDescription:
      "An exclusive conference for industry leaders to discuss the future of Crypto and marketing",
    eventLocation: "Wuse, Abuja",
  },
  {
    id: "1",
    eventImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60",
    eventDate: "Oct 20, 2024",
    eventTitle: "Brand Master Conference",
    eventDescription:
      "An exclusive conference for industry leaders to discuss the future of Crypto and marketing",
    eventLocation: "Wuse, Abuja",
  },
  {
    id: "1",
    eventImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60",
    eventDate: "Oct 20, 2024",
    eventTitle: "Brand Master Conference",
    eventDescription:
      "An exclusive conference for industry leaders to discuss the future of Crypto and marketing",
    eventLocation: "Wuse, Abuja",
  },
  {
    id: "1",
    eventImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60",
    eventDate: "Oct 20, 2024",
    eventTitle: "Brand Master Conference",
    eventDescription:
      "An exclusive conference for industry leaders to discuss the future of Crypto and marketing",
    eventLocation: "Wuse, Abuja",
  },
  {
    id: "1",
    eventImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60",
    eventDate: "Oct 20, 2024",
    eventTitle: "Brand Master Conference",
    eventDescription:
      "An exclusive conference for industry leaders to discuss the future of Crypto and marketing",
    eventLocation: "Wuse, Abuja",
  },
  {
    id: "1",
    eventImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60",
    eventDate: "Oct 20, 2024",
    eventTitle: "Brand Master Conference",
    eventDescription:
      "An exclusive conference for industry leaders to discuss the future of Crypto and marketing",
    eventLocation: "Wuse, Abuja",
  },
  {
    id: "1",
    eventImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60",
    eventDate: "Oct 20, 2024",
    eventTitle: "Brand Master Conference",
    eventDescription:
      "An exclusive conference for industry leaders to discuss the future of Crypto and marketing",
    eventLocation: "Wuse, Abuja",
  },
  {
    id: "1",
    eventImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60",
    eventDate: "Oct 20, 2024",
    eventTitle: "Brand Master Conference",
    eventDescription:
      "An exclusive conference for industry leaders to discuss the future of Crypto and marketing",
    eventLocation: "Wuse, Abuja",
  },
  {
    id: "1",
    eventImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60",
    eventDate: "Oct 20, 2024",
    eventTitle: "Brand Master Conference",
    eventDescription:
      "An exclusive conference for industry leaders to discuss the future of Crypto and marketing",
    eventLocation: "Wuse, Abuja",
  },
  {
    id: "1",
    eventImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60",
    eventDate: "Oct 20, 2024",
    eventTitle: "Brand Master Conference",
    eventDescription:
      "An exclusive conference for industry leaders to discuss the future of Crypto and marketing",
    eventLocation: "Wuse, Abuja",
  },
  {
    id: "1",
    eventImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60",
    eventDate: "Oct 20, 2024",
    eventTitle: "Brand Master Conference",
    eventDescription:
      "An exclusive conference for industry leaders to discuss the future of Crypto and marketing",
    eventLocation: "Wuse, Abuja",
  },
  {
    id: "1",
    eventImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60",
    eventDate: "Oct 20, 2024",
    eventTitle: "Brand Master Conference",
    eventDescription:
      "An exclusive conference for industry leaders to discuss the future of Crypto and marketing",
    eventLocation: "Wuse, Abuja",
  },
  {
    id: "1",
    eventImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60",
    eventDate: "Oct 20, 2024",
    eventTitle: "Brand Master Conference",
    eventDescription:
      "An exclusive conference for industry leaders to discuss the future of Crypto and marketing",
    eventLocation: "Wuse, Abuja",
  },
  // Add more events here using the same structure.
];

const EVENTS_PER_PAGE = 6;

function EventCard() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);

  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const visibleEvents = events.slice(
    startIndex,
    startIndex + EVENTS_PER_PAGE
  );

  return (
    <section className="w-full">
      {/* Category navigation */}
      <div className="flex justify-start">
        <NavLinks
          links={["All", "News", "Opinion", "Culture"]}
          defaultActive="All"
        />
      </div>

      {/* Responsive event grid */}
      <div
        className="mx-auto mt-10 grid w-full max-w-7xl
          grid-cols-1 items-stretch gap-6 px-4
          sm:grid-cols-2 sm:px-6
          lg:grid-cols-3 lg:gap-8 lg:px-8"
      >
        {visibleEvents.map((event) => (
          <Cards
            key={event.id}
            eventImage={event.eventImage}
            eventDate={event.eventDate}
            eventTitle={event.eventTitle}
            eventDescription={event.eventDescription}
            eventLocation={event.eventLocation}
          />
        ))}
      </div>

      {/* Numbered pagination */}
      <nav
        aria-label="Event pagination"
        className="mt-12 mb-20 flex flex-wrap items-center
          justify-center gap-2 px-4"
      >
        <button
          type="button"
          onClick={() =>
            setCurrentPage((page) => Math.max(1, page - 1))
          }
          disabled={currentPage === 1}
          className="rounded-md border border-[#393628] px-3 py-2
            text-sm text-white transition-colors
            hover:bg-[#393628] disabled:cursor-not-allowed
            disabled:opacity-40"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          const isActive = currentPage === page;

          return (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              aria-current={isActive ? "page" : undefined}
              className={`min-w-10 rounded-md px-3 py-2
                text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-accent text-primary"
                    : "text-white hover:bg-[#393628]"
                }`}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() =>
            setCurrentPage((page) =>
              Math.min(totalPages, page + 1)
            )
          }
          disabled={currentPage === totalPages}
          className="rounded-md border border-[#393628] px-3 py-2
            text-sm text-white transition-colors
            hover:bg-[#393628] disabled:cursor-not-allowed
            disabled:opacity-40"
        >
          Next
        </button>
      </nav>
    </section>
  );
}

export default EventCard;
