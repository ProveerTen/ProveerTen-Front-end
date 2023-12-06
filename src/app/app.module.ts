import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { AdvertisingSliderComponent } from './component/advertising-slider/advertising-slider.component';
import { PopularProductsSliderComponent } from './component/popular-products-slider/popular-products-slider.component';
import { AdvertisingWindowsComponent } from './component/advertising-windows/advertising-windows.component';
import { ChatComponent } from './component/chat/chat.component';
import { AffiliatesComponent } from './component/affiliates/affiliates.component';
import { PostWindowsComponent } from './component/post-windows/post-windows.component';
import { ChatWindowComponent } from './component/chat-window/chat-window.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AdvertisingSliderComponent,
    PopularProductsSliderComponent,
    AdvertisingWindowsComponent,
    ChatComponent,
    AffiliatesComponent,
    PostWindowsComponent,
    ChatWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
