import { Component } from '@angular/core';
import { AdminNavbarComponent } from "../../../../shared/components/navbar/admin-navbar/admin-navbar.component";

@Component({
  selector: 'app-dashboard',
  imports: [AdminNavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}