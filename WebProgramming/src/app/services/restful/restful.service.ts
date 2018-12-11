import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {myConfig} from '../../../config/my-config';

@Injectable({
  providedIn: 'root'
})
export class RestfulService {

  constructor(private http: HttpClient) { }

  getWallPaper() {
    return this.http.get(myConfig.baseUrl + 'getWallPaper');
  }
}
