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
import { DocComponent,
         DocsResolver } from './doc';
import { DocService } from './doc/doc.service';
import { ErrorInterceptor } from './error-interceptor';
import { FeaturesComponent } from './features';
import { LibComponent } from './lib';
import { LibsComponent } from './libs';
import { LibsService } from './libs';
import { MediaComponent } from './media';
import { HomeComponent } from './home';
import { MaritimeComponent } from './projects/maritime';
import { OmniverseComponent } from './projects/omniverse';
import { ShowcaseComponent } from './showcase';
import { SupportComponent } from './support';
import { ListedFilterPipe } from './doc/listed-filter.pipe';
import { SafePipe } from './doc/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    DocComponent,
    FeaturesComponent,
    LibComponent,
    LibsComponent,
    ListedFilterPipe,
    MediaComponent,
    HomeComponent,
    MaritimeComponent,
    OmniverseComponent,
    SupportComponent,
    SafePipe,
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
    DocsResolver,
    DocService,
    ErrorInterceptor,
    LibsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
