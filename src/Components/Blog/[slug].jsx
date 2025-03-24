import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import styled from 'styled-components';
import '../../style/globals.css';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6;
  height: 80px;
  padding: 20px;
  position: relative;
  margin-bottom: 30px;
`;

const MDWrapper = styled.div`
  width: 800px;
  max-width: 90%;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const DateText = styled.div`
  position: absolute;
  right: 20px;
  color: #6b7280; // gray-500
`;

const ContentImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  margin: 0 auto 20px auto;
`;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), 'posts'));

  const paths = files.map((filename) => ({
    params: { slug: filename.replace('.md', '') },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'posts', `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const { data, content } = matter(fileContents);

  return {
    props: {
      frontMatter: data,
      content,
    },
  };
}

export default function PostPage({ frontMatter, content }) {
  console.log(content);
  return (
    <Container>
      <Header>
        <Title>{frontMatter.title}</Title>
        <DateText>{frontMatter.date}</DateText>
      </Header>
      <Content>
        <MDWrapper>
          {frontMatter.imageSrc && <ContentImage src={frontMatter.imageSrc} />}
          <MarkdownRenderer content={content} />
        </MDWrapper>
      </Content>
    </Container>
  );
}
