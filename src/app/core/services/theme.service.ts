import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeModeService {
  private _document = inject(DOCUMENT);

  public $isDarkMode = signal<boolean>(false);

  private setTheme(href: string): void {
    const linkElement = this._document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;
    linkElement.href = href;
  }

  public toggle(): void {
    this.$isDarkMode() ? this.setLightMode() : this.setDarkMode();
  }

  public isSystemDark(): boolean {
    return typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme:dark)').matches
      : false;
  }

  public setLightMode(): void {
    this.setTheme('theme-light.css');
    this.$isDarkMode.set(false);
    localStorage.setItem('theme', 'light');
  }

  public setDarkMode(): void {
    this.setTheme('theme-dark.css');
    this.$isDarkMode.set(true);
    localStorage.setItem('theme', 'dark');
  }

  public initializeTheme(): void {
    const theme = localStorage.getItem('theme');

    if (!theme) {
      this.isSystemDark() ? this.setDarkMode() : this.setLightMode();
    } else {
      theme === 'dark' ? this.setDarkMode() : this.setLightMode();
    }
  }
}
