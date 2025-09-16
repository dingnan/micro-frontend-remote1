import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HOME } from './svg-data-uris';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('remote1');
  HOME_SVG_DATA_URI = HOME;
}
