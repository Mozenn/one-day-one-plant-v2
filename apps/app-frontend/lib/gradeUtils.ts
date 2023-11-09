const hobbyistThreshold = 500;
const connoisseurThreshold = 2500;
const scholarThreshold = 5000;
const worshiperThreshold = 10000;

export const getGradeFromScore = (score: number): string => {
  if(score < hobbyistThreshold) {
    return "novice";
  } else if (score >= hobbyistThreshold && score < connoisseurThreshold) {
    return "hobbyist";
  } else if (score >= connoisseurThreshold && score < scholarThreshold) {
    return "connoisseur";
  } else if (score >= scholarThreshold && score < worshiperThreshold) {
    return "scholar";
  } else {
    return "worshiper";
  }
}

export const getGradeBorderFromScore = (score: number): string => {
  return `border-${getGradeFromScore(score)}`;
}

export const getGradeTextColorFromScore = (score: number): string => {
  return `text-${getGradeFromScore(score)}`;
}

