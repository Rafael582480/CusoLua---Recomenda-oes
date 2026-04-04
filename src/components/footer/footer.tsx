export function Footer() {
    return (
    <footer className="bg-[var(--components-color)] mt-10 p-10 text-center">
            <div className="flex flex-col md:flex-row justify-center items-center gap-5">
                <h1 className="font-bold text-4xl text-[var(--text-primary)] rounded-lg">CODE<span className="text-[#00E002]">LUA</span></h1>
                
                <div className="text-[var(--text-primary)]">
                    <ul className="text-left">
                        <li>Esse webSite pega videos de canais, e recomenda eles;</li>
                        <li>Os videos não sao nossos;</li>
                        <li>E deixe like e se-inscreva no canal deles.</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}