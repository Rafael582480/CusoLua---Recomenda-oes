"use client";

import { Play, Video } from "@/components/play/play";
import { Watch_play } from "../watch/watch";
import { useState } from "react";

interface Course {
    classGroup: Array<{
        classes: Array<{
            videoId: string;
        }>;
    }>;
}

interface allVideos {
    infos: Video[];
    url: string;
    course: Course;
}

export function List_playlist({ infos, course }: allVideos) {
    const [i, setI] = useState(0);
    const id_video = course.classGroup[0].classes[i].videoId;
    const format_watch = `https://www.youtube.com/embed/${id_video}`;

    console.log(id_video);

    function trading_watch(index: number) {
        return setI(index);
    }

    return (
        <>
            <section className="w-screen flex lg:flex-row flex-col-reverse md:flex-col-reverse justify-evenly">
                <div className="flex flex-col w-full lg:w-1/3">
                    <div className="w-1/4 pt-2 flex flex-col gap-3 w-full">
                        <div className="bg-zinc-800 w-full text-white p-3">
                            <h1 className="font-bold text-lg">Aulas da Playlist</h1>
                        </div>
                    </div>
                    <ul>
                        {infos.map((info, idx) => (
                            <li data-watch={idx === i} className={`data-[watch=true]:bg-zinc-900`} onClick={() => trading_watch(idx)} key={idx}>
                                <Play
                                    index={idx + 1}
                                    title={info.title}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full lg:w-4/5">
                    <Watch_play
                        videoUrl={format_watch}
                    />
                </div>
            </section>
        </>
    );
}