import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about';
import { DocComponent,
         DocVersionComponent,
         DocsResolver } from './doc';
import { DocService } from './doc/doc.service';
import { ErrorInterceptor } from './error-interceptor';
import { FeaturesComponent } from './features';
import { LibsComponent } from './libs';
import { LibsService } from './libs';
import { MediaComponent } from './media';
import { HomeComponent } from './home';
import { ShowcaseComponent } from './showcase';
import { SupportComponent } from './support';
import { ListedFilterPipe } from './doc/listed-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    DocComponent,
    DocVersionComponent,
    FeaturesComponent,
    LibsComponent,
    ListedFilterPipe,
    MediaComponent,
    HomeComponent,
    ShowcaseComponent,
    SupportComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          sanitize: false,
          gfm: true,
          breaks: false,
          baseUrl: 'docs/',
        },
      },
    }),
    MatChipsModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatSnackBarModule,
    NgxGalleryModule,
  ],
  providers: [
    DocsResolver,
    DocService,
    ErrorInterceptor,
    LibsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }