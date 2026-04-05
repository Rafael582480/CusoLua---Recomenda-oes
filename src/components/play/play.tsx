"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export interface Video {
    index: number,
    title: string,
    id_video: string,
};


export function Play({ title, id_video }: Video) {
    const [progress, setProgress] = useState<string[]>([]);

    useEffect(() => {
        const storedProgress = localStorage.getItem("videoProgress");
        if (storedProgress) {
            setProgress(...[JSON.parse(storedProgress)]);
        }
    }, []);

    return (
        <div className="cursor-pointer h-20 w-full text-[var(--text-secondary)] font-medium flex gap-4 items-center">
            {progress.includes(id_video) ? (
                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
            ) : (
                <FontAwesomeIcon icon={faPlay} className="text-green-500" />
            )}
            <h2 className="text-sm">{title}</h2>
        </div>
    );
}
