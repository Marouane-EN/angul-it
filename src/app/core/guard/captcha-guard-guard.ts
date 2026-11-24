import { CanActivateFn, Router } from '@angular/router';
import { CaptchaStateService } from '../service/captcha-state.service';
import { inject } from '@angular/core';

export const captchaGuard: CanActivateFn = () => {
  const state = inject(CaptchaStateService);
  return state.hasState() ? true : inject(Router).createUrlTree(['/']);
};

export const resultGuard: CanActivateFn = () => {
  const state = inject(CaptchaStateService);
  if (state.isCompleted()) return true;
  return inject(Router).createUrlTree(state.hasState() ? ['/captcha'] : ['/']);
};
