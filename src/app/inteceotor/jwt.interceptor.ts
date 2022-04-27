import { UserInfoService } from 'src/app/share/user-info.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private UserInfoService: UserInfoService
  ) { }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      Swal.fire({
        title: 'Error!',
        text: 'The token is expired',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      })
      this.UserInfoService.logOut();
      return of(err.message);
    }
    return of(err);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const access_token = this.UserInfoService.getAccessToken();
    if (access_token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${access_token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError(x => this.handleAuthError(x))
    );
  }
}
