import {Component, OnInit, ViewChild} from '@angular/core';
import {DiaryService} from '../../services/diary/diary.service';
import {SearchService} from '../../services/search/search.service';
import {fromEvent} from 'rxjs';
import {debounce, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {SnackBarService} from '../../services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  @ViewChild('searchInput') searchInput;

  searchContent;
  isSearchContent$;
  searchResultClass = ['hide'];
  infoClass = ['no-hide'];
  searchResult;
  resultMessage = '搜索中...';

  diaries = [];
  sortType = 'time';
  showWay = 'topDown';

  user;

  constructor(
    private diaryService: DiaryService,
    private searchService: SearchService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.initSearchObservable();
    this.diaryService.getAllDiary().subscribe(
      (data: any) => {
        this.diaries = data.diaries.reverse();
      },
      (err) => {
        this.snackBarService.showSnackBar('啊哦出错了');
        console.log(err);
      }
    );
    this.searchService.state.subscribe(
      (message) => {
        if (message) {
          this.searchContent = message;
          this.search();
          this.searchService.searched();
        }
      }
    );
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  changeClass () {
    if (this.searchContent) {
      this.searchResultClass = ['no-hide'];
      this.infoClass = ['hide'];
    } else {
      this.searchResultClass = ['hide'];
      this.infoClass = ['no-hide'];
    }
  }

  changeSearchResult () {
    this.sort();
  }

  search () {
    this.resultMessage = '搜索中...';
    this.changeClass();
    this.diaryService.search(this.user ? this.user.username : '', this.searchContent).subscribe(
      (data) => {
        this.searchResult = data;
        this.sort();
        this.resultMessage = '无结果哦QAQ';
        this.searchService.searched();
      }, () => {
        this.snackBarService.showSnackBar('搜索时发生错误');
        this.resultMessage = '无结果哦QAQ';
      }
    );
  }

  private initSearchObservable () {
    this.isSearchContent$ = fromEvent(this.searchInput.nativeElement, 'input').pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(
      () => {
        this.search();
      }
    );
  }

  private sort () {
    if (this.sortType === 'hot') {
      const tags = this.searchResult.tags;
      for (let i = 0; i < tags.length; i++) {
        for (let j = i; j < tags.length; j++) {
          if (tags[i].hot < tags[j].hot) {
            const temp = tags[i];
            tags[i] = tags[j];
            tags[j] = temp;
          }
        }
      }
      this.searchResult.tags = tags;
    } else if (this.sortType === 'count') {
      const tags = this.searchResult.tags;
      for (let i = 0; i < tags.length; i++) {
        for (let j = i; j < tags.length; j++) {
          if (tags[i].count < tags[j].count) {
            const temp = tags[i];
            tags[i] = tags[j];
            tags[j] = temp;
          }
        }
      }
      this.searchResult.tags = tags;
    } else if (this.sortType === 'time') {
      const tags = this.searchResult.tags;
      for (let i = 0; i < tags.length; i++) {
        for (let j = i; j < tags.length; j++) {
          if (tags[i].id > tags[j].id) {
            const temp = tags[i];
            tags[i] = tags[j];
            tags[j] = temp;
          }
        }
      }
      this.searchResult.tags = tags;
      const diaries = this.searchResult.diaries;
      for (let i = 0; i < diaries.length; i++) {
        for (let j = i; j < diaries.length; j++) {
          if (diaries[i].id > diaries[j].id) {
            const temp = diaries[i];
            diaries[i] = diaries[j];
            diaries[j] = temp;
          }
        }
      }
      this.searchResult.diaries = diaries;
    }
    if (this.showWay === 'bottomUp') {
      this.searchResult.tags = this.searchResult.tags.reverse();
    }
  }
}
