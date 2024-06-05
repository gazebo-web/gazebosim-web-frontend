import { NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about';
import { ErrorInterceptor } from './error-interceptor';
import { FeaturesComponent } from './features';
import { HomeComponent } from './home';
import { MediaComponent } from './media';
import { MaritimeComponent } from './projects/maritime';
import { NotFoundComponent } from './not-found';
import { OmniverseComponent } from './projects/omniverse';
import { ShowcaseComponent } from './showcase';
import { SupportComponent } from './support';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    FeaturesComponent,
    MediaComponent,
    HomeComponent,
    MaritimeComponent,
    NotFoundComponent,
    OmniverseComponent,
    SupportComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE,
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          breaks: false,
          smartLists: true,
          smartypants: false,
          //baseUrl: 'docs/',
        },
      },
    }),
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,
    MatToolbarModule,
    MatTreeModule,
    MatSelectModule,
    MatSnackBarModule,
    ShowcaseComponent,
  ],
  providers: [
    ErrorInterceptor,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
