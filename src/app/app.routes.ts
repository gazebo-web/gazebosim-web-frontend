import { Routes, ActivatedRoute } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';

import { AboutComponent } from './about';
import { AssetDisplayComponent } from './asset-display';
import { AuthCallbackComponent } from './auth/callback.component';
import { HomeComponent } from './home';
import { LibComponent } from './lib';
import { LibsComponent } from './libs';
import { MediaComponent } from './media';
import { DevComponent } from './dev';
import { BenchmarkResolver } from './dev';
import { DocComponent } from './doc';
import { DocVersionComponent } from './doc';
import { DocsResolver } from './doc';
import { FeaturesComponent } from './features';
import { PageNotFoundComponent } from './page-not-found';
import { SupportComponent } from './support';
import { ShowcaseComponent } from './showcase';

export const ROUTES: Routes = [
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
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'support',
    component: SupportComponent,
  },
  {
    path: 'libs',
    component: LibsComponent,
  },
  {
    path: 'dev',
    component: DevComponent,
    resolve: {
      benchmarkInfo: BenchmarkResolver
    }
  },
  {
    path: 'docs',
    component: DocComponent,
    resolve: {
      docsInfo: DocsResolver
    }
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
    path: 'docs/:version',
    component: DocVersionComponent,
    resolve: {
      docsInfo: DocsResolver
    }
  },
  {
    // Gets the page associated with a specific version
    path: 'docs/:version/:page',
    component: DocVersionComponent,
    resolve: {
      docsInfo: DocsResolver
    }
  },
  {
    path: 'features',
    component: FeaturesComponent,
  },

  {
    path: 'libs/:lib',
    component: LibComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      title: 'Page not found'
    }
  }
];
