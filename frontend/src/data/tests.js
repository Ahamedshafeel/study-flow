const commonTest = [
  {
    question: "What is a programming language?",
    options: ["Tool", "Language", "Game", "None"],
    answer: "Language"
  },
  {
    question: "Which is a loop?",
    options: ["for", "if", "var", "int"],
    answer: "for"
  },
  {
    question: "Which is correct syntax?",
    options: ["code", "syntax", "rule", "logic"],
    answer: "syntax"
  },
  {
    question: "Which is variable?",
    options: ["x", "loop", "if", "class"],
    answer: "x"
  },
  {
    question: "Programming is used for?",
    options: ["Building apps", "Cooking", "Driving", "None"],
    answer: "Building apps"
  }
];

const tests = {
  java: {
    basics: {
      week1: {
        day1: commonTest
      }
    }
  },

  c: {
    basics: {
      week1: {
        day1: commonTest
      }
    }
  },

  python: {
    basics: {
      week1: {
        day1: commonTest
      }
    }
  },

  oops: {
    basics: {
      week1: {
        day1: commonTest
      }
    }
  }
};

export default tests;
