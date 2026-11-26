import "./home.css"
import { CategoriaHome, CursoListHome, ExploreBannerHome, HeroHome, IndicacaoBannerHome, SobreBannerHome } from "./components"
import { Footer, Navbar } from "../../components"

export function Home() {
  
  return (
    <section className="home-page" aria-label="Página inicial">
      <Navbar />

      <main>
        <HeroHome />
        <CategoriaHome />                
        <CursoListHome />
        <ExploreBannerHome />
        <SobreBannerHome />
        <IndicacaoBannerHome />
      </main>

      <Footer />
    </section>
  )
}
