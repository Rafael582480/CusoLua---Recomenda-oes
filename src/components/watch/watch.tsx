
interface watch_play {
    videoUrl: string;
}

export function Watch_play({ videoUrl }: watch_play) {

    return (
        <iframe
            src={videoUrl}
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="h-150 w-full"
            allowFullScreen
            title="YouTube video player"
        />
    );
}