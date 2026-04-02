"use client";

import { Play, Video } from "@/components/play/play";
import { Watch_play } from "../watch/watch";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment, faEye } from "@fortawesome/free-solid-svg-icons";
import { watch } from "fs";

interface Course {
    classGroup: Array<{
        classes: Array<{
            videoId: string;
            description: string;
        }>;
    }>;
}


interface AllVideos {
    infos: Video[];
    url: string;
    course: Course;
    videosStats: Record<string, { views: string; likes: string; comment: string }>;
}

export function List_playlist({ infos, course, videosStats }: AllVideos) {
    const [i, setI] = useState(0);
    const id_video = course.classGroup[0].classes[i].videoId;
    const format_watch = `https://www.youtube.com/embed/${id_video}`;
    const currentStats = videosStats[id_video] || { views: "0", likes: "0", comment: "0" };
    const { views, likes, comment } = currentStats;

    function trading_watch(index: number) {
        return setI(index);
    }

    return (
        <>
            <section className="w-screen mt-5 flex lg:flex-row flex-col md:flex-col justify-evenly">
                <div className="w-full lg:w-5/6 mb-20">
                    <Watch_play
                        videoUrl={format_watch}
                    />
                    <div className="flex gap-5 m-auto mt-3 bg-[#0D0D0D] w-4/4 md:w-3/4 p-5 rounded-lg">
                        <div className="flex gap-2 items-center text-gray-300">
                            <FontAwesomeIcon className="text-[#00E002] text-sm md:text-base" icon={faEye} />
                            <h1 className="text-sm md:text-base">{views} Visualizaçao</h1>
                        </div>
                        <div className="flex gap-2 items-center text-gray-300">
                            <FontAwesomeIcon className="text-[#00E002] text-sm md:text-base" icon={faThumbsUp} />
                            <h1 className="text-sm md:text-base">{likes} Curtidas</h1>
                        </div>
                        <div className="flex gap-2 items-center text-gray-300">
                            <FontAwesomeIcon className="text-[#00E002] text-sm md:text-base" icon={faComment} />
                            <h1 className="text-sm md:text-base">{comment} Comentarios</h1>
                        </div>
                    </div>
                    <div className="flex gap-5 m-auto mt-3 bg-[#0D0D0D] w-4/4 md:w-3/4 p-5 rounded-lg">
                        <div>
                            <h1 className="text-gray-300 font-bold text-lg">Descrição</h1>
                            <p className="text-gray-300 mt-2">{course.classGroup[0].classes[i].description}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full lg:w-1/3">
                    <div className="w-1/4 flex flex-col gap-3 w-full pl-2 pr-2 pb-3 rounded-lg">
                        <div className="bg-zinc-800 w-full text-white p-5">
                            <h1 className="font-bold text-xl ">Conteudo do <span className="text-[#00E002]">Curso</span></h1>
                        </div>
                    </div>
                    <div className="overflow-y-auto h-1/2">
                        <ul>
                            {infos.map((info, idx) => (
                                <li className={`flex flex-col justify-center hover:bg-zinc-900 border-b-2 border-gray-600 ml-2 mr-2`} onClick={() => trading_watch(idx)} key={idx}>
                                    <Play
                                        index={idx + 1}
                                        title={info.title}
                                    />
                                    <h1 data-watch={idx === i} className={`ml-4 mb-2 -mt-5 bg-[#00E002] w-40 font-bold rounded-full text-center hidden data-[watch=true]:block`}>Reproduzindo</h1>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}