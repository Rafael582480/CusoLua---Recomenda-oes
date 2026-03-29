import { ChallengeInfo, ChallengeCard } from "../challengesCard/Challenge";

interface challengesInfos {
    desafios: ChallengeInfo[],
}

export function OrganizationCard({ desafios }: challengesInfos) {
    return (
        <div className="w-2/3">
            <ul className="flex flex-col">
                {desafios.map((item, index) => (
                    <li key={index}>
                        <ChallengeCard
                            id={item.id}
                            index={index}
                            nome={item.nome}
                            descricao={item.descricao}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}