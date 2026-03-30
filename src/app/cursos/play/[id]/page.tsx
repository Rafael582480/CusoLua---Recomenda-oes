import { getVideoData } from "@/app/actions/video-actions";
import { List_playlist } from "@/components/list_playlist/list_playlist";

interface Props {
    params: { id: string }
}

export default async function watch({ params }: Props) {
    const { id } = await params;
    const course = await getVideoData(id);

    return (
        <main>
            <section className="flex justify-between border m-auto w-full">
                <List_playlist
                    infos={course.classGroup[0].classes.map((course, idx) => ({
                        index: idx,
                        title: course.title,
                    }))}
                    url={course.id}
                    course={course}
                />
            </section>
        </main>
    );
}
