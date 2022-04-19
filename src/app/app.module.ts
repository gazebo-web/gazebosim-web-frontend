import { BrowserModule, DomSanitizer, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from 'angular2-moment';
import { NgxGalleryModule } from 'ngx-gallery';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatIconModule,
  MatIconRegistry,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';
import 'hammerjs';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

import { AboutComponent } from './about';
import { HomeComponent } from './home';
import { DevComponent } from './dev';
import { BenchmarkResolver } from './dev';
import { BenchmarkService } from './dev';
import { DocsResolver } from './doc';
import { DocVersionComponent } from './doc';
import { DocComponent } from './doc';
import { ListedFilterPipe } from './doc/listed-filter.pipe';
import { FeaturesComponent } from './features';
import { LibComponent } from './lib';
import { LibsComponent } from './libs';
import { LibsService } from './libs/libs.service';
import { MediaComponent } from './media';
import { DocService } from './doc/doc.service';
import { SupportComponent } from './support';
import { ShowcaseComponent } from './showcase';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { JsonClassFactoryService } from './factory/json-class-factory.service';

import { Ng2DeviceService } from './device-detector';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import '../styles/styles.scss';
import '../styles/custom-theme.scss';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  BenchmarkResolver,
  BenchmarkService,
  DocsResolver,
  JsonClassFactoryService,
  DocService,
  LibsService,
  Ng2DeviceService,
  Title,
];

interface StoreType  {
  state: InternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AboutComponent,
    AppComponent,
    HomeComponent,
    DevComponent,
    DocComponent,
    DocVersionComponent,
    FeaturesComponent,
    LibComponent,
    LibsComponent,
    ListedFilterPipe,
    MediaComponent,
    PageNotFoundComponent,
    SupportComponent,
    SafeHtmlPipe,
    ShowcaseComponent,
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot({
      provide: MarkedOptions,
        useValue: {
          sanitize: false,
          gfm: true,
          breaks: false,
          baseUrl: 'docs/',
        },
      }),
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatOptionModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MomentModule,
    NgxGalleryModule,
    NgxChartsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules }),
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
  ],
  entryComponents: [
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    // This was taken from https://materialdesignicons.com/getting-started
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icon/mdi.svg'));
    matIconRegistry.addSvgIcon('gz-world',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icon/world.svg'));
    matIconRegistry.addSvgIcon('gz-model',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icon/model.svg'));
    matIconRegistry.addSvgIcon('gz-architecture',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icon/architecture.svg'));
  }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      const restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues  = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
