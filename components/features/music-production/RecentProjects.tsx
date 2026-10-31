"use client";
import TrackList from "@/components/features/music-production/TrackList"
import MusicPlayer from "@/components/features/music-production/MusicPlayer"

import { useState } from "react";


export default function RecentProjects() {
    const tracks: Track[] = [
        { id: 1, title: "Urban Curves", artist: "Gg boy", cover: "https://images.unsplash.com/photo-1761048152542-50fb008820ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D", duration: "3:00" },
        { id: 2, title: "I See Fire", artist: "Franklin George", cover: "https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D", duration: "5:00" },
        { id: 3, title: "For Your Love", artist: "Gg boy", cover: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D", duration: "17:34" },
        { id: 4, title: "It's Mine", artist: "Luna", cover: "https://images.unsplash.com/photo-1762465001109-1eaf70eec4bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D", duration: "4:12" },
    ];
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  return (
    <div className="mx-auto max-w-6xl mb-20">
         <MusicPlayer
            track={currentTrack}
            progress={35}
            onClose={() => setCurrentTrack(null)}
        />
        <TrackList tracks={tracks} onSelectTrack={setCurrentTrack} />
    </div>
  );
}