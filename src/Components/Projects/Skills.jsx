import styled from 'styled-components';
import { FaReact, FaNodeJs, FaUnity } from 'react-icons/fa';
import { SiUnrealengine, SiJavascript, SiHtml5 } from 'react-icons/si';

export const Skills = ({ project, reverse }) => {
  return (
    <SkillContainer>
      {project.skills.map((skill) => (
        <SkillTag key={skill} reverse={reverse}>
          {skillIcons[skill]}
          <span>{skill}</span>
        </SkillTag>
      ))}
    </SkillContainer>
  );
};

const skillIcons = {
  JavaScript: <SiJavascript />,
  HTML5: <SiHtml5 />,
  React: <FaReact />,
  NodeJs: <FaNodeJs />,
  Unity: <FaUnity />,
  'Unreal Engine': <SiUnrealengine />,
};

const SkillContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const SkillTag = styled.div`
  display: flex;
  gap: 5px;
  background-color: #2a2d2e;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 20px;
  color: #fff;
  height: 24px;
  letter-spacing: 0.3px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ reverse }) =>
    reverse &&
    `
    background-color: #fff;
    color: #000;
  `}
  svg {
    font-size: 16px;
    overflow: visible;
  }
`;
