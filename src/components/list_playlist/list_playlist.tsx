"use client";

import { Play, Video } from "@/components/play/play";
import { Watch_play } from "../watch/watch";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment, faEye } from "@fortawesome/free-solid-svg-icons";

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
    const [progress, setProgress] = useState<string[]>([]);

    function trading_watch(index: number) {
        return setI(index);
    }

    function saveProgress(videoId: string, value: boolean = true) {
        if (value) {
            const newProgress = [...progress, videoId];
            setProgress(newProgress);
            localStorage.setItem("videoProgress", JSON.stringify(newProgress));
        } else {
            const newProgress = progress.filter(id => id !== videoId);
            setProgress(newProgress);
            localStorage.setItem("videoProgress", JSON.stringify(newProgress));
        }
    }

    useEffect(() => {
        const storedProgress = localStorage.getItem("videoProgress");
        if (storedProgress) {
            setProgress(...[JSON.parse(storedProgress)]);
        }
    }, []);

    return (
        <>
            <section className="w-screen mt-5 flex lg:flex-row flex-col md:flex-col justify-evenly">
                <div className="lg:w-5/6 mb-20">
                    <Watch_play
                        videoUrl={format_watch}
                    />
                    <div className="grid lg:flex gap-5 m-auto mt-3 bg-[var(--components-color)] w-4/4 md:w-3/4 p-5 rounded-lg">
                        <div className="flex gap-2 items-center text-[var(--text-secondary)]">
                            <FontAwesomeIcon className="text-[var(--color-primary)] text-sm md:text-base" icon={faEye} />
                            <h1 className="text-xs md:text-base">{views} Visualizaçao</h1>
                        </div>
                        <div className="flex gap-2 items-center text-[var(--text-secondary)]">
                            <FontAwesomeIcon className="text-[var(--color-primary)] text-sm md:text-base" icon={faThumbsUp} />
                            <h1 className="text-xs md:text-base">{likes} Curtidas</h1>
                        </div>
                        <div className="flex gap-2 items-center text-[var(--text-secondary)]">
                            <FontAwesomeIcon className="text-[var(--color-primary)] text-sm md:text-base" icon={faComment} />
                            <h1 className="text-xs md:text-base">{comment} Comentarios</h1>
                        </div>
                        <div>
                            {progress.includes(id_video) ? (
                                <h1 onClick={() => saveProgress(id_video, false)} className="cursor-pointer text-xs md:text-base text-green-500 font-bold">Assistido</h1>
                            ) : (
                                <button onClick={() => saveProgress(id_video, true)} className="cursor-pointer text-xs md:text-base text-blue-500 font-bold">Marcar como Assistido</button>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-5 m-auto mt-3 bg-[var(--components-color)] w-4/4 md:w-3/4 p-5 rounded-lg">
                        <div className="w-full">
                            <h1 className="text-[var(--text-secondary)] font-bold text-lg">Descrição</h1>
                            <p className=" text-[var(--text-secondary)] mt-2">{course.classGroup[0].classes[i].description}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full lg:w-1/3">
                    <div className="w-1/4 flex flex-col gap-3 w-full pl-2 pr-2 pb-3 rounded-lg">
                        <div className="bg-[var(--components-color)] w-full text-[var(--text-primary)] p-5">
                            <h1 className="font-bold text-xl ">Conteudo do <span className="text-[var(--color-primary)]">Curso</span></h1>
                        </div>
                    </div>
                    <div className="overflow-y-auto h-1/2">
                        <ul>
                            {infos.map((info, idx) => (
                                <li className={`flex flex-col justify-center hover:bg-[var(--card-color)] border-b-2 border-[var(--border-color)] ml-2 mr-2`} onClick={() => trading_watch(idx)} key={idx}>
                                    <Play
                                        index={idx + 1}
                                        id_video={course.classGroup[0].classes[idx].videoId}
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