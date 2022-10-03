const password =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%*&-]).{8,}$/;
const passwordMessage = `Password should contain 1 upperCase, 1 LowerCase, a number, a character and should atleast have a length of 6`;

export const Regex = {
  password,
};
export const Messages = {
  passwordMessage,
};
