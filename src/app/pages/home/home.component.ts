import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CaptchaStateService } from '../../core/service/captcha-state.service';

@Component({
  imports: [RouterLink],
  selector: 'app-home',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  protected readonly state = inject(CaptchaStateService);
  private readonly router = inject(Router);
  start(): void {
    this.state.startCaptcha(['image', 'number', 'text']);
    this.router.navigate(['/captcha']);
  }
}
