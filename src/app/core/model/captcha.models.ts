export type CaptchaType = 'image' | 'number' | 'text';
export type CaptchaAnswer = number[] | string | number;
export type CaptchaConfig = {
  type: CaptchaType;
  attempts: number;
  answer: CaptchaAnswer;
  completed: boolean;
};
export type CaptchaState = {
  currentStage: number;
  stages: CaptchaConfig[];
  attemptsLeft: number;
  startTime: number;
  finishedTime: number | null;
  isCompleted: boolean;
};
