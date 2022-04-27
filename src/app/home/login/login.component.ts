import { SideBarService } from './../../side-bar/side-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './../../login.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserInfoService } from 'src/app/share/user-info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private LoginService: LoginService,
    private route: ActivatedRoute,
    private UserInfoService: UserInfoService,
    private router: Router,
    private SideBarService: SideBarService) { }

  ngOnInit(): void {
    this.SideBarService.hideSideBar();

    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['code']) {
        this.LoginService.getParam(queryParams['code']).subscribe(
          res => {
            this.LoginService.getInfo(res).subscribe(
              res => {
                const helper = new JwtHelperService();
                const decodedToken = helper.decodeToken(res.id_token);
                this.UserInfoService.setName(decodedToken.name);
                if (decodedToken.picture) {
                  this.UserInfoService.setPicture(decodedToken.picture);
                }
                this.LoginService.getToken(decodedToken.sub).subscribe(
                  res => {
                    this.UserInfoService.setAccessToken(res);
                    this.router.navigate(['home']);
                  }
                )
              }
            )
          }
        )
      }
    })
  }

  login() {
    window.location.href = this.LoginService.getLineAccessUrl();
  }

}
