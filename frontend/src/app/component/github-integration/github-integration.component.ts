import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { GithubIntegrationService } from '../../services/github-integration.service';

@Component({
  selector: 'app-github-integration',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatExpansionModule],
  templateUrl: './github-integration.component.html',
  styles: [`
    .github-card {
      max-width: 600px;
      margin: 20px auto;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    mat-card-header {
      align-items: center;
      padding: 16px;
    }
    .github-icon {
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .expand-button {
      margin-right: -8px;
    }
    mat-card-content {
      padding: 0 16px;
    }
    .connect-title {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      margin: 20px 0;
      color: #5468ff;
    }
    mat-card-actions {
      padding: 16px;
      display: flex;
      justify-content: center;
    }
    .connect-button {
      width: 100%;
      background-color: #5468ff;
      color: white;
    }
    mat-expansion-panel {
      max-width: 600px;
      margin: 20px auto;
    }
    mat-panel-title {
      align-items: center;
      display: flex;
    }
    mat-panel-description {
      justify-content: flex-end;
      align-items: center;
    }
    mat-icon {
      margin-right: 8px;
    }
    button {
      margin-top: 16px;
    }
  `]
})
export class GithubIntegrationComponent implements OnInit {
  connected = false;
  lastSyncedDate: Date | null = null;
  syncType = 'full';
  githubUserId: string | null = null;

  constructor(private githubService: GithubIntegrationService) {}

  ngOnInit() {
    this.checkStatus();
  }

  checkStatus() {
    this.githubUserId = this.githubService.getGithubUserId();
    if (this.githubUserId) {
      this.githubService.getStatus(this.githubUserId).subscribe(
        (status) => {
          this.connected = status.connected;
          this.lastSyncedDate = status.integrationDate;
        },
        (error) => console.error('Error checking status:', error)
      );
    } else {
      this.connected = false;
      this.lastSyncedDate = null;
    }
  }

  connect() {
    this.githubService.initiateAuth().subscribe(
      (response) => {
        window.location.href = response.authUrl;
      },
      (error) => console.error('Error initiating auth:', error)
    );
  }

  removeIntegration() {
    if (this.githubUserId) {
      this.githubService.removeIntegration(this.githubUserId).subscribe(
        (result) => {
          if (result.success) {
            this.connected = false;
            this.lastSyncedDate = null;
            this.githubUserId = null;
            this.githubService.clearGithubUserId();
          } else {
            console.error('Failed to remove integration');
          }
        },
        (error) => console.error('Error removing integration:', error)
      );
    }
  }
}