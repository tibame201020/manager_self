
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router,) { }

  wakeUp() {
    this.http.get(environment.baseUrl + 'wakeUp').subscribe();
  }

  getLineAccessUrl(): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    }
    return this.http.get<string>(environment.baseUrl + 'login', requestOptions);
  }

  getParam(code: string): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    }
    return this.http.post<string>(environment.baseUrl + 'getParam', code, requestOptions);
  }

  getInfo(param: string): Observable<any> {
    return this.http.post(environment.lineTokenUrl,
      param,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    );
  }

  getToken(sub: string): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    }
    return this.http.post<string>(environment.baseUrl + 'getToken', sub, requestOptions);
  }
}
