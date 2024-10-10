import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubIntegrationService {
  private apiUrl = 'http://localhost:3000/github';
  private githubUserId: string | null = null;

  constructor(private http: HttpClient) {
    this.githubUserId = localStorage.getItem('githubUserId');
  }

  initiateAuth(): Observable<{ authUrl: string }> {
    return this.http.get<{ authUrl: string }>(`${this.apiUrl}/auth`);
  }

  getStatus(userId: string): Observable<{ connected: boolean, integrationDate: Date | null }> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<{ connected: boolean, integrationDate: Date | null }>(`${this.apiUrl}/status`, { params });
  }

  removeIntegration(userId: string): Observable<{ success: boolean }> {
    const params = new HttpParams().set('userId', userId);
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/remove`, { params });
  }

  setGithubUserId(userId: string) {
    this.githubUserId = userId;
    localStorage.setItem('githubUserId', userId);
  }

  getGithubUserId(): string | null {
    return this.githubUserId;
  }

  clearGithubUserId() {
    this.githubUserId = null;
    localStorage.removeItem('githubUserId');
  }
}