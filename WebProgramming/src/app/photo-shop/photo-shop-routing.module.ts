import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PhotoShopComponent} from './photo-shop.component';
import {BoardComponent} from './board/board.component';

const PhotoShopRoutes: Routes = [
  {path: 'photo-shop', component: PhotoShopComponent},
  {path: 'photo-shop/board', component: BoardComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(PhotoShopRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PhotoShopRoutingModule {
}
