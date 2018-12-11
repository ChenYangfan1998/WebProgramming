import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import {MatModule} from '../mat.module';

@NgModule({
  imports: [
    CommonModule,
    MatModule
  ],
  declarations: [ArticleComponent]
})
export class ArticleModule { }
