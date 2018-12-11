import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {myConfig} from '../../../config/my-config';

@Injectable({
  providedIn: 'root'
})
export class UploadAvatarService {

  constructor(private http: HttpClient) { }

  uploadAvatar(file, username) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('username', username);
    return this.http.post(myConfig.baseUrl + 'uploadAvatar', formData);
  }
}
