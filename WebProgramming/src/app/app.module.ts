import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {ArticleModule} from './article/article.module';
import {CoreModule} from './core/core.module';
import {PersonalInfoModule} from './personal-info/personal-info.module';
import {SharedModule} from './shared/shared.module';
import {TrunkModule} from './trunk/trunk.module';
import {TrunkRoutingModule} from './trunk/trunk-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatModule} from './mat.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PersonalInfoRoutingModule} from './personal-info/personal-info-routing.module';
import {PhotoShopRoutingModule} from './photo-shop/photo-shop-routing.module';
import {PhotoShopModule} from './photo-shop/photo-shop.module';
import {AuthInterceptor} from './services/auth/auth-interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ArticleModule,
    CoreModule,
    PhotoShopModule,
    TrunkModule,
    PersonalInfoModule,
    SharedModule,
    AppRoutingModule,
    PersonalInfoRoutingModule,
    TrunkRoutingModule,
    PhotoShopRoutingModule,
    HttpClientModule,

    MatModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule { }
