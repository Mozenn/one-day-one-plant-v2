const hobbyistThreshold = 500;
const connoisseurThreshold = 2500;
const scholarThreshold = 5000;
const worshiperThreshold = 10000;

export const getGradeFromScore = (score: number): string => {
  if (score < hobbyistThreshold) {
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
};

export const getGradeBorderFromScore = (score: number): string => {
  if (score < hobbyistThreshold) {
    return "border-novice";
  } else if (score >= hobbyistThreshold && score < connoisseurThreshold) {
    return "border-hobbyist";
  } else if (score >= connoisseurThreshold && score < scholarThreshold) {
    return "border-connoisseur";
  } else if (score >= scholarThreshold && score < worshiperThreshold) {
    return "border-scholar";
  } else {
    return "border-worshiper";
  }
};

export const getGradeTextColorFromScore = (score: number): string => {
  if (score < hobbyistThreshold) {
    return "text-novice";
  } else if (score >= hobbyistThreshold && score < connoisseurThreshold) {
    return "text-hobbyist";
  } else if (score >= connoisseurThreshold && score < scholarThreshold) {
    return "text-connoisseur";
  } else if (score >= scholarThreshold && score < worshiperThreshold) {
    return "text-scholar";
  } else {
    return "text-worshiper";
  }
};
