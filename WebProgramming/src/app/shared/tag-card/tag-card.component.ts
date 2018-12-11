import {Component, Input, OnInit} from '@angular/core';
import {SearchService} from '../../services/search/search.service';

@Component({
  selector: 'app-tag-card',
  templateUrl: './tag-card.component.html',
  styleUrls: ['./tag-card.component.scss']
})
export class TagCardComponent implements OnInit {

  @Input('tag') tag;

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit() {
  }

  search () {
    this.searchService.search(this.tag.tag);
  }

}
