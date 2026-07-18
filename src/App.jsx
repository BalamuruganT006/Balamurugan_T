import { useState, useCallback } from 'react';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Contact from './components/Contact';
import ProjectModal from './components/ProjectModal';
import { projects } from './data/projects';
import { useEffects } from './hooks/useEffects';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const lenisRef = useEffects(loaded);

  const handlePreloaderComplete = useCallback(() => setLoaded(true), []);

  const openModal = useCallback((projectId) => {
    if (projects[projectId]) setActiveProject(projects[projectId]);
  }, []);

  const closeModal = useCallback(() => setActiveProject(null), []);

  return (
    <>
      <div className="grain" aria-hidden="true"></div>
      <Cursor />
      <Preloader onComplete={handlePreloaderComplete} />
      <div className="page-transition" id="pageTransition"></div>

      <main id="mainContent" style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.1s' }}>
        <Nav lenisRef={lenisRef} />
        <Hero visible={loaded} />
        <Work onProjectClick={openModal} />
        <About />
        <Contact />
      </main>

      <ProjectModal project={activeProject} onClose={closeModal} lenisRef={lenisRef} />
    </>
  );
}