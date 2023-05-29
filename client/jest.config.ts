import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ['react-native']},
};

export default config;