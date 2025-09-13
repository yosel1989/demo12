import { Component } from '@angular/core';
import { AuthApiService } from 'app/features/auth/services/auth-api.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public authApi: AuthApiService) {}

}
