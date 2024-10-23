import React from "react";
import ClassDojoLogo from "@src/assets/images/ClassDojo-Logo.svg";
import { DojoTextHeading, DojoTextParagraph } from "@src/components/p-landing-pages/PLPStyles";
import SignupForm from "../modals/SignupForm";
import Stars from "@src/assets/images/teacher-signup-lp/star-rating.svg";
import { DojoGreyedOut } from "@src/components/p-landing-pages/PLPStyles";

const PLPSignupForm = () => {
  return (
    <div css={{ maxWidth: 400, padding: 24, paddingTop: 36 }}>
      <div css={{ textAlign: "center" }}>
        <img src={ClassDojoLogo} alt="ClassDojo" />
        <DojoTextHeading>Let's create your account.</DojoTextHeading>
        <DojoTextParagraph>ClassDojo is the free, fun, and effective way to run your classroom.</DojoTextParagraph>
      </div>
      <SignupForm userType="teacher" newStyles={true} />
      <div css={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
        <img src={Stars} alt="Stars Rating" width={150} />
        <DojoGreyedOut>Rated 4.8 Stars by 2 Million People</DojoGreyedOut>
      </div>
    </div>
  );
};

export default PLPSignupForm;
