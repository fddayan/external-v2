import React from "react";

import { useState } from "react";
import { Flex } from "@src/components/Boxes";
import Translate from "@src/components/translation/Translate";
import styled from "@emotion/styled";
import { theme } from "@src/components/nessie-web";

const {
  colors: { dt_white, dt_taro50 },
  shadows: { dt_shadow_shadezies_small },
} = theme;

const SwitchLabel = styled("p")<{ marginBottom?: number; width?: string; labelOne?: string; labelTwo?: string }>`
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  display: inline;
  color: ${dt_taro50};
  margin-bottom: ${(props) => (props.marginBottom ? `${props.marginBottom}px` : 0)};
  width: ${(props) => (props.width ? props.width : "auto")};
`;

const SwitchWrapper = styled("div")`
  width: 50px;
  height: 24px;
  background-color: ${dt_taro50};
  border-radius: 27.375px;
  padding: 0 2px;
  margin: 0 12px;
`;

const SwitchInput = styled("input")`
  appearance: none;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border: none;

  &:before {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    background-color: ${dt_white};
    border-radius: 20px;
    transition: transform 0.2s ease-in-out;
    transform: translateX(26px);
    box-shadow: ${dt_shadow_shadezies_small};
  }
  &:checked&:before {
    transform: translateX(0px);
  }
`;

const SwitchCheckbox = (props: { onSwitch: (checked: boolean) => void; labelOne: string; labelTwo: string }) => {
  const [checked, setChecked] = useState(true);

  const checkHandler = () => {
    setChecked(!checked);
    props.onSwitch(checked);
  };

  return (
    <Flex marginTop="24px" width={["100%"]} justifyContent="center" onClick={checkHandler}>
      <SwitchLabel labelOne={props.labelOne}>
        <Translate path={props.labelOne} />
      </SwitchLabel>
      <SwitchWrapper>
        <SwitchInput type="checkbox" checked={checked} onChange={checkHandler} />
      </SwitchWrapper>
      <SwitchLabel labelTwo={props.labelTwo}>
        <Translate path={props.labelTwo} />
      </SwitchLabel>
    </Flex>
  );
};

export default SwitchCheckbox;
