import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { theme } from "@src/components/nessie-web";
const {
  colors: { dt_taro40, dt_taro50, dt_white, dt_aqua50 },
} = theme;

const JobType = styled("h3")`
  color: ${dt_white};
  font-size: 24px;
  font-weight: 800;
  margin-top: 0px;
  margin-bottom: 20px;
  display: block;
  text-align: left;
`;

const JobContainer = styled("h3")`
  width: 100%;
  margin: auto;
`;

const JobWrapper = styled("div")`
  width: 100%;
  margin-top: 40px;
  padding-top: 40px;
  border-top: 3px solid ${dt_taro50};

  &:last-of-type {
    border-bottom: 3px solid ${dt_taro50};
  }
`;

const JobBox = styled("a")`
  min-height: 1px;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 30px;
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

const JobTitle = styled("span")`
  color: ${dt_aqua50};
  display: block;
  font-size: 18px;
  font-weight: 600;
  text-align: left;
`;

const JobLocation = styled("span")`
  color: ${dt_taro40};
  display: block;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
`;

interface Department {
  id: number;
  name: string;
  child_ids: number[];
  parent_id: number | null;
}

interface Office {
  id: number;
  name: string;
  location: string;
  child_ids: number[];
  parent_id: number | null;
}

interface DataCompliance {
  type: string;
  requires_consent: boolean;
  requires_processing_consent: boolean;
  requires_retention_consent: boolean;
  retention_period: number | null;
}

interface Job {
  absolute_url: string;
  data_compliance: DataCompliance[];
  internal_job_id: number;
  location: {
    name: string;
  };
  metadata: any | null;
  id: number;
  updated_at: string;
  requisition_id: string | null;
  title: string;
  content: string;
  departments: Department[];
  offices: Office[];
}

type JobsByCategory = {
  [key: string]: Job[];
};

const JobList: React.FC = () => {
  const [jobsByCategory, setJobsByCategory] = useState<JobsByCategory>({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://api.greenhouse.io/v1/boards/classdojo/jobs?content=true");
      const data = await response.json();

      const groupedJobs = data.jobs.reduce((grouped, job) => {
        const departmentName = job.departments[0]?.name;
        if (!grouped[departmentName]) {
          grouped[departmentName] = [];
        }
        grouped[departmentName].push(job);
        return grouped;
      }, {});

      setJobsByCategory(groupedJobs);
    };

    fetchData();
  }, []);

  return (
    <div>
      {Object.entries(jobsByCategory).map(([category, jobs]) => (
        <JobWrapper key={category}>
          <JobType>{category}</JobType>
          {jobs.map((job, index) => (
            <JobBox key={`${category}-${index}`} href={job.absolute_url} target="_blank">
              <JobTitle>{job.title}</JobTitle>
              <JobLocation>{job.location.name}</JobLocation>
            </JobBox>
          ))}
        </JobWrapper>
      ))}
    </div>
  );
};

export default JobList;
