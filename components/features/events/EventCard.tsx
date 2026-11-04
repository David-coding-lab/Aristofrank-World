"use client"

import { useState } from "react"
import NavLinks from "@/components/ui/NavLinks"
import Cards from "@/components/features/events/Card"
import type { EventSummary } from "@/lib/content/types"

interface EventCardProps {
  events: EventSummary[]
}

const EVENTS_PER_PAGE = 6

function EventCard({ events }: EventCardProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE)

  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE
  const visibleEvents = events.slice(
    startIndex,
    startIndex + EVENTS_PER_PAGE
  )

  if (visibleEvents.length === 0) {
    return (
      <p className="mx-auto max-w-7xl px-4 py-12 text-center text-sand">
        No upcoming events at the moment.
      </p>
    )
  }

  return (
    <section className="w-full">
      <div className="flex justify-start">
        <NavLinks
          links={["All", "News", "Opinion", "Culture"]}
          defaultActive="All"
        />
      </div>

      <div
        className="mx-auto mt-10 grid w-full max-w-7xl
          grid-cols-1 items-stretch gap-6 px-4
          sm:grid-cols-2 sm:px-6
          lg:grid-cols-3 lg:gap-8 lg:px-8"
      >
        {visibleEvents.map((event) => (
          <Cards
            key={event.id}
            eventImage={event.imageUrl}
            eventDate={event.formattedDate ?? new Date(event.startsAt).toDateString()}
            eventTitle={event.title}
            eventDescription={event.description}
            eventLocation={`${event.venue}, ${event.city}`}
            ticketUrl={event.ticketUrl ?? undefined}
          />
        ))}
      </div>

      {totalPages > 1 && (
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
            const page = index + 1
            const isActive = currentPage === page

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
            )
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
      )}
    </section>
  )
}

export default EventCard