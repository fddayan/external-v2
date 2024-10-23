import React, { useState, useEffect } from "react";
import { logEvent } from "@src/utils/logClient";
import Translate from "./translation/Translate";
import { Button, DetailAction, DetailText, CloseIcon, theme } from "./nessie-web";
import styled from "@emotion/styled";
import { LocalStorageWrapper } from "@src/utils/localStorage";
import { surveyKey, timeBeforeShowingSurvayAgain } from "@src/utils/survey";

type UserSurveyProps = {
  performanceCookieConsent: boolean;
};
type AnswerId = {
  id: string;
  translation: string;
};

const Box = styled.div`
  background: white;
  padding: ${theme.space.dt_m}px;
  max-width: 400px;
  border-radius: ${theme.radii.dt_radius_s};
  position: fixed;
  bottom: ${theme.space.dt_m}px;
  right: ${theme.space.dt_m}px;
  border: ${theme.borders.dt_border_card};
  shadow: ${theme.shadows.dt_shadow_shadezies};
  z-index: 100;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  outline: 0;
  border: 0;
  cursor: pointer;
`;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const UserSurvey: React.FC<UserSurveyProps> = ({ performanceCookieConsent }) => {
  const [showSurvey, setShowSurvey] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [showThanks, setShowThanks] = useState(false);
  const [shuffledAnswerIds, setShuffledAnswerIds] = useState([]);

  const answerIds: Record<string, AnswerId> = {
    answer1: { id: "teacher-info", translation: "directus.homepage_copy_experiments.teacher_info" },
    answer2: {
      id: "teacher-school-islands-info",
      translation: "directus.homepage_copy_experiments.teacher_dojo_islands_info",
    },
    answer3: { id: "school-admin-info", translation: "directus.homepage_copy_experiments.school_admin_info" },
    answer4: { id: "district-admin-info", translation: "directus.homepage_copy_experiments.district_admin_info" },
    answer5: { id: "family-member-info", translation: "directus.homepage_copy_experiments.family_member_info" },
    answer6: { id: "student-info", translation: "directus.homepage_copy_experiments.student_info" },
    answer7: { id: "returning-user", translation: "directus.homepage_copy_experiments.returning_user" },
    answer8: { id: "other", translation: "directus.homepage_copy_experiments.other" },
  };

  // gets user locale from pathname
  function getLocaleFromPath(pathname) {
    const regex = /^\/([a-z]{2}-[a-z]{2})/;
    const match = pathname.match(regex);
    return match ? match[1] : "en-us";
  }

  useEffect(() => {
    const answerArray = Object.entries(answerIds);
    const otherOption = answerArray.pop();
    shuffleArray(answerArray);
    otherOption && answerArray.push(otherOption);
    setShuffledAnswerIds(answerArray);

    const surveyData = JSON.parse(LocalStorageWrapper.getItem(surveyKey) || "{}");
    const wasDismissedRecently =
      surveyData.dismissedAt && Date.now() - surveyData.dismissedAt < timeBeforeShowingSurvayAgain;
    if (!wasDismissedRecently) {
      setShowSurvey(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userAnswer) {
      logEvent({
        eventName: "external.userSurvey.dojoIslands",
        eventValue: userAnswer,
        metadata: {
          location: getLocaleFromPath(window.location.pathname),
        },
      });
      LocalStorageWrapper.setItem(surveyKey, JSON.stringify({ dismissedAt: Date.now() }));
      setUserAnswer(null);
      setShowThanks(true);
      setTimeout(() => {
        setShowSurvey(false);
        setShowThanks(false);
      }, 3000);
    }
  };

  const handleDismiss = () => {
    LocalStorageWrapper.setItem(surveyKey, JSON.stringify({ dismissedAt: Date.now() }));
    setShowSurvey(false);
  };

  return (
    <>
      {performanceCookieConsent && showSurvey && !showThanks && (
        <Box id="user-survey">
          <CloseButton onClick={handleDismiss} style={{}}>
            <CloseIcon />
          </CloseButton>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <DetailAction>
              <Translate path="directus.homepage_copy_experiments.Question" />
            </DetailAction>
            {shuffledAnswerIds.map(([key, { id, translation }]) => (
              <div key={id} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <input
                  type="radio"
                  id={id}
                  name="survey"
                  value={id}
                  required
                  onChange={handleChange}
                  style={{ marginTop: 3 }}
                />
                <DetailText as="label" htmlFor={id}>
                  <Translate path={translation} />
                </DetailText>
              </div>
            ))}
            <Button type="submit" size="s" style={{ marginTop: 8 }}>
              <Translate path="directus.homepage_copy_experiments.survey_cta" />
            </Button>
          </form>
        </Box>
      )}
      {showThanks && (
        <Box id="thanks">
          <DetailAction>
            <Translate path="directus.homepage_copy_experiments.survey_feedback" />
          </DetailAction>
        </Box>
      )}
    </>
  );
};

export default UserSurvey;
