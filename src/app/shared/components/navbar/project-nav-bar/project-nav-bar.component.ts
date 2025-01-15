import { getLocaleMonthNames, NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ThemeModeService } from '../../../../core/services/theme.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-nav-bar',
  imports: [NgClass, RouterLink],
  templateUrl: './project-nav-bar.component.html',
  styleUrl: './project-nav-bar.component.css',
})
export class ProjectNavBarComponent implements OnInit {
  private readonly themeService = inject(ThemeModeService);
  private route = inject(ActivatedRoute);

  projectId = signal<null | string>(null);

  isToggled = signal(true);
  isProfileToggled = signal(false);

  ngOnInit() {
    this.projectId.set(this.route.snapshot.params['projectId']);

    if (localStorage.getItem('side_bar_opened') === 'true') {
      this.isToggled.set(true);
    } else {
      this.isToggled.set(false);
    }
  }

  toggle() {
    this.isToggled = signal(!this.isToggled());
    localStorage.setItem('side_bar_opened', String(this.isToggled()));
  }

  toggleProfile() {
    this.isProfileToggled.set(!this.isProfileToggled());
  }

  onThemeToggle() {
    this.themeService.toggle();
  }
}
