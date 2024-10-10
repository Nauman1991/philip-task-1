import { Routes } from '@angular/router';
import { GithubIntegrationComponent } from './component/github-integration/github-integration.component';
// import { GithubCallbackComponent } from './component/github-callback/github-callback.component';
import { GithubSuccessComponent } from './component/github-success/github-success.component';


export const routes: Routes = [
    { path: '', component: GithubIntegrationComponent },
    { path: 'github-success', component: GithubSuccessComponent },
];
