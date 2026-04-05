import { getVideoData } from "@/app/actions/video-actions";
import { List_playlist } from "@/components/list_playlist/list_playlist";
import { APIyoutube } from "@/shared/services/api-youtube";

interface Props {
    params: { id: string }
}

export default async function watch({ params }: Props) {
    const { id } = await params;
    const course = await getVideoData(id);
    const videosStats = await APIyoutube.course.getPlaylistVideosStats(id);

    return (
        <main>
            <section className="flex justify-between border m-auto w-full">
                <List_playlist
                    infos={course.classGroup[0].classes.map((course, idx) => ({
                        index: idx,
                        title: course.title,
                        description: course.description,
                        id_video: course.videoId || "",
                    }))}
                    url={course.id}
                    course={course}
                    videosStats={videosStats}
                />
            </section>
        </main>
    );
}
