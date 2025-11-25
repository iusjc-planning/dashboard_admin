import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import 'flowbite';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'gestion-salles';
}
