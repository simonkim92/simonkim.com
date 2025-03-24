import styled from 'styled-components';
import { Link, useOutletContext } from 'react-router-dom';
import { FaCheckSquare } from 'react-icons/fa';
import { projects } from '../../Projects';
import { Skills } from './Skills';

export const ProjectList = () => {
  const { setSectionName } = useOutletContext();

  return (
    <Section>
      <ProjectGallery>
        {projects.map((project) => (
          <ProjectCard key={project.id}>
            <ProjectDate>{project.date}</ProjectDate>
            <Link
              to={`/project/${project.id}`}
              onClick={() => setSectionName(project.title)}
            >
              <ProjectVideo
                className="project-video"
                src={project.video}
                autoPlay
                loop
                muted
              />
            </Link>
            <ProjectTitle>{project.title}</ProjectTitle>
            <Genre>{project.genre}</Genre>
            <br />
            {project.description.map((desc, index) => (
              <Description key={index}>
                <IconContainer style={{ height: '100%' }}>
                  <FaCheckSquare style={{ width: '10px' }} />
                </IconContainer>
                {desc}
              </Description>
            ))}
            <Skills project={project} />
          </ProjectCard>
        ))}
      </ProjectGallery>
    </Section>
  );
};

const Section = styled.section`
  padding: 40px 0px;
  display: flex;
  justify-content: center;
`;

const ProjectGallery = styled.section`
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const ProjectCard = styled.div`
  width: 238px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 1s;
  position: relative;
  &:hover {
    transition: all 0.5s;
    transform: scale(1.05);
    z-index: 100;
  }
`;

const ProjectVideo = styled.video`
  opacity: 0.7;
  width: 100%;
  height: 119px;
  object-fit: cover;
  margin-bottom: 10px;
  transition: all 0.5s;
  ${ProjectCard}:hover & {
    opacity: 1;
  }
`;

const ProjectDate = styled.div`
  font-size: 13px;
  margin-bottom: 5px;
  color: rgb(178, 172, 162);
  letter-spacing: 0.5px;
`;

const ProjectTitle = styled.text`
  font-size: 35px;
  width: 100%;
  color: #ffffff;
`;

const Genre = styled.text`
  font-size: 13px;
  color: rgb(178, 172, 162);
`;
const IconContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-start;
`;
const Description = styled.div`
  font-size: 20px;
  color: rgb(178, 172, 162);
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
`;
