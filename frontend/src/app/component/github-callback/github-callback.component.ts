import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-github-callback',
  templateUrl: './github-callback.component.html',
})
export class GithubCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.http.get(`http://localhost:3000/github/callback?code=${code}`).subscribe(
          () => {
            // Redirect to the main page or show a success message
            this.router.navigate(['/']);
          },
          error => {
            console.error('Error during GitHub callback:', error);
            // Handle error (e.g., show error message)
          }
        );
      }
    });
  }
}