import { IcardInfos, Card } from "@/components/cards/Card";

interface IsectionInfos {
    items: IcardInfos[];
};

export function Section({ items }: IsectionInfos) {
    return (
        <section className="flex flex-col items-center mt-20">
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">Cursos <span className="text-[var(--color-primary)]">Recomendados!</span></h1>
            <ul className="grid mt-10 lg:grid-cols-full md:grid-cols-3 gap-1">
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
        </section>
    );
};