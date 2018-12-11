import {Component, Input} from '@angular/core';
import {myConfig} from '../../../config/my-config';
import {SearchService} from '../../services/search/search.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent {

  avatarSrc;
  baseUrl = myConfig.baseUrl;
  @Input('diary') diary;

  constructor(
    private searchService: SearchService,
    private router: Router
  ) { }

  search (tag) {
    this.searchService.search(tag);
    this.router.navigateByUrl('/trunk');
  }
}
