import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Skills } from './Skills';
import { projects } from '../../Projects';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id.toString() === id);
  const imageListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const VISIBLE_ITEMS = 8;

  const mockImages = [project.youtubeUrl, ...project.images];

  const [selectedMedia, setSelectedMedia] = useState(mockImages[0]);
  const [isVideo, setIsVideo] = useState(true);

  useEffect(() => {
    setIsVideo(selectedMedia === project.youtubeUrl);
  }, [selectedMedia, project.youtubeUrl]);

  useEffect(() => {
    if (currentIndex >= startIndex + VISIBLE_ITEMS) {
      setStartIndex(currentIndex - VISIBLE_ITEMS + 1);
    } else if (currentIndex < startIndex) {
      setStartIndex(currentIndex);
    }
  }, [currentIndex, startIndex]);

  const scrollToIndex = (index) => {
    if (imageListRef.current && index >= 0 && index < mockImages.length) {
      setCurrentIndex(index);
      setSelectedMedia(mockImages[index]);
      setIsVideo(mockImages[index] === project.youtubeUrl);
    }
  };

  const handlePrev = () => {
    scrollToIndex(Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    scrollToIndex(Math.min(mockImages.length - 1, currentIndex + 1));
  };

  if (!project) return <p>Project not found</p>;

  const visibleImages = mockImages.slice(
    startIndex,
    startIndex + VISIBLE_ITEMS
  );

  return (
    <DetailContainer>
      <InnerContainer>
        <Section>
          <SelectedMediaContainer>
            {isVideo ? (
              <iframe
                width="100%"
                height="100%"
                src={`${selectedMedia}?autoplay=1`}
                title={`${project.title} Video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img src={selectedMedia} alt="Selected" />
            )}
          </SelectedMediaContainer>
          <SliderContainer>
            <NavButtonContainer>
              <NavButton onClick={handlePrev} $position="left">
                &lt;
              </NavButton>
            </NavButtonContainer>
            <ImageListWrapper>
              <ImageList ref={imageListRef}>
                {visibleImages.map((media, index) => {
                  const actualIndex = index + startIndex;
                  return (
                    <ImageItem
                      key={actualIndex}
                      onClick={() => scrollToIndex(actualIndex)}
                      $isActive={selectedMedia === media}
                    >
                      {media === project.youtubeUrl ? (
                        <VideoThumbnail>
                          <PlayIcon>▶</PlayIcon>
                          <img
                            src={`https://img.youtube.com/vi/${project.VIDEO_ID}/mqdefault.jpg`}
                            alt={`${project.title} Video`}
                          />
                        </VideoThumbnail>
                      ) : (
                        <img
                          src={media}
                          alt={`${project.title} ${actualIndex}`}
                        />
                      )}
                    </ImageItem>
                  );
                })}
              </ImageList>
            </ImageListWrapper>
            <NavButtonContainer>
              <NavButton onClick={handleNext} $position="right">
                &gt;
              </NavButton>
            </NavButtonContainer>
          </SliderContainer>
        </Section>
        {project.buildUrl && (
          <Section>
            <SectionTitle>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>Game PLAY</span>
                <a
                  href={project.buildUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    fontSize: '20px',
                    color: 'black',
                    backgroundColor: 'rgb(210, 205, 195)',
                    textDecoration: 'none',
                    textAlign: 'center',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = 'red')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      'rgb(210, 205, 195)')
                  }
                >
                  full-screen play
                </a>
              </div>
            </SectionTitle>
            <iframe
              src={project.buildUrl}
              width="100%"
              height="562px"
              allowFullScreen
              title={`${project.title} Game Play`}
            />
          </Section>
        )}
        {/* <Section>
          <SectionTitle>How I Built This</SectionTitle>
        </Section> */}
        <Section>
          <SectionTitle>Technologies & Tools</SectionTitle>
          <Skills project={project} $reverse={'true'} />
        </Section>
        <Footer />
      </InnerContainer>
    </DetailContainer>
  );
};

const Section = styled.div`
  margin-bottom: 200px;
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
  font-size: 30px;
  color: rgb(210, 205, 195);
`;

const SelectedMediaContainer = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 비율 */
  position: relative;

  iframe,
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain; /* 비율에 맞게 꽉 차도록 변경 */
  }
`;

const ImageList = styled.div`
  display: flex;
  gap: 10px;
  scroll-behavior: smooth;
  width: 100%;
`;

const ImageItem = styled.div`
  cursor: pointer;
  min-width: 97px;
  height: 64px;
  border: 2px solid
    ${(props) => (props.$isActive ? 'rgb(210, 205, 195)' : 'transparent')};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 97px;
    height: 64px;
    object-fit: cover;
  }
`;

const VideoThumbnail = styled.div`
  position: relative;
  width: 97px;
  height: 64px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlayIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: white;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
  z-index: 2;
`;

const Footer = styled.div`
  height: 200px;
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 0;
  margin: 20px 0;
`;

const NavButtonContainer = styled.div`
  min-width: 50px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const NavButton = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 4px;
  width: 40px;
  height: 74px;
  font-size: 20px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const ImageListWrapper = styled.div`
  flex: 1;
  overflow: hidden;
`;

export default ProjectDetail;
