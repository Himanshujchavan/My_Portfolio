"use client";
import { GLOBAL_CSS } from "./components/GlobalStyles";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeBand from "./components/MarqueeBand";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Hackathons from "./components/Hackathons";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Portfolio() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <Navbar />
      <Hero />
      <MarqueeBand />
      <About />
      <Skills />
      <Projects />
      <Hackathons />
      <Achievements />
      <Contact />
      <Footer />
    </>
  );
}
