import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about';
import { DocComponent,
         DocsResolver } from './doc';
import { HomeComponent } from './home';
import { LibComponent } from './lib';
import { LibsComponent } from './libs';
import { MaritimeComponent } from './projects/maritime';
import { NotFoundComponent } from './not-found';
import { OmniverseComponent } from './projects/omniverse';
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
    path: 'projects/maritime',
    component: MaritimeComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: 'projects/omniverse',
    component: OmniverseComponent,
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
    // Bad URLs go to not-found page
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
