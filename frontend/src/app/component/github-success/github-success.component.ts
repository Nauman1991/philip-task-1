import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubIntegrationService } from '../../services/github-integration.service';

@Component({
  selector: 'app-github-success',
  template: `
    <div>
      <h2>GitHub Integration Successful!</h2>
      <p>Redirecting to dashboard...</p>
    </div>
  `,
})
export class GithubSuccessComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private githubService: GithubIntegrationService
  ) {}

  ngOnInit() {
    console.log('GithubSuccessComponent ngOnInit');
    this.route.queryParams.subscribe(params => {
      const userId = params['userId'];
      console.log('Received userId:', userId);
      if (userId) {
        this.githubService.setGithubUserId(userId);
        console.log('Set githubUserId:', userId);
        // Verify the userId was set
        const savedUserId = this.githubService.getGithubUserId();
        console.log('Verified saved userId:', savedUserId);
        // Redirect to the main page or dashboard after a short delay
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      } else {
        console.error('No userId provided in the callback');
        this.router.navigate(['/']);
      }
    });
  }
}