export const hasEspecialCharacters = (textToCheck) => {
  let format = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
  return format.test(textToCheck);
};
