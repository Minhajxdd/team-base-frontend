import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ThemeModeService } from './core/services/theme.service';
import { NavBarService } from './shared/components/navbar/navbar.service';
import { UserNavbarComponent } from './shared/components/navbar/user-navbar/user-navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  navbarType = signal<null | 'user' | 'project' | 'admin'>(null);

  constructor(
    private readonly themeModeService: ThemeModeService,
    private readonly router: Router,
    private readonly navbarService: NavBarService
  ) {
    // Initializing themes
    this.themeModeService.initializeTheme();

    this.navbarService.navBar(this.router.events).subscribe((type) => {
      this.navbarType.set(type);
    });
  }
}
