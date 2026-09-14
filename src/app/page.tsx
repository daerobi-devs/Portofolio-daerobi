import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <PageLoader />
      <Navbar />
      <Hero />
      <About />
      <Journey />
      <Projects />
      <Skills />
      <Footer />
    </main>
  );
}
