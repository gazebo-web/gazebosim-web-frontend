import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { Ng2DeviceService } from './device-detector';

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

  /**
   * Indicates whether a route is being resolved or not.
   */
  public resolvingRoute: boolean = false;

  public appHost: string = `${APP_HOST}`;
  public toolbarColor: string = '#ffffff';

  /**
   * @param deviceService Service used to determine the browser's user agent.
   * @param dialog Allows opening dialogs. Used to open the Settings dialog.
   * @param route The current Activated Route.
   * @param router The router used. Allows subscription to events.
   * @param snackBar The snackbar used for notification.
   * @param titleService Service used to modify the browser's title.
   */
  constructor(
    public deviceService: Ng2DeviceService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) {
  }
}
