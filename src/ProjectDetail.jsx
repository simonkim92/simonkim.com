// src/ProjectDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { projects } from './Projects';
import styled from 'styled-components';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id.toString() === id);

  if (!project) return <p>Project not found</p>;

  return (
    <DetailContainer>
      <InnerContainer>
        <img src={project.image} alt={project.title} />
        <p>{project.description}</p>
        <video src={project.video} controls />
        {/* <a href={project.buildUrl} target="_blank" rel="noopener noreferrer">
          프로젝트 보기
        </a> */}
      </InnerContainer>
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  padding: 40px 0px;
  display: flex;
  justify-content: center;
`;
const InnerContainer = styled.section`
  max-width: 1000px;
  display: flex;
  flex-direction: column;
`;
export default ProjectDetail;
