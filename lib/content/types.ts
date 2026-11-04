/** Serializable view models shared between Prisma queries and UI components. */

export interface ArtistSummary {
  id: string
  slug: string
  name: string
  roles: string
  imageUrl: string
  externalUrl: string | null
}

export interface ArtistDetail extends ArtistSummary {
  bio: string
  socialLinks: string[]
}

export interface TrackSummary {
  id: string
  title: string
  artistName: string
  coverUrl: string
  audioUrl: string | null
  duration: string
  description: string | null
}

export interface EventSummary {
  id: string
  slug: string
  title: string
  description: string
  imageUrl: string
  startsAt: string
  venue: string
  city: string
  ticketUrl: string | null
  formattedDate?: string
}

export interface MediaSummary {
  id: string
  slug: string
  title: string
  excerpt: string
  coverUrl: string
  videoUrl: string | null
  category: string
  publishedAt: string
}

export interface TestimonialSummary {
  id: string
  quote: string
  name: string
  role: string
  rating: number
}

export interface TeamMemberSummary {
  id: string
  name: string
  role: string
  bio: string
  imageUrl: string
}
