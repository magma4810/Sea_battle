module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.css$": "jest-transform-stub", // Добавьте эту строку для обработки CSS
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy", // Чтобы Jest мог игнорировать CSS
  },
};
