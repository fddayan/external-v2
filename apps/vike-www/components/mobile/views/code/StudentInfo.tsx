import withLocation from "@src/components/withLocation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { navigate, Link } from "gatsby";
import { Flex } from "@src/components/Boxes";
import { Text } from "@src/components/Text";
import Button from "@src/components/Button";
import Translate from "@src/components/translation/Translate";
import MobileLink from "@src/components/mobile/Link";
import Container from "@src/components/mobile/Container";
import { getDefaultApiEndpoint, UNKNOWN_SRC } from "@src/components/mobile/views/code/utils";
import navToError from "@src/utils/navToError";

function renderTeachers(teachers: { title: string; lastName: string }[]) {
  const [t1, t2, t3] = teachers;

  switch (teachers.length) {
    case 0:
      return "";
    case 1:
      return (
        <Translate
          path="codes.student_info.in_one_class"
          subs={{
            teacherTitle: t1.title,
            teacherLastName: t1.lastName,
          }}
        />
      );
    case 2:
      return (
        <Translate
          path="codes.student_info.in_two_classes"
          subs={{
            teacher1Title: t1.title,
            teacher1LastName: t1.lastName,
            teacher2Title: t2.title,
            teacher2LastName: t2.lastName,
          }}
        />
      );

    default:
      return (
        <Translate
          path="codes.student_info.in_more_than_two_classes"
          subs={{
            teacher1Title: t1.title,
            teacher1LastName: t1.lastName,
            teacher2Title: t2.title,
            teacher2LastName: t2.lastName,
            teacher3Title: t3.title,
            teacher3LastName: t3.lastName,
          }}
        />
      );
  }
}

const StudentInfo = withLocation(({ code, src }: { code: string; src: string }) => {
  const [data, setData] = useState<any>(); // beacuse result.data is any
  useEffect(() => {
    axios
      .get(`${getDefaultApiEndpoint()}/api/codeInfo/${code}`, {
        withCredentials: false,
      })
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        if (err.response.status === 404 || err.response.status === 400) {
          navigate(`/sc/${code}/oops?error=invalidCode`);
          return;
        }
        navToError(err);
      });
  }, [code]);
  const parentAction = `/sc/${code}/parentSignup?src=${src || UNKNOWN_SRC}`;

  if (data == null) return null;
  return (
    <Container>
      <Flex textAlign="center" flexDirection="column" alignItems="center">
        <img alt="" src={data.student.avatar} style={{ height: "96px", width: "80px" }} />
        <Text fontWeight={600}>{`${data.student.firstName} ${
          data.student.lastName ? data.student.lastName.slice(0, 1) : ""
        }`}</Text>
        <div style={{ marginBottom: "16px" }}>
          {data.school && <div style={{ marginBottom: "12px" }}>{data.school.name}</div>}
          <div>{renderTeachers(data.teachers)}</div>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <div>
            <Button as={Link} marginBottom="10px" to={parentAction}>
              <Translate path="codes.student_info.im_parent" subs={{ studentFirstName: data.student.firstName }} />
            </Button>
          </div>
        </div>
        <MobileLink style={{ marginBottom: "20px", textDecoration: "none" }} href="https://www.classdojo.com">
          <Translate path="codes.student_info.dont_recognize" />
        </MobileLink>
      </Flex>
    </Container>
  );
});

export default StudentInfo;
