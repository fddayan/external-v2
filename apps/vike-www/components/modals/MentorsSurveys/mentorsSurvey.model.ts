import { Address } from "@src/components/forms/AddressForm/addressForm.model";

export enum MultipleChoiceOption {
  A = "1",
  B = "2",
  C = "3",
  D = "4",
  E = "5",
}

export interface JoinTheClubData {
  question1: string;
  question2: string;
  question3: Date | null;
  question4: string;
}

export interface AcceptMissionData {
  question1: MultipleChoiceOption | null;
  // question2: Date;
  // question3: Address;
}

export interface MissionCompleteData {
  question1: MultipleChoiceOption[];
  question2: string;
}

export interface SouthernMissionCompleteData {
  question1: {
    radio: MultipleChoiceOption | null;
    text: string;
  };
  question2: Date;
  question3: Address;
}
