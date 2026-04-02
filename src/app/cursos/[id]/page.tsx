import { APIyoutube } from "@/shared/services/api-youtube";
import Link from "next/link";

interface Props {
    params: { id: string }
}

export default async function PageCursoDetail({ params }: Props) {
    const { id } = await params;
    const courseDetails = await APIyoutube.course.getById(id);

    const url_watch = `${courseDetails.id}`;

    return (
        <main>
            <div className="flex justify-center mt-10">
                <div className="w-120 text-center">
                    <div>
                        <img src={courseDetails.image} alt="image" width={480} height={360} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--text-primary)]">{courseDetails.title}</h1>
                        <p className="text-[var(--text-secundary)]">{courseDetails.description}</p>
                    </div>
                    <div>
                        <Link href={`/cursos/play/${url_watch}`}><button className="border border-black w-full mt-10 rounded-sm p-2 text-xl bg-[#00C002] font-bold hover:bg-[#00C002] cursor-pointer transition text-white">Começar Recomendação</button></Link>
                    </div>
                </div>
            </div>
        </main>
    );
};
