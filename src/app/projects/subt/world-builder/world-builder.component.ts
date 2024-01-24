import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

// The Unity Loader function located in angular.json scripts.
declare var createUnityInstance: any;

@Component({
  selector: 'ign-world-builder',
  templateUrl: './world-builder.component.html',
  styleUrls: ['./world-builder.component.scss']
})
export class WorldBuilderComponent implements AfterViewInit {

  /**
   * The canvas used by the createUnityInstance method.
   * Use nativeElement to get the canvas element.
   */
  @ViewChild('unityCanvas', {static: false}) public canvas: ElementRef;

  /**
   * The prefix used for the build output.
   */
  public buildUrl: string = 'Build';

  /**
   * Location of the world-builder assets.
   */
  public assetsUrl: string = '/subt-world-builder/';

  /**
   * Configuration object.
   */
  private config: object = {
    dataUrl: this.assetsUrl + this.buildUrl + '/BuildTest.data',
    frameworkUrl: this.assetsUrl + this.buildUrl + '/BuildTest.framework.js',
    codeUrl: this.assetsUrl + this.buildUrl + '/BuildTest.wasm',
    streamingAssetsUrl: this.assetsUrl + 'StreamingAssets',
    companyName: 'DefaultCompany',
    productName: 'CYOW',
    productVersion: '0.1',
    // showBanner: unityShowBanner, // Function not implemented (yet).
  };

  constructor() { }

  /**
   * After View Init lifecycle hook.
   *
   * Here, the HTML elements will be defined.
   */
  ngAfterViewInit() {

    createUnityInstance(this.canvas.nativeElement, this.config, (progress) => {
    }).then((unityInstance) => {
      // Make the canvas fill the screen.
      this.canvas.nativeElement.classList.add('fill-canvas');
    }).catch((message) => {
      // Display error message. I suggest using a snackbar (as we do in the Portal) and not an alert.
    });
  }

}
