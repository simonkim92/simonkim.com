import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

const MarkdownWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  pre {
    background-color: #2d2d2d;
    border-radius: 5px;
    padding: 16px;
    overflow-x: auto;
    margin: 20px 0;
  }

  code {
    font-family: 'Consolas', 'Monaco', 'Andale Mono', monospace;
  }

  /* 인라인 코드 스타일링 */
  :not(pre) > code {
    background-color: #f0f0f0;
    padding: 2px 4px;
    border-radius: 3px;
    color: #d63384;
  }
`;

const MarkdownRenderer = ({ content }) => {
  return (
    <MarkdownWrapper>
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </MarkdownWrapper>
  );
};

export default MarkdownRenderer;
