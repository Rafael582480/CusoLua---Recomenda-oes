import { APIyoutube } from "../shared/services/api-youtube";
import { Section } from "../components/section/section";
import ImageAnuncio from "../assets/image/Anuncio.png";
import ImageAnuncioMobile from "../assets/image/AnuncioMobile.png";
import ImageAnuncioMobileP from "../assets/image/AnuncioMobilep.png";


export default async function Home() {

  const courses = await APIyoutube.course.getAll();

  return (
    <main className="bg-[var(--background-color)]">
      <section className="flex justify-center mt-10">
        <picture>
          <source
            media="(max-width: 600px)"
            srcSet={ImageAnuncioMobileP.src}
          />
          <source
            media="(max-width: 1024px)"
            srcSet={ImageAnuncioMobile.src}
          />
          <img
            src={ImageAnuncio.src}
            className="rounded-lg"
            alt="Anúncio"
          />
        </picture>
      </section>
      <Section
        items={
          courses.map(course => ({
            title: course.title,
            description: course.description,
            image: course.image,
            href: `/cursos/${course.id}`
          }))
        }
      />
    </main>
  );
}
