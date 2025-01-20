import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-dashboard',
  imports: [],
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.css',
})
export class ProjectDashboardComponent  implements OnInit{
  private authService = inject(AuthService);
  private route  = inject(ActivatedRoute);

  ngOnInit(): void {
    // console.log(this.route.snapshot.params["projectId"]);
  }
}
