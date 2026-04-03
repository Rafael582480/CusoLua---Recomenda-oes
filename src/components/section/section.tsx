import { IcardInfos, Card } from "@/components/cards/Card";

interface IsectionInfos {
    items: IcardInfos[];
};

export function Section({ items }: IsectionInfos) {
    return (
        <section className="flex flex-col items-center mt-20">
            <div>
                <h1 className="text-4xl ml-5 md:ml-0 md:text-5xl font-bold text-start text-white font-mono">Cursos <span className="text-[#00E002]">Recomendados!</span></h1>
                <div className="flex justify-center">
                    <ul className="grid mt-10 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {items.map(item => (
                            <li key={item.title}>
                                <Card
                                    description={item.description}
                                    href={item.href}
                                    image={item.image}
                                    title={item.title}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};