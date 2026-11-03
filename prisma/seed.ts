import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? "",
})
const prisma = new PrismaClient({ adapter })

/**
 * Seed content mirrors the placeholders that previously lived inside page
 * components. Replace it with the agency's real catalogue before launch.
 */
const artists = [
  {
    slug: "ambers",
    name: "Ambers Marthy",
    roles: "Gospel Musician",
    bio: "Ambers Marthy writes gospel music about faith, hope, and the quiet strength found in worship.",
    imageUrl:
      "https://images.unsplash.com/photo-1503853585905-d53f628e46ac?q=80&w=1886&auto=format&fit=crop",
    featured: false,
    order: 0,
  },
  {
    slug: "sam",
    name: "Sam Allin",
    roles: "Hip hop Musician",
    bio: "Sam Allin is a hip-hop artist building sharp, story-driven records from the ground up.",
    imageUrl:
      "https://images.unsplash.com/photo-1543379344-402b42ddbe8a?w=500&auto=format&fit=crop&q=60",
    featured: false,
    order: 1,
  },
  {
    slug: "jax",
    name: "Jax Ryder",
    roles: "Abstract Visual Artist",
    bio: "Jax Ryder creates abstract visual work that turns colour and texture into a brand language.",
    imageUrl:
      "https://images.unsplash.com/photo-1618673747378-7e0d3561371a?q=80&w=627&auto=format&fit=crop",
    featured: false,
    order: 2,
  },
  {
    slug: "max",
    name: "Max Tailor",
    roles: "Abstract Visual Artist",
    bio: "Max Tailor works across large-scale abstraction, installation, and art direction.",
    imageUrl:
      "https://images.unsplash.com/photo-1595971294624-80bcf0d7eb24?q=80&w=1169&auto=format&fit=crop",
    featured: false,
    order: 3,
  },
  {
    slug: "jonny",
    name: "Jonny Rodgers",
    roles: "Acoustic Musician",
    bio: "Jonny Rodgers is an acoustic musician whose live sets centre on intimate storytelling.",
    imageUrl:
      "https://images.unsplash.com/photo-1767462454361-81ef7690aea8?q=80&w=689&auto=format&fit=crop",
    externalUrl: "https://imafes.com",
    featured: false,
    order: 4,
  },
  {
    slug: "mazy",
    name: "Mazy Rumbers",
    roles: "Pop Artist",
    bio: "Mazy Rumbers makes bright, melodic pop built for wide rooms and repeat listens.",
    imageUrl:
      "https://images.unsplash.com/photo-1545224144-b38cd309ef69?q=80&w=687&auto=format&fit=crop",
    featured: false,
    order: 5,
  },
  {
    slug: "luna",
    name: "Luna",
    roles: "Songwriter, Acoustic Singer, Gospel Singer",
    bio: "Luna is a songwriter and acoustic singer blending gospel roots with a modern pop sensibility.",
    imageUrl:
      "https://images.unsplash.com/photo-1765506255227-2feaa9bd58ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    featured: false,
    order: 6,
  },
  {
    slug: "david-okoro",
    name: "David Okoro",
    roles: "Producer, Mixing Engineer",
    bio: "David Okoro is a producer and mixing engineer shaping records from first idea to final master.",
    imageUrl:
      "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    featured: false,
    order: 7,
  },
  {
    slug: "amara",
    name: "Amara",
    roles: "Vocalist, Songwriter",
    bio: "Amara is a vocalist and songwriter known for warm, precise performances and honest lyrics.",
    imageUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    featured: false,
    order: 8,
  },
  {
    slug: "lucy-ambers",
    name: "Lucy Ambers",
    roles: "Pop musician",
    bio: "Franklin George is a gospel artist whose music celebrates faith, hope, and the joy of worship. With a heartfelt approach to his craft, he shares messages of encouragement, drawing on the love and grace at the heart of the gospel.",
    imageUrl:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    featured: false,
    order: 9,
  },
  {
    slug: "adeola-bamidele",
    name: "Adeola Bamidele",
    roles: "Afrobeats Artist",
    bio: "Adeola Bamidele is an Afrobeats artist represented by Aristofrank World.",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    featured: true,
    order: 10,
  },
  {
    slug: "emeka-obi",
    name: "Emeka Obi",
    roles: "Music Producer",
    bio: "Emeka Obi is a music producer building records with artists across the Aristofrank roster.",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    featured: true,
    order: 11,
  },
  {
    slug: "zara-mensah",
    name: "Zara Mensah",
    roles: "Visual Artist",
    bio: "Zara Mensah is a visual artist working at the intersection of identity, colour, and brand.",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    featured: true,
    order: 12,
  },
  {
    slug: "chuka-nwosu",
    name: "Chuka Nwosu",
    roles: "Film Director",
    bio: "Chuka Nwosu is a film director creating cinematic brand stories and music visuals.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    featured: true,
    order: 13,
  },
] as const

const events = [
  {
    slug: "brand-master-conference",
    title: "Brand Master Conference",
    description:
      "An exclusive conference for industry leaders to discuss the future of brand building, culture, and marketing.",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60",
    startsAt: new Date("2027-02-20T10:00:00.000Z"),
    endsAt: new Date("2027-02-20T17:00:00.000Z"),
    venue: "Wuse",
    city: "Abuja",
    status: "PUBLISHED" as const,
  },
  {
    slug: "creative-design-masterclass",
    title: "Creative Design Masterclass",
    description:
      "A hands-on session on building visual identities that hold up across print, digital, and live experiences.",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60",
    startsAt: new Date("2027-04-17T10:00:00.000Z"),
    endsAt: new Date("2027-04-17T15:00:00.000Z"),
    venue: "Wuse",
    city: "Abuja",
    status: "PUBLISHED" as const,
  },
  {
    slug: "artist-showcase-night",
    title: "Artist Showcase Night",
    description:
      "An evening of live performances from the Aristofrank World roster and invited collaborators.",
    imageUrl:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&auto=format&fit=crop&q=60",
    startsAt: new Date("2027-06-12T18:00:00.000Z"),
    endsAt: new Date("2027-06-12T22:00:00.000Z"),
    venue: "Wuse",
    city: "Abuja",
    status: "PUBLISHED" as const,
  },
]

const mediaPosts = [
  {
    slug: "aristofrank-in-forbes",
    title: "Aristofrank in Forbes: Redefining Brand Legacies",
    excerpt:
      "A look at how Aristofrank World is reframing the relationship between brand strategy and lasting cultural impact.",
    coverUrl:
      "https://images.unsplash.com/photo-1554200876-980213841c94?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    category: "News",
    publishedAt: new Date("2026-10-28T09:00:00.000Z"),
  },
  {
    slug: "the-art-of-legendary-branding",
    title: "Video: The Art of Legendary Branding",
    excerpt:
      "Our creative team breaks down the decisions that turn a recognisable brand into an enduring one.",
    coverUrl:
      "https://images.unsplash.com/photo-1632860425102-996bc3c4a1f4?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    category: "Opinion",
    publishedAt: new Date("2026-10-20T09:00:00.000Z"),
  },
  {
    slug: "new-partnership-announcement",
    title: "Press Release: Announcing Our New Partnership",
    excerpt:
      "Aristofrank World joins forces with a new partner to expand its artist management and production work.",
    coverUrl:
      "https://images.unsplash.com/photo-1652819674544-a284366b1d0d?q=80&w=453&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    category: "News",
    publishedAt: new Date("2026-10-12T09:00:00.000Z"),
  },
  {
    slug: "a-brand-reborn",
    title: "Case Study: A Brand Reborn, From Bottom to Surface",
    excerpt:
      "How a full identity reset helped a heritage business speak clearly to a new generation.",
    coverUrl:
      "https://images.unsplash.com/photo-1554220201-4422cb484baa?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    category: "Culture",
    publishedAt: new Date("2026-09-30T09:00:00.000Z"),
  },
  {
    slug: "behind-the-scenes-legendary-campaign",
    title: "Behind the Scenes: A Legendary Campaign",
    excerpt:
      "From first moodboard to final cut, a look inside the production of a recent campaign.",
    coverUrl:
      "https://images.unsplash.com/photo-1711473610014-0505db6f6702?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    category: "Culture",
    publishedAt: new Date("2026-09-18T09:00:00.000Z"),
  },
  {
    slug: "crafting-a-global-identity",
    title: "How We Crafted a Global Identity",
    excerpt:
      "The thinking behind a visual system designed to travel across markets without losing its voice.",
    coverUrl:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=859&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    category: "Opinion",
    publishedAt: new Date("2026-09-05T09:00:00.000Z"),
  },
  {
    slug: "client-shoot-in-studio",
    title: "Video: Client Shoot in Studio, Sort Film",
    excerpt:
      "A short film from a recent studio shoot, captured during a two-day production sprint.",
    coverUrl:
      "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    category: "Culture",
    publishedAt: new Date("2026-08-22T09:00:00.000Z"),
  },
  {
    slug: "music-video-client-shoot",
    title: "Music Video: Client Shoot in Studio",
    excerpt:
      "A behind-the-scenes look at the lighting, set design, and direction behind a recent music video.",
    coverUrl:
      "https://images.unsplash.com/photo-1603126004251-d01882b9bfd3?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    category: "Culture",
    publishedAt: new Date("2026-08-08T09:00:00.000Z"),
  },
  {
    slug: "latest-creative-project",
    title: "Our Latest Creative Project",
    excerpt:
      "A first look at the identities, campaign assets, and film work shipped by the team this season.",
    coverUrl:
      "https://images.unsplash.com/photo-1637250096679-c10f2751def8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    category: "News",
    publishedAt: new Date("2026-07-25T09:00:00.000Z"),
  },
]

const testimonials = [
  {
    quote:
      "Aristofrank World didn't just rebrand us — they gave our story a heartbeat. Our audience finally sees us the way we always saw ourselves.",
    name: "Tunde Adebayo",
    role: "Founder, Adebayo Group",
    order: 0,
  },
  {
    quote:
      "Working with their team felt like joining a movement. We went from a local name to a nationally recognized label in under a year.",
    name: "Ngozi Eze",
    role: "CEO, Nova Records",
    order: 1,
  },
  {
    quote:
      "They treated our campaign like a film production. The attention to craft is on another level entirely.",
    name: "Kofi Mensah",
    role: "Creative Director, Kobe & Co",
    order: 2,
  },
  {
    quote:
      "From our visual identity to our stage presence, everything is now unmistakably ours. Legends, indeed.",
    name: "Amara Osei",
    role: "Recording Artist",
    order: 3,
  },
]

const team = [
  {
    name: "God's Power George",
    role: "Graphics Designer",
    bio: "Aristofrank the visionary leader who started it all, with a passion for transforming brands into market leaders.",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    order: 0,
  },
  {
    name: "Jane Doe",
    role: "Brand Strategist",
    bio: "Turns market insight into clear brand direction that helps clients stand out.",
    imageUrl:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    order: 1,
  },
  {
    name: "John Smith",
    role: "Creative Director",
    bio: "Leads our creative team in shaping bold, memorable visual identities.",
    imageUrl:
      "https://images.unsplash.com/photo-1624395213043-fa2e123b2656?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    order: 2,
  },
]

async function seedArtists() {
  for (const artist of artists) {
    await prisma.artist.upsert({
      where: { slug: artist.slug },
      update: artist,
      create: { ...artist, status: "PUBLISHED" },
    })
  }
}

async function seedTracks() {
  const luna = await prisma.artist.findUnique({ where: { slug: "luna" } })

  await prisma.track.deleteMany()
  await prisma.track.createMany({
    data: [
      {
        artistName: "Gg boy",
        title: "Urban Curves",
        coverUrl:
          "https://images.unsplash.com/photo-1761048152542-50fb008820ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        duration: "3:00",
        order: 0,
      },
      {
        artistName: "Franklin George",
        title: "I See Fire",
        coverUrl:
          "https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        duration: "5:00",
        order: 1,
      },
      {
        artistName: "Gg boy",
        title: "For Your Love",
        coverUrl:
          "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        duration: "17:34",
        order: 2,
      },
      {
        artistId: luna?.id ?? null,
        artistName: "Luna",
        title: "It's Mine",
        coverUrl:
          "https://images.unsplash.com/photo-1762465001109-1eaf70eec4bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        duration: "4:12",
        order: 3,
      },
      {
        artistId: luna?.id ?? null,
        artistName: "Luna",
        title: "Midnight Drive",
        description:
          "Full track production for emerging artist Luna. A blend of synth-wave and modern pop, crafted to make an impact.",
        coverUrl:
          "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        duration: "3:42",
        featured: true,
        order: 4,
      },
    ],
  })
}

async function seedEvents() {
  for (const event of events) {
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: event,
      create: event,
    })
  }
}

async function seedMedia() {
  for (const post of mediaPosts) {
    await prisma.mediaPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: { ...post, status: "PUBLISHED" },
    })
  }
}

async function seedTestimonialsAndTeam() {
  await prisma.testimonial.deleteMany()
  await prisma.testimonial.createMany({ data: testimonials })

  await prisma.teamMember.deleteMany()
  await prisma.teamMember.createMany({ data: team })
}

async function main() {
  await seedArtists()
  await seedTracks()
  await seedEvents()
  await seedMedia()
  await seedTestimonialsAndTeam()

  console.info(
    `Seeded ${artists.length} artists, ${events.length} events, ${mediaPosts.length} media posts, ${testimonials.length} testimonials, ${team.length} team members.`,
  )
}

main()
  .catch((error: unknown) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
