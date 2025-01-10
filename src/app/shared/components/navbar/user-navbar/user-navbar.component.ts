import { Component, inject, signal } from '@angular/core';
import { ThemeModeService } from '../../../../core/services/theme.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-user-navbar',
  imports: [CommonModule],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css',
})
export class UserNavbarComponent {
  private readonly themeService = inject(ThemeModeService);
  private readonly authService = inject(AuthService);

  isDarkMode = this.themeService.$isDarkMode;
  isDropActive = signal(false);

  onToggle() {
    this.themeService.toggle();
  }

  onProfileBtn() {
    this.isDropActive.set(!this.isDropActive());
  }

  onLogOut() {
    this.authService.logout();
  }

}
