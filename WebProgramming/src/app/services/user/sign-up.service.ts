import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {myConfig} from '../../../config/my-config';
@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  constructor(private http: HttpClient) { }

  signUp(username, password, resume) {
    return this.http.post(myConfig.baseUrl + 'register', {
      username: username,
      password: password,
      resume: resume,
    });
  }
}
