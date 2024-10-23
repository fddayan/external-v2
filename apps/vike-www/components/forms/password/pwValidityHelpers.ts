const specialCharacters = [
  "{",
  "}",
  "[",
  "]",
  ",",
  ".",
  "<",
  ">",
  ";",
  ":",
  "'",
  '"',
  "?",
  "/",
  "|",
  "\\",
  "`",
  "~",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "€",
  "£",
  "¥",
  "•",
];

export const belowMaximumLength = (value: string, maximumLength: number): boolean => value.length <= maximumLength;
export const hasMinimumLength = (value: string, minimumLength: number): boolean => value.length >= minimumLength;
const hasSpecialCharacter = (value: string): boolean => specialCharacters.some((char) => value.includes(char));
const hasNumericCharacter = (value: string): boolean => /[0-9]/.test(value);
export const hasSpecialOrNumericCharacter = (value: string): boolean =>
  hasNumericCharacter(value) || hasSpecialCharacter(value);
export const hasAlphabeticalCharacter = (value: string): boolean => /[a-zA-Z]/.test(value);
export const passwordEqualsEmail = (password: string, emailAddress?: string) => password === emailAddress;

export function isValidPassword(password: string, emailAddress: string): boolean {
  return (
    hasMinimumLength(password, 8) &&
    (hasAlphabeticalCharacter(password) || hasSpecialOrNumericCharacter(password)) &&
    belowMaximumLength(password, 100) &&
    !passwordEqualsEmail(password, emailAddress)
  );
}

export function isValidNYCPassword(password: string, emailAddress: string): boolean {
  return (
    hasMinimumLength(password, 8) &&
    hasAlphabeticalCharacter(password) &&
    hasSpecialOrNumericCharacter(password) &&
    belowMaximumLength(password, 100) &&
    !passwordEqualsEmail(password, emailAddress)
  );
}
