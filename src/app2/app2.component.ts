import {Component} from '@angular/core';

@Component({
  selector: 'app2',
  template: `
    <div style="margin-top: 100px;">
     我是 Angular
    </div>
    <a [routerLink]="['/subroute1']" routerLinkActive="active">Angular route 1</a>
    <a [routerLink]="['/subroute2']" routerLinkActive="active">Angular route 2</a>

    <router-outlet></router-outlet>
  `,
})
export class App2 {
}
