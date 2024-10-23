import React, { useEffect, useState } from "react";
import Axios from "axios";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import { Action, Heading, Title, theme, Space } from "@src/components/nessie-web";

const {
  colors: { dt_taro30 },
} = theme;

interface JobOpenings {
  marketing?: any[];
  engineering?: any[];
}

const JobSection = styled.section`
  padding: 54px 0;
  ${mediaQueries[0]} {
    padding: 100px 0;
  }
`;
const JobListHolder = styled.div``;

const JobItem = styled.a`
  display: flex;
  padding: 20.5px 24px;
  border: 1px solid ${dt_taro30};
  border-radius: 10px;
  margin-bottom: 12px;
  flex-direction: column;

  ${mediaQueries[1]} {
    flex-direction: row;
    .nessie-text {
      flex-grow: 1;
    }
  }
`;

const JobLocation = styled.div`
  color: #979797;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  ${mediaQueries[1]} {
    align-self: flex-end;
  }
`;

const ResponsiveTitle = styled(Title)`
  font-size: 30px;
  ${mediaQueries[1]} {
    font-size: 50px;
  }
`;

type OpenPositionsProps = {
  open_positions_heading: string;
  open_positions_engineering: string;
};

const OpenPositions: React.FC<OpenPositionsProps> = ({ open_positions_heading, open_positions_engineering }) => {
  const [jobs, setJobs] = useState<JobOpenings>({});
  useEffect(() => {
    Axios.get("https://api.greenhouse.io/v1/boards/classdojo/jobs?content=true", { withCredentials: false })
      .then(function (response) {
        const data = response.data;
        const jobsObject: JobOpenings = {};
        jobsObject.engineering = data.jobs.filter(
          (job: { departments: { name: string }[] }) => job.departments[0].name == "Engineering",
        );
        setJobs(jobsObject);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <JobSection id="openings">
      <Container>
        <ResponsiveTitle size={2} textAlign="center">
          <Translate path={open_positions_heading} />
        </ResponsiveTitle>
        <Space size="xxl" />
        <Heading>
          <Translate path={open_positions_engineering} />
        </Heading>
        <Space size="l" />
        {jobs.engineering && (
          <JobListHolder>
            {jobs.engineering.map((item, index) => (
              <JobItem href={item.absolute_url} key={index}>
                <Action style="flex-grow:1">{item.title}</Action>
                <JobLocation>{item.location.name}</JobLocation>
              </JobItem>
            ))}
          </JobListHolder>
        )}
      </Container>
    </JobSection>
  );
};

export default OpenPositions;
