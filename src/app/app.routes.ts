import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CaptchaComponent } from './pages/captcha/captcha.component';
import { ResultComponent } from './pages/result/result.component';
import { captchaGuard, resultGuard } from './core/guard/captcha-guard-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Angul-It' },
  {
    path: 'captcha',
    canActivate: [captchaGuard],
    component: CaptchaComponent,
    title: 'Angul-It – Challenge',
  },
  {
    path: 'result',
    canActivate: [resultGuard],
    component: ResultComponent,
    title: 'Angul-It – Results',
  },
  { path: '**', redirectTo: '' },
];
