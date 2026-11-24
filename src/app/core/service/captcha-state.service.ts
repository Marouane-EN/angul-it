import { computed, Service, signal } from '@angular/core';
import { CaptchaConfig, CaptchaState, CaptchaType } from '../model/captcha.models';

const CAPTCHA_STATE_KEY = 'captchaState';

@Service()
export class CaptchaStateService {
  private readonly _state = signal<CaptchaState | null>(this.loadState());
  readonly state = this._state.asReadonly();
  readonly hasState = computed<boolean>(() => this._state() !== null);
  readonly currentIndex = computed<number>(() => this._state()?.currentStage ?? 0);
  readonly isCompleted = computed<boolean>(() => this._state()?.isCompleted ?? false);
  readonly unlockStage = computed<number>(() => {
    const s = this._state();
    if (!s) return 0;
    const firstOpen = s.stages.findIndex((stage) => !stage.completed);
    return firstOpen === -1 ? s.stages.length - 1 : firstOpen;
  });

  startCaptcha(stages: string[]): void {
    const captchaStages: CaptchaConfig[] = stages.map((stage) => ({
      type: this.getCaptchaType(stage),
      attempts: 0,
      answer: this.generateAnswer(stage),
      completed: false,
    }));
    const newState: CaptchaState = {
      currentStage: 0,
      stages: captchaStages,
      attemptsLeft: stages.length,
      startTime: Date.now(),
      finishedTime: null,
      isCompleted: false,
    };
    this.saveState(newState);
  }

  faildAttempt(index: number): void {
    const s = this._state();
    if (!s || !s.stages[index]) return;
    const stages = s.stages.map((stage, i) =>
      i === index ? { ...stage, attempts: stage.attempts + 1 } : stage,
    );
    this.saveState({ ...s, stages });
  }

  completeStage(index: number): void {
    const s = this._state();
    if (!s || !s.stages[index] || index < this.unlockStage()) return;
    const stages = s.stages.map((stage, i) =>
      i === index ? { ...stage, completed: true } : stage,
    );
    const isCompleted = stages.every((stage) => stage.completed);
    const finishedTime = isCompleted ? Date.now() : null;
    this.saveState({ ...s, stages, isCompleted, finishedTime });
  }

  goToNextStage(index: number): void {
    const s = this._state();
    if (!s || !s.stages[index] || index < this.unlockStage()) return;
    const currentStage = index + 1;
    this.saveState({ ...s, currentStage });
  }

  resetCaptcha(): void {
    this._state.set(null);
    localStorage.removeItem(CAPTCHA_STATE_KEY);
  }

  private getCaptchaType(stage: string): CaptchaType {
    if (stage === 'image') {
      return 'image';
    } else if (stage === 'number') {
      return 'number';
    } else {
      return 'text';
    }
  }

  private generateAnswer(stage: string): number[] | string | number {
    if (stage === 'image') {
      return [1, 2, 3]; // Example answer for image captcha
    } else if (stage === 'number') {
      return 42; // Example answer for number captcha
    } else {
      return 'captcha'; // Example answer for text captcha
    }
  }

  private saveState(newState: CaptchaState): void {
    this._state.set(newState);
    try {
      localStorage.setItem(CAPTCHA_STATE_KEY, JSON.stringify(newState));
    } catch (error) {}
  }

  private loadState(): CaptchaState | null {
    try {
      const stateString = localStorage.getItem(CAPTCHA_STATE_KEY);
      if (!stateString) {
        return null;
      }
      if (!this.isStateValid(JSON.parse(stateString))) {
        return null;
      }
      return JSON.parse(stateString) as CaptchaState;
    } catch (error) {
      return null;
    }
  }

  private isStateValid(state: CaptchaState | null): boolean {
    if (!state) {
      return true;
    }
    if (typeof state.currentStage !== 'number' || state.currentStage < 0) {
      return false;
    }
    if (!Array.isArray(state.stages) || state.stages.length === 0) {
      return false;
    }
    if (typeof state.attemptsLeft !== 'number' || state.attemptsLeft < 0) {
      return false;
    }
    if (typeof state.startTime !== 'number' || state.startTime < 0) {
      return false;
    }
    if (
      state.finishedTime !== null &&
      (typeof state.finishedTime !== 'number' || state.finishedTime < 0)
    ) {
      return false;
    }
    if (typeof state.isCompleted !== 'boolean') {
      return false;
    }
    return true;
  }
}
