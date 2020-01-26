import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {ImageManipulatorComponent} from './image-manipulator/image-manipulator.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgxFileDropModule} from "ngx-file-drop";
import {HomeComponent} from './home/home.component';
import {HeaderComponent, ImageDownloadDialog} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSliderModule} from "@angular/material/slider";
import {PinchZoomModule} from "ngx-pinch-zoom";
import {FileUploadModule} from "ng2-file-upload";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    ImageManipulatorComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    FileUploadComponent,
    ImageDownloadDialog
  ],
  entryComponents: [
    ImageDownloadDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    NgxFileDropModule,
    MatIconModule,
    MatGridListModule,
    MatSliderModule,
    PinchZoomModule,
    FileUploadModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
