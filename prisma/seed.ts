import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? '',
});
const prisma = new PrismaClient({ adapter });

/**
 * Seed content with the exact data models provided.
 * Replaces all previous placeholder content.
 */

const testimonials = [
  {
    id: 'testimonial-001',
    name: 'Sarah Johnson',
    comment:
      'Working with this team completely transformed my music career. Their attention to detail, industry connections, and dedication to my growth have been exceptional.',
    rating: 5,
    company: 'Independent Artist',
  },
  {
    id: 'testimonial-002',
    name: 'Michael Anderson',
    comment:
      'From branding to music distribution, every step was handled professionally. They understand what it takes to build a lasting brand in the entertainment industry.',
    rating: 5,
    company: 'SoundWave Records',
  },
  {
    id: 'testimonial-003',
    name: 'Grace Williams',
    comment:
      "I appreciate the creativity, consistency, and genuine support. They didn't just manage my music; they helped me discover my identity as an artist.",
    rating: 4,
    company: 'Independent Artist',
  },
];

const artists = [
  {
    id: 'artist-001',
    name: 'Alex Morgan',
    genre: ['Afrobeats', 'Afropop'],
    profileUrl: '/artists/alex-morgan',
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800',
    bio: 'Alex Morgan is an emerging Afrobeats artist blending contemporary African rhythms with soulful melodies. His music explores love, ambition, culture, and everyday experiences.',
  },
  {
    id: 'artist-002',
    name: 'Sophia Rivers',
    genre: ['R&B', 'Soul'],
    profileUrl: '/artists/sophia-rivers',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800',
    bio: 'Sophia Rivers is a soulful vocalist known for her expressive voice and emotionally driven songwriting. She combines modern R&B with timeless soul influences.',
  },
  {
    id: 'artist-003',
    name: 'Daniel Blake',
    genre: ['Hip-Hop', 'Rap'],
    profileUrl: '/artists/daniel-blake',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800',
    bio: 'Daniel Blake is a hip-hop artist whose music combines storytelling, energetic production, and thought-provoking lyrics inspired by his personal experiences.',
  },
];

const music = [
  {
    id: 'music-001',
    title: 'Midnight Dreams',
    description:
      'An atmospheric Afrobeats instrumental with smooth percussion, warm melodies, and an infectious rhythm.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
    artistProfileUrl: '/artists/alex-morgan',
    duration: '04:12',
  },
  {
    id: 'music-002',
    title: 'Lost in Your Eyes',
    description:
      'A soulful R&B record exploring love, vulnerability, and the beauty of meaningful connections.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    coverImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800',
    artistProfileUrl: '/artists/sophia-rivers',
    duration: '03:45',
  },
  {
    id: 'music-003',
    title: 'No Looking Back',
    description:
      'An energetic hip-hop track about ambition, resilience, and staying focused on your goals.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    coverImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800',
    artistProfileUrl: '/artists/daniel-blake',
    duration: '03:28',
  },
];

const videos = [
  {
    id: 'video-001',
    title: 'Behind the Music',
    thumbnailImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1000',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
  {
    id: 'video-002',
    title: 'The Creative Process',
    thumbnailImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1000',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
  {
    id: 'video-003',
    title: 'Live Performance Highlights',
    thumbnailImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1000',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
];

const media = [
  {
    id: 'media-001',
    title: 'Redefining the African Music Industry',
    thumbnailImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000',
    sourceUrl: 'https://www.instagram.com/',
    category: 'Press',
  },
  {
    id: 'media-002',
    title: 'Behind the Scenes: A New Sound',
    thumbnailImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1000',
    sourceUrl: 'https://www.youtube.com/',
    category: 'Interview',
  },
  {
    id: 'media-003',
    title: 'An Unforgettable Night of Music',
    thumbnailImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1000',
    sourceUrl: 'https://www.facebook.com/',
    category: 'Event Coverage',
  },
];

const events = [
  {
    id: 'event-001',
    title: 'The African Music Experience',
    date: new Date('2027-01-15T18:00:00.000Z'),
    description:
      'An unforgettable celebration of African music, featuring live performances, emerging talents, established artists, and special guest appearances.',
    location: 'Eko Convention Centre, Lagos, Nigeria',
    ticketPrice: 15000,
    availableTickets: 500,
    coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200',
  },
  {
    id: 'event-002',
    title: 'Sounds of the Future',
    date: new Date('2027-02-20T17:00:00.000Z'),
    description:
      'A platform for discovering emerging musical talents and celebrating the next generation of African creatives through live music and entertainment.',
    location: 'Landmark Event Centre, Lagos, Nigeria',
    ticketPrice: 10000,
    availableTickets: 300,
    coverImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200',
  },
  {
    id: 'event-003',
    title: 'The Music Industry Masterclass',
    date: new Date('2027-03-10T10:00:00.000Z'),
    description:
      'An educational and networking experience bringing together music executives, producers, artists, and creative entrepreneurs to discuss branding, distribution, marketing, and career development.',
    location: 'Radisson Blu Hotel, Lagos, Nigeria',
    ticketPrice: 25000,
    availableTickets: 150,
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200',
  },
];

async function seedTestimonials() {
  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({ data: testimonials });
}

async function seedArtists() {
  await prisma.artist.deleteMany();
  await prisma.artist.createMany({ data: artists });
}

async function seedMusic() {
  await prisma.music.deleteMany();
  await prisma.music.createMany({ data: music });
}

async function seedVideos() {
  await prisma.video.deleteMany();
  await prisma.video.createMany({ data: videos });
}

async function seedMedia() {
  await prisma.media.deleteMany();
  await prisma.media.createMany({ data: media });
}

async function seedEvents() {
  await prisma.event.deleteMany();
  await prisma.event.createMany({ data: events });
}

async function main() {
  await seedTestimonials();
  await seedArtists();
  await seedMusic();
  await seedVideos();
  await seedMedia();
  await seedEvents();

  console.info(
    `Seeded ${testimonials.length} testimonials, ${artists.length} artists, ${music.length} music tracks, ${videos.length} videos, ${media.length} media posts, ${events.length} events.`
  );
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
