import { Component } from '@angular/core';
import { LinesOfBusinessComponent } from "./lines-of-business/lines-of-business.component";
import { BuildStatusCardComponent } from "./build-status-card/build-status-card.component";

@Component({
  selector: 'app-dashboard',
  imports: [LinesOfBusinessComponent, BuildStatusCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
