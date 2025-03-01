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
        <Section>
          <SectionTitle>Images</SectionTitle>
          <ImageGrid>
            {project.images.map((image, index) => (
              <ImageQuadrant key={index}>
                <img src={image} alt={`${project.title} ${index + 1}`} />
                <span>{index + 1}</span>
              </ImageQuadrant>
            ))}
          </ImageGrid>
        </Section>
        <Section>
          <SectionTitle>Video</SectionTitle>
          <iframe
            width="100%"
            height="500px"
            src={project.youtubeUrl}
            frameborder="0"
            allowfullscreen
          ></iframe>
        </Section>
        <Section>
          <SectionTitle>Description</SectionTitle>
        </Section>
        {/* <a href={project.buildUrl} target="_blank" rel="noopener noreferrer">
          프로젝트 보기
        </a> */}
      </InnerContainer>
    </DetailContainer>
  );
};
const Section = styled.div`
  margin-bottom: 80px;
`;
const DetailContainer = styled.div`
  padding: 20px 0px;
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.section`
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  min-height: 1500px;
`;

const SectionTitle = styled.div`
  text-align: left;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  width: 100%;
`;

const ImageQuadrant = styled.div`
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  span {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
  }
`;

export default ProjectDetail;
