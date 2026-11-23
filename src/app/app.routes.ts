import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CaptchaComponent } from './pages/captcha/captcha.component';
import { ResultComponent } from './pages/result/result.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Angul-It' },
  { path: 'captcha', component: CaptchaComponent, title: 'Angul-It – Challenge' },
  { path: 'result', component: ResultComponent, title: 'Angul-It – Results' },
  { path: '**', redirectTo: '' },
];
