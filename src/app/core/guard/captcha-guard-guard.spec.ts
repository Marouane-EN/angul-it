import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { captchaGuardGuard } from './captcha-guard-guard';

describe('captchaGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => captchaGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
