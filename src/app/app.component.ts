import { Component } from '@angular/core';
import { UserInfoService } from './share/user-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'manager_self';

  constructor(public UserInfoService:UserInfoService) {

  }
}
