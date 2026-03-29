import "./globals.css";
import { Metadata } from "next";
import {Header} from "@/src/components/header/Header";
import { Footer } from "../components/footer/footer";
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;
library.add(faPlay);

export const metadata: Metadata = {
  title: "CodarLua, voce vai dominar Lua e Love2D",
  description: "CodarLua é um curso completo para aprender a programar em Lua e desenvolver jogos com Love2D. Com aulas práticas e projetos reais, você vai dominar as habilidades necessárias para criar seus próprios jogos e se destacar no mercado de desenvolvimento de jogos. Inscreva-se agora e comece sua jornada no mundo da programação de jogos!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background-color)]">
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
