import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GithubIntegrationComponent } from './component/github-integration/github-integration.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GithubIntegrationComponent],
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent { }