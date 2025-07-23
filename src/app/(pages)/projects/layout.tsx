import { ProjectNavBar } from './ProjectNavBar';
import '~global/styles/globals.css';

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <title>Execfy | Projetos</title>
      <ProjectNavBar />
      {children}
    </>
  );
}
