import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../environments/environment';

declare const gtag: Function;

@Component({
  selector: 'gz-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

/**
 * App Component is the main component and entry point of the Web Application.
 */
export class AppComponent {

  /**
   * Title of the Web Application.
   */
  public readonly title = 'Gazebo';

  public home: boolean = true;

  /**
   * Indicates whether a route is being resolved or not.
   */
  public resolvingRoute: boolean = false;

  public appHost: string = `${environment.APP_HOST}`;
  public toolbarColor: string = '#ffffff';

  /**
   * @param dialog Allows opening dialogs. Used to open the Settings dialog.
   * @param route The current Activated Route.
   * @param router The router used. Allows subscription to events.
   * @param snackBar The snackbar used for notification.
   * @param titleService Service used to modify the browser's title.
   */
  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router) {

    this.addGAScript();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.home = event.url === "/home" || event.url === "/"; 
        gtag('config', environment.GA_TRACKING_ID, {
            page_path: event.urlAfterRedirects
        });
      }
    })
  }

  /** Add Google Analytics Script Dynamically */
  private addGAScript() {
    const url = 'https://www.googletagmanager.com/gtag/js?id=';
    const gTagScript = document.createElement('script');
    gTagScript.async = true;
    gTagScript.src = `${url}${environment.GA_TRACKING_ID}`;
    document.head.appendChild(gTagScript);

    const dataLayerScript = document.createElement('script');
    dataLayerScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${environment.GA_TRACKING_ID}', {'send_page_view': false});`;
    document.head.appendChild(dataLayerScript);
  }
}
