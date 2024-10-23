import React from "react";
import { Button } from "@src/components/nessie-web";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { graphql, useStaticQuery } from "gatsby";
import { CheckmarkIcon } from "@src/components/nessie-web";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";
import { Underline, Display2, DarkButton } from "./styles";

const Heading = styled("h2")`
  font-family: DojoText;
  font-size: 44px;
  font-style: normal;
  font-weight: 800;
  line-height: 48px; /* 109.091% */
  letter-spacing: -0.3px;
  color: #2c2a50;
`;

const Table = styled("table")`
  border: none;
  td,
  th {
    border: none;
    background-color: transparent !important;
    &:not(:first-child) {
      text-align: center;
    }
    font-family: DojoText;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 23px; /* 127.778% */
    color: var(--palette-taro-80, #2c2a50);
    padding: 18px 0;
  }
  tbody tr:not(:last-child) td {
    border-bottom: solid 2px #e2e4f0;
  }
  .desktop {
    ${mediaQueries[0]} {
      display: table-row;
      width: 100%;
    }
    ${mediaQueriesMax[0]} {
      display: none;
    }
  }
  .mobile {
    ${mediaQueries[0]} {
      display: none;
    }
    ${mediaQueriesMax[0]} {
      display: table-row;
    }
  }
`;
const BaseButton = styled("span")`
  border-radius: 30px;
  border: 2px solid var(--palette-taro-30, #d3d7ec);
  background: var(--cloud-10, #f1f3f8);
  font-size: 15px;
  font-style: normal;
  font-weight: 800;
  letter-spacing: -0.1px;
  color: var(--palette-taro-80, #2c2a50);
  display: inline-block;
  margin-bottom: 20px;
  padding: 4px;
  margin-inline: 2px;
  ${mediaQueries[0]} {
    border-radius: 30px;
    line-height: 34px; /* 121.429% */
    padding: 16px 32px;
    font-size: 28px;
  }
`;

const DojoButton = styled("span")`
  background: var(--brand-plus, #8047ff);
  border-radius: 30px;
  border: solid 2px var(--brand-plus, #8047ff);
  font-style: normal;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.1px;
  color: white;
  display: inline-block;
  margin-bottom: 20px;
  padding: 4px 10px;
  // white-space: nowrap;
  margin-inline: 2px;
  ${mediaQueries[0]} {
    font-size: 28px;
    line-height: 34px; /* 121.429% */
    padding: 16px 32px;
  }
  span {
    display: none;
    ${mediaQueries[0]} {
      display: inline;
    }
  }
`;

const ComparisonTable = ({ openCalendly }) => {
  const data = useStaticQuery(graphql`
    {
      underline: file(relativePath: { eq: "districts/sketch-underline.png" }) {
        publicURL
      }
    }
  `);
  const { underline } = data;

  return (
    <Container>
      <Display2 css={{ textAlign: "center", marginBottom: 48 }}>
        Now with everything <Underline backgroundImageUrl={underline.publicURL}>districts</Underline> want
      </Display2>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>
              <BaseButton>ClassDojo</BaseButton>
            </th>
            <th>
              <DojoButton>
                <span>ClassDojo for </span>Districts
              </DojoButton>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>All features that schools, parents and kids love</td>
            <td>
              <CheckmarkIcon />
            </td>
            <td>
              <CheckmarkIcon color="dt_grape60" />
            </td>
          </tr>
          <tr>
            <td>Access to messaging records</td>
            <td>
              <CheckmarkIcon />
            </td>
            <td>
              <CheckmarkIcon color="dt_grape60" />
            </td>
          </tr>
          <tr>
            <td>All-in-one platform for both positive behavior and family engagement</td>
            <td>
              <CheckmarkIcon />
            </td>
            <td>
              <CheckmarkIcon color="dt_grape60" />
            </td>
          </tr>
          <tr>
            <td>District-verified school listings</td>
            <td></td>
            <td>
              <CheckmarkIcon color="dt_grape60" />
            </td>
          </tr>
          <tr>
            <td>Custom training for families, educators and admin</td>
            <td></td>
            <td>
              <CheckmarkIcon color="dt_grape60" />
            </td>
          </tr>
          <tr>
            <td>District-wide family engagement reports</td>
            <td></td>
            <td>
              <CheckmarkIcon color="dt_grape60" />
            </td>
          </tr>
          <tr>
            <td>Automated staff rostering</td>
            <td></td>
            <td>
              <CheckmarkIcon color="dt_grape60" />
            </td>
          </tr>
          <tr>
            <td>Staff Single Sign-On (SSO)</td>
            <td></td>
            <td>
              <CheckmarkIcon color="dt_grape60" />
            </td>
          </tr>
          <tr>
            <td>Dedicated support</td>
            <td></td>
            <td>
              <CheckmarkIcon color="dt_grape60" />
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="desktop">
            <td></td>
            <td></td>
            <td>
              <DarkButton onClick={openCalendly} css={{ margin: "auto" }}>
                Apply for partnership
              </DarkButton>
            </td>
          </tr>
          <tr className="mobile">
            <td colSpan={3}>
              <DarkButton width="100%" onClick={openCalendly}>
                Schedule a Demo
              </DarkButton>
            </td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
};

export default ComparisonTable;
