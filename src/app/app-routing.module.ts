import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about';
import { HomeComponent } from './home';
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
    path: 'features',
    component: FeaturesComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
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
