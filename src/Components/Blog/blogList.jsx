import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCheckSquare } from 'react-icons/fa';

const Container = styled.div`
  padding: 40px 0px;
  display: flex;
  justify-content: center;
`;

const BlogGallery = styled.section`
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
`;

const BlogCard = styled.div`
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

const BlogImage = styled.img`
  opacity: 0.7;
  width: 100%;
  height: 119px;
  object-fit: cover;
  margin-bottom: 10px;
  transition: all 0.5s;
  ${BlogCard}:hover & {
    opacity: 1;
  }
`;

const BlogDate = styled.div`
  font-size: 13px;
  margin-bottom: 5px;
  color: rgb(178, 172, 162);
  letter-spacing: 0.5px;
`;

const BlogTitle = styled.text`
  font-size: 35px;
  width: 100%;
  color: #ffffff;
`;

const BlogExcerpt = styled.text`
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

const blogPosts = [
  {
    slug: 'dont_destroy',
    title: 'DontDestroyOnLoad',
    date: 'January 2025',
    imageSrc: '/images/dont_destroy_on_load.png',
    excerpt: 'Unity에서 DontDestroyOnLoad에 대한 상세 설명...',
    description: [
      'Unity 씬 전환 시 오브젝트 유지',
      '싱글톤 패턴과 함께 사용',
      '배경 음악 유지',
    ],
  },
  {
    slug: 'gimbal_lock',
    title: 'Gimbal Lock',
    date: 'January 2025',
    imageSrc: '/images/gimbal_lock.png',
    excerpt: '짐벌락(Gimbal Lock)에 대한 설명...',
    description: ['3D 회전에서의 문제점', '해결 방법', '실제 적용 사례'],
  },
  {
    slug: 'programming_paradigm',
    title: 'Programming Paradigm',
    date: 'January 2025',
    imageSrc: '/images/programming_paradigm.jpg',
    excerpt: '프로그래밍 패러다임에 대한 설명...',
    description: [
      '명령형 프로그래밍',
      '선언형 프로그래밍',
      '객체지향 프로그래밍',
    ],
  },
  {
    slug: 'programming_paradigm',
    title: 'Unity Update',
    date: 'Fabruary 2025',
    imageSrc: '/images/programming_paradigm.jpg',
    description: [
      '명령형 프로그래밍',
      '선언형 프로그래밍',
      '객체지향 프로그래밍',
    ],
  },
];

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 날짜순으로 정렬
    const sortedPosts = [...blogPosts].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setPosts(sortedPosts);
  }, []);

  return (
    <Container>
      <BlogGallery>
        {posts.map((post) => (
          <BlogCard key={post.slug}>
            <BlogDate>{post.date}</BlogDate>
            <Link to={`/blog/${post.slug}`}>
              {post.imageSrc && (
                <BlogImage src={post.imageSrc} alt={post.title} />
              )}
            </Link>
            <BlogTitle>{post.title}</BlogTitle>
            <br />
            {post.description.map((desc, index) => (
              <Description key={index}>
                <IconContainer>
                  <FaCheckSquare style={{ width: '10px' }} />
                </IconContainer>
                {desc}
              </Description>
            ))}
          </BlogCard>
        ))}
      </BlogGallery>
    </Container>
  );
}
