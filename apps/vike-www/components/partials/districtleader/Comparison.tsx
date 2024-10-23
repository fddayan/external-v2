import React from "react";
import { Button } from "@src/components/nessie-web";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { graphql, useStaticQuery } from "gatsby";

const Comparison = () => {
  return (
    <Container>
      <div>
        <h2>District level control and security, at no cost.</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>check</th>
              <th>check</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>All features that schools, parents and kids love</th>
              <td></td>
              <td>check</td>
            </tr>
            <tr>
              <th>Automated rostering</th>
              <td></td>
              <td>check</td>
            </tr>
            <tr>
              <th>Single Sign-On (SSO)</th>
              <td></td>
              <td>check</td>
            </tr>
            <tr>
              <th>Dedicated 24/7 Support</th>
              <td></td>
              <td>check</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default Comparison;
