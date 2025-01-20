import { Component, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { BoardComponent } from "./board/board.component";

@Component({
  selector: 'app-project-dashboard',
  imports: [HeaderComponent, BoardComponent],
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.css',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ProjectDashboardComponent  implements OnInit{
  private authService = inject(AuthService);
  private route  = inject(ActivatedRoute);

  ngOnInit(): void {
    // console.log(this.route.snapshot.params["projectId"]);
  }
}
