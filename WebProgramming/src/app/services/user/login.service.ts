import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {myConfig} from '../../../config/my-config';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {UserModel} from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private subject: Subject<UserModel> = new BehaviorSubject<UserModel>(new UserModel());

  constructor(private http: HttpClient) { }

  public get state(): Observable<UserModel> {
    return this.subject.asObservable();
  }

  login(loginName, password) {
    return this.http.post(myConfig.baseUrl + 'login', {
      username: loginName,
      password: password
    }).subscribe(
      (data: any) => {
        this.subject.next(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      },
      () => {
        this.subject.next(new UserModel());
      }
    );
  }

  logout () {
    this.subject.next(new UserModel());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
