import styled from "@emotion/styled";
import { theme } from "@src/components/nessie-web";

export const RadioLabel = styled("label")`
  margin-left: 3px;
  font-size: 15px;
  line-height: 1.2;
  font-weight: 600;
  color: ${theme.colors.taro90};
`;

export const StyledForm = styled("form")`
  width: 100%;
  display: grid;
  text-align: left;
`;

export const CheckboxContainer = styled("div")`
  display: flex;
  flex-direction: row;
`;

export const Select = styled("select")`
  appearance: none;
  box-sizing: border-box;
  outline: none;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.9844 17.8C12.5014 17.804 13.0197 17.6087 13.4142 17.2143L20.3439 10.2846C21.1249 9.50357 21.1249 8.23724 20.3439 7.4562C19.5628 6.67515 18.2965 6.67515 17.5154 7.4562L11.9846 12.987L6.45376 7.45618C5.67271 6.67514 4.40638 6.67514 3.62534 7.45618C2.84429 8.23723 2.84429 9.50357 3.62534 10.2846L10.555 17.2143C10.9494 17.6087 11.4675 17.8039 11.9844 17.8Z' fill='%238689b8'/%3E%3C/svg%3E%0A");
  background-position: right 24px center;
  width: 100%;
  padding-top: 18px;
  padding-bottom: 18px;
  padding-left: 24px;
  padding-right: 24px;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.25px;
  font-weight: 600;
  color: #2c2a50;
  border-radius: 18px;
  border: 2px solid;
  border-color: #545382;
`;
