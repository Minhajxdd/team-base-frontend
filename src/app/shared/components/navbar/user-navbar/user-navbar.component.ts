import { Component, inject } from '@angular/core';
import { ThemeModeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-user-navbar',
  imports: [],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent {
  private readonly themeService = inject(ThemeModeService);
  isDarkMode = this.themeService.$isDarkMode;

  onToggle() {
    this.themeService.toggle();
  }
}
