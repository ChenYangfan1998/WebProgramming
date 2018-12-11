import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {myConfig} from '../../../config/my-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }


  // 模拟鉴权的功能
  auth () {
    return this.http.post(myConfig.baseUrl + 'auth', {});
  }
}
