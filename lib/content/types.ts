/** Serializable view models shared between Prisma queries and UI components. */

export interface ArtistSummary {
  id: string
  name: string
  genre: string[]
  profileUrl: string
  profileImage: string
}

export interface ArtistDetail extends ArtistSummary {
  bio: string
}

export interface MusicSummary {
  id: string
  title: string
  description: string
  audioUrl: string
  coverImage: string
  artistProfileUrl: string
  duration: string
}

export interface TrackSummary {
  id: string
  title: string
  artist: string
  cover: string
  duration: string
}

export interface EventSummary {
  id: string
  title: string
  date: string
  description: string
  location: string
  ticketPrice: number
  availableTickets: number
  coverImage: string
}

export interface MediaSummary {
  id: string
  title: string
  thumbnailImage: string
  sourceUrl: string
  category: string
}

export interface VideoSummary {
  id: string
  title: string
  thumbnailImage: string
  videoUrl: string
}

export interface TestimonialSummary {
  id: string
  name: string
  comment: string
  rating: number
  company: string | null
}

export interface TeamMemberSummary {
  id: string
  name: string
  role: string
  bio: string
  imageUrl: string
}
