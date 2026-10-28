import {SiteHeader} from '@/components/features/layout/SiteHeader'
import {SiteFooter} from '@/components/features/layout/SiteFooter'
import LoadMoreArtists from '@/components/features/artist/LoadMoreArtists'
import NavLinks from '@/components/ui/NavLinks'
import Link from 'next/link'

function Artists() {
   
    const artists = [
  {
    id: "1",
    artistName: "Ambers Marthy",
    artistSongStyle: "Gospel Musician",
    profileLink: "https://imafes.com",
    imageUrl:
      "https://images.unsplash.com/photo-1503853585905-d53f628e46ac?q=80&w=1886&auto=format&fit=crop",
  },
  {
    id: "2",
    artistName: "Sam Allin",
    artistSongStyle: "Hip hop Musician",
    profileLink: "https://imafes.com",
    imageUrl:
      "https://images.unsplash.com/photo-1543379344-402b42ddbe8a?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    artistName: "Jax Ryder",
    artistSongStyle: "Abstract Visual Artist",
    profileLink: "https://imafes.com",
    imageUrl:
      "https://images.unsplash.com/photo-1618673747378-7e0d3561371a?q=80&w=627&auto=format&fit=crop",
  },
  {
    id: "4",
    artistName: "Max Tailor",
    artistSongStyle: "Abstract Visual Artist",
    profileLink: "https://imafes.com",
    imageUrl:
      "https://images.unsplash.com/photo-1595971294624-80bcf0d7eb24?q=80&w=1169&auto=format&fit=crop",
  },
  {
    id: "5",
    artistName: "Jonny Rodgers",
    artistSongStyle: "Acoustic Musician",
    profileLink: "https://imafes.com",
    imageUrl:
      "https://images.unsplash.com/photo-1767462454361-81ef7690aea8?q=80&w=689&auto=format&fit=crop",
  },
  {
    id: "6",
    artistName: "Mazy Rumbers",
    artistSongStyle: "Pop Artist",
    profileLink: "https://imafes.com",
    imageUrl:
      "https://images.unsplash.com/photo-1545224144-b38cd309ef69?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "6",
    artistName: "Mazy Rumbers",
    artistSongStyle: "Pop Artist",
    profileLink: "https://imafes.com",
    imageUrl:
      "https://images.unsplash.com/photo-1545224144-b38cd309ef69?q=80&w=687&auto=format&fit=crop",
  },
];
  
return (
    <div className="w-full h-fit bg-primary ">
        <SiteHeader />
       
        {/* Hero section */}
        <section className="mx-auto mt-16 flex w-full max-w-6xl flex-col justify-start px-4 text-center sm:mt-20 sm:px-6">

            <h1
                className="
                max-w-6xl font-['Open_Sans',sans-serif] text-start
                text-3xl font-bold leading-tight text-white
                sm:text-4xl
                md:text-5xl
                lg:text-[60px] lg:leading-[1.35]
                "
            >
                Meet the Legends We’re Building
            </h1>

            <p
                className="
                mt-3 max-w-4xl font-['Open_Sans',sans-serif] text-start
                text-base font-semibold leading-relaxed text-sand
                sm:mt-4 sm:text-lg
                md:text-xl
                lg:leading-[1.4]
                "
            >
                A Curated Roaster of Our Icons Represented by Aristofrank World.
            </p>

            {/* Navigation links */}
            <div className="mt-10 mb-12 flex w-full justify-start sm:mt-12 sm:mb-16">
                <NavLinks
                links={["All", "Gospel Singers", "Song Writer", "Pop Artist"]}
                defaultActive="All"
                />
            </div>

        </section>
        <div className='mb-20'>        
            <LoadMoreArtists artists={artists}/>
        </div>

        <SiteFooter />
    </div>
  )
}

export default Artists;
