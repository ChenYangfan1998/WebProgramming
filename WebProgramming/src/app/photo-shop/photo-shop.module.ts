import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PhotoShopComponent} from './photo-shop.component';
import {BoardComponent} from './board/board.component';
import {FormsModule} from '@angular/forms';
import {MatModule} from '../mat.module';
import {PhotoShopRoutingModule} from './photo-shop-routing.module';
import {PublishDiaryDialogComponent} from '../shared/publish-diary-dialog/publish-diary-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatModule,
    PhotoShopRoutingModule
  ],
  declarations: [PhotoShopComponent, BoardComponent],
  entryComponents: [
    PublishDiaryDialogComponent
  ]
})
export class PhotoShopModule {
}
