import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
//import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class WorldBuilderGuard implements CanActivate {

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    //private deviceService: DeviceDetectorService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkDesktop();
  }

  /**
   * Navigation should only happen in Desktop browsers. Check if the user is on a mobile device and
   * prevent the navigation if that is the case.
   *
   * @returns True (navigation can happen) or an UrlTree to cancel the navigation.
   */
  private checkDesktop(): true | UrlTree {
    //if (this.deviceService.isDesktop()) {
      return true;
    /*} else {
      this.snackBar.open('World Builder not available on mobile devices', 'Got it', { duration: -1 });
      return this.router.parseUrl(this.router.routerState.snapshot.url || '/home');
    }*/
  }
}
