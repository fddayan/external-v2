import React, { ChangeEvent, FormEvent, useState } from "react";
import { logEvent } from "@src/utils/logClient";
import { Button, Heading, CheckmarkIcon, DownloadIcon, theme } from "../nessie-web";
import CommonModal, { CommonModalProps } from "./CommonModal";
import styled from "@emotion/styled";

const ModalContent = styled("div")`
  font-size: 18px;
  line-height: 1.7;
  text-align: center;
  p:first-of-type {
    margin: 18px 0 0;
  }
  em {
    font-style: normal;
    font-weight: 700;
  }
  input {
    display: block;
    margin-bottom: 12px;
    width: 100%;
    padding: 12px 24px;
    border-radius: 99px;
    border: 2px solid ${theme.colors.taro30};
    background-color: ${theme.colors.taro10};
  }
  button {
    padding: 18px 80px;
    margin: auto;
  }
  .confirmEmailField {
    display: none;
  }
`;

const DistrictDownloadModal: React.FC<CommonModalProps> = (props) => {
  const [pardotFormData, setPardotFormData] = useState({
    Email: "",
    FirstName: "",
    LastName: "",
    SchoolDistrict: "",
    JobTitle: "",
    NumberStudents: "",
    confirmEmail: "",
  });

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();

    if (pardotFormData.confirmEmail) {
      ev.preventDefault();
      return;
    }
    const email = pardotFormData.Email.toLowerCase();
    if (email.endsWith("@gmail.com") || email.endsWith("@outlook.com") || email.endsWith("@yahoo.com")) {
      window.alert(
        "We've noticed you've entered a personal email address. For a more tailored experience, we kindly ask you to use your work email address.",
      );
      return;
    }
    logEvent({
      eventName: "web.external.districts.submit_usage_form",
    });
    const form = ev.target as HTMLFormElement;
    form.submit();
  }

  function handleInputChange(ev: ChangeEvent<HTMLInputElement>) {
    ev.preventDefault();
    setPardotFormData({
      ...pardotFormData,
      [ev.target.name]: ev.target.value,
    });
  }

  return (
    <CommonModal noHeaderText {...props}>
      <ModalContent>
        <>
          <p>
            <em>Let's get connected!</em>
          </p>
          <p>Share your info here, and we’ll start crunching the numbers 🤓 </p>
          <form action="https://go.pardot.com/l/1046033/2023-11-13/3zv" method="post" onSubmit={handleSubmit}>
            <input
              id="Email"
              name="Email"
              type="email"
              value={pardotFormData.Email}
              onChange={handleInputChange}
              placeholder="Work e-mail address"
              required
            />
            <input
              id="FirstName"
              name="FirstName"
              value={pardotFormData.FirstName}
              onChange={handleInputChange}
              placeholder="First Name"
              required
            />
            <input
              id="LastName"
              name="LastName"
              value={pardotFormData.LastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              required
            />
            <input
              id="SchoolDistrict"
              name="SchoolDistrict"
              value={pardotFormData.SchoolDistrict}
              onChange={handleInputChange}
              placeholder="School District"
              required
            />
            <input
              id="JobTitle"
              name="JobTitle"
              value={pardotFormData.JobTitle}
              onChange={handleInputChange}
              placeholder="Job Title"
              required
            />
            <input
              id="NumberStudents"
              name="NumberStudents"
              type="number"
              value={pardotFormData.NumberStudents}
              onChange={handleInputChange}
              placeholder="Total full-time students in district"
              required
            />
            <input
              className="confirmEmailField"
              type="text"
              name="confirmEmail"
              value={pardotFormData.confirmEmail}
              placeholder="Confirm your work e-mail address"
              onChange={handleInputChange}
            />
            <Button kind="plus" type="submit">
              Request Usage Report
            </Button>
          </form>
        </>
      </ModalContent>
    </CommonModal>
  );
};

export default DistrictDownloadModal;
