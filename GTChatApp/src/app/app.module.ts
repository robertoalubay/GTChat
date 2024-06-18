import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GtChatComponent } from "./gt-chat/gt-chat.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupComponent } from './gt-chat/popup/popup.component';


@NgModule({
    declarations: [
        AppComponent,
        
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        GtChatComponent,
        BrowserAnimationsModule,
        PopupComponent
    ],
})
export class AppModule { }
