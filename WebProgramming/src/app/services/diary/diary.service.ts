import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {myConfig} from '../../../config/my-config';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor(
    private http: HttpClient
  ) { }

  uploadDiary (file, content, username, tags) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('content', content);
    formData.append('username', username);
    for (let i = 0; i < tags.length; i++) {
      formData.append('tags[' + i + ']', tags[i]);
    }
    return this.http.post(myConfig.baseUrl + 'uploadDiary', formData);
  }

  deleteDiary (diaryId) {
    return this.http.post(myConfig.baseUrl + 'deleteDiary', {
      diaryId: diaryId
    });
  }

  search (username, content) {
    return this.http.post(myConfig.baseUrl + 'search', {
      username: username,
      content: content
    });
  }

  updateDiaryTags (diaryId, tags) {
    return this.http.post(myConfig.baseUrl + 'updateDiaryTags', {
      diaryId: diaryId,
      tags: tags
    });
  }

  getAllTags () {
    return this.http.post(myConfig.baseUrl + 'getAllTags', {});
  }

  getDiaryByUsername (username) {
    return this.http.post(myConfig.baseUrl + 'getDiaryByUsername', {
      username: username
    });
  }

  getAllDiary () {
    return this.http.post(myConfig.baseUrl + 'getDiaryByUsername', {
      username: '__all'
    });
  }
}
