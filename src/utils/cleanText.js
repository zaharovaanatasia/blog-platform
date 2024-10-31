export const cleanText = (text) => {
  return text.replace(/[^\w\s!@#$%^&*(),.?;':"“”‘’\-—~`]+/g, '');
};
