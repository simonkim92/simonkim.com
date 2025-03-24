// src/components/Info.jsx
import React from 'react';
import styled from 'styled-components';

export const Info = () => {
  return (
    <DetailContainer>
      <InnerContainer>
        <Section>
          <BioGraphySection>
            <img width={400} src={'/images/snow.jpg'} />
            <div
              style={{ marginLeft: 40, fontSize: 30, alignItems: 'flex-start' }}
            >
              <div>
                Hello~ 😊
                <br />
                I hope you’re always happy and filled with joy! ✨
                <br />
                Wishing you the best~ 🤞
              </div>
            </div>
          </BioGraphySection>
        </Section>
        <Section>
          <SectionTitle>Contact</SectionTitle>
          <ContactTable>
            <thead>
              <tr>
                <th>Type</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>e-mail</td>
                <td>rudtjrdl6@gmail.com</td>
              </tr>
              <tr>
                <td>YouTube</td>
                <td>
                  <a
                    href="https://www.youtube.com/@trainingfornothing"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    https://www.youtube.com/@trainingfornothing
                  </a>
                </td>
              </tr>
            </tbody>
          </ContactTable>
        </Section>
        <Section>
          <SectionTitle>Experience</SectionTitle>
          <ExperienceTable>
            <thead>
              <tr>
                <th>Company</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Stage8</td>
                <td>February 2020 ~ March 2022</td>
              </tr>
              <tr>
                <td>Video Monster</td>
                <td>April 2022 ~ February 2024</td>
              </tr>
            </tbody>
          </ExperienceTable>
        </Section>
        병역사항 학력사항
      </InnerContainer>
    </DetailContainer>
  );
};

const ContactTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    color: rgb(178, 172, 162);
  }
`;

const ExperienceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    color: rgb(178, 172, 162);
  }
`;

const BioGraphySection = styled.div`
  display: flex;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;
const DetailContainer = styled.div`
  padding: 20px 0px;
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.section`
  width: 1000px;
  display: flex;
  flex-direction: column;
  min-height: 1000px;
`;

const SectionTitle = styled.div`
  text-align: left;
  margin-bottom: 20px;
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 1px;
`;
