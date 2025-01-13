import { NgClass } from '@angular/common';
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

  ngOnInit() {
    this.projectId.set(this.route.snapshot.params['projectId']);
  }

  isDarkMode = this.themeService.$isDarkMode;

  toggleSideBar = signal(false);

  onToggleSideBar() {
    this.toggleSideBar.set(!this.toggleSideBar());
  }

  onToggle() {
    this.themeService.toggle();
  }
}
