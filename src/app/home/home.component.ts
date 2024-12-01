import { Component } from '@angular/core';
import { HeaderComponent } from '../part/header/header.component';
import { BodyComponent } from '../part/body/body.component';
import { FooterComponent } from '../part/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, BodyComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <app-body></app-body>
    <app-footer></app-footer>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
