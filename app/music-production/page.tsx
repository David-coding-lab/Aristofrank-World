import { SiteHeader } from "@/components/features/layout/SiteHeader";
import { SiteFooter } from "@/components/features/layout/SiteFooter";
import MusicBanner from '@/components/features/music-production/MusicBanner'
import RecentProjects from "@/components/features/music-production/RecentProjects";
import Link from 'next/link'
import ArtistsCard from '@/components/features/music-production/ArtistsCard'

function MusicProduction() {
    const artists = [
        {
            id: 1,
            name: "Luna",
            roles: "Songwriter, Acoustic Singer, Gospel Singer",
            image: "https://images.unsplash.com/photo-1765506255227-2feaa9bd58ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
            link: "/artist/luna",
        },
        {
            id: 2,
            name: "David Okoro",
            roles: "Producer, Mixing Engineer",
            image: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
            link: "/artist/david-okoro",
        },
        {
            id: 3,
            name: "Amara",
            roles: "Vocalist, Songwriter",
            image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
            link: "/artist/amara",
        },
    ];

  return (
    <div className="w-full h-fit bg-primary">
        <SiteHeader />

        <main className="mx-auto max-w-6xl p-6">
            <MusicBanner
                songName="Midnight Drive"
                songDescription="Full track production for emerging artist 'Luna'. A blend of synth-wave and modern pop, crafted to make an impact."
                songPlayLink="/productions/midnight-drive"
                songImage="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
            />
        </main>


        <div className="mx-auto mt-20 max-w-6xl py-6 flex justify-between items-center">
            <h3
                className="font-['Open_Sans',sans-serif] text-2xl
                font-bold leading-tight text-white
                sm:text-3xl lg:text-2xl"
            >
                Top Artists
            </h3>        


            <Link href='/artist'>
                <p className='text-accent'>
                    See More
                </p>
            </Link>

        </div>

        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3 pb-10">
            {artists.map((artist) => (
                <ArtistsCard
                    key={artist.id}
                    artistName={artist.name}
                    artistRoles={artist.roles}
                    artistImage={artist.image}
                    artistLink={artist.link}
                />
            ))}
        </div>

        <div className="mx-auto mt-20 max-w-6xl py-10 flex justify-between items-center">
        
            <h3
                className="font-['Open_Sans',sans-serif] text-2xl
                font-bold leading-tight text-white
                sm:text-3xl lg:text-2xl"
            >
                Recent Projects
            </h3>        
        </div>

        <RecentProjects />
        <SiteFooter />
    </div>
  )
}

export default MusicProduction