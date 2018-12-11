import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticleComponent} from './article/article.component';



const routes: Routes = [
  { path: 'article/:id', component: ArticleComponent},
  { path: '**', redirectTo: '/trunk', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
