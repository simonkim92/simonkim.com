import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import MarkdownRenderer from './MarkdownRenderer';
// 블로그 포스트 내용을 직접 import
import dontDestroyContent from './posts/dont_destroy.md';
import gimbalLockContent from './posts/gimbal_lock.md';
import programmingParadigmContent from './posts/programming_paradigm.md';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6;
  padding: 40px 20px;
  margin-bottom: 30px;
`;

const MDWrapper = styled.div`
  width: 800px;
  max-width: 90%;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

const DateText = styled.div`
  color: #6b7280;
  font-size: 0.9rem;
`;

const ContentImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin: 20px 0;
`;

// 포스트 메타데이터
const postMetadata = {
  dont_destroy: {
    title: 'DontDestroyOnLoad',
    date: '2025-03-16',
    imageSrc: '/images/dont_destroy_on_load.png',
  },
  gimbal_lock: {
    title: 'Gimbal Lock',
    date: '2025-03-16',
    imageSrc: '/images/gimbal_lock.png',
  },
  programming_paradigm: {
    title: 'Programming Paradigm',
    date: '2025-03-16',
    imageSrc: '/images/programming_paradigm.png',
  },
};

// 포스트 내용 매핑
const postContents = {
  dont_destroy: dontDestroyContent,
  gimbal_lock: gimbalLockContent,
  programming_paradigm: programmingParadigmContent,
};

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (slug && postMetadata[slug] && postContents[slug]) {
      setPost({
        frontMatter: postMetadata[slug],
        content: postContents[slug],
      });
    }
  }, [slug]);

  if (!post) return <div>Loading...</div>;

  return (
    <Container>
      <Header>
        <Title>{post.frontMatter.title}</Title>
        <DateText>{post.frontMatter.date}</DateText>
      </Header>
      <MDWrapper>
        {post.frontMatter.imageSrc && (
          <ContentImage
            src={post.frontMatter.imageSrc}
            alt={post.frontMatter.title}
          />
        )}
        <MarkdownRenderer content={post.content} />
      </MDWrapper>
    </Container>
  );
}
