import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about';
import { DocComponent,
         DocVersionComponent,
         DocsResolver } from './doc';
import { HomeComponent } from './home';
import { LibComponent } from './lib';
import { LibsComponent } from './libs';
import { MediaComponent } from './media';
import { FeaturesComponent } from './features';
import { ShowcaseComponent } from './showcase';
import { SupportComponent } from './support';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'docs',
    component: DocComponent,
    resolve: {
      docsInfo: DocsResolver
    }
  },
  {
    path: 'docs/:version',
    component: DocComponent,
    resolve: {
      docsInfo: DocsResolver
    }
  },
  {
    // Gets the page associated with a specific version
    path: 'docs/:version/:page',
    component: DocComponent,
    resolve: {
      docsInfo: DocsResolver
    }
  },
  {
    path: 'features',
    component: FeaturesComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'libs',
    component: LibsComponent,
  },
  {
    path: 'libs/:lib',
    component: LibComponent,
  },
  {
    path: 'media',
    component: MediaComponent,
  },
  {
    path: 'showcase',
    component: ShowcaseComponent,
  },
  {
    path: 'support',
    component: SupportComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
