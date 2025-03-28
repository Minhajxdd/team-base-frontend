import { Injectable } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { NavBarTypeModel } from './navbar.model';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  unProtectedRoutes = ['/login', '/register', '/reset-password'];
  noNavbar = ['/v-call'];

  navBar(events: Observable<any>): Observable<NavBarTypeModel> {
    return events.pipe(
      map((event: any) => {
        if (event instanceof NavigationEnd) {
          return this.getNavBarType(event.url);
        }
        return null;
      })
    );
  }

  private getNavBarType(url: string): NavBarTypeModel {
    if (url.startsWith('/admin')) {
      return 'admin';
    } else if (url.includes('/project') && !url.includes('/v-call')) {
      return 'project';
    } else if (this.unProtectedRoutes.some((route) => url.startsWith(route))) {
      return null;
    } else if (this.noNavbar.some((route) => url.includes(route))) {
      return null;
    } else {
      return 'user';
    }
  }
}
