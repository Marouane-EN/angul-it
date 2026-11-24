import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CaptchaStateService } from '../../core/service/captcha-state.service';

@Component({
  imports: [JsonPipe],
  selector: 'app-captcha',
  styleUrl: './captcha.component.scss',
  templateUrl: './captcha.component.html',
})
export class CaptchaComponent {
  protected readonly state = inject(CaptchaStateService);
}
