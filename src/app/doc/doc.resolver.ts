import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { DocsInfo } from './docsinfo';
import { DocService } from './doc.service';

@Injectable()

/**
 * Resolver for the :owner/models/:modelname route.
 *
 * Fetches the model to display before the ModelComponent is created.
 */
export class DocsResolver implements Resolve<DocsInfo> {

  /**
   * @param docService Service used to get documentation information from the Server.
   */
  constructor(private docService: DocService) {
  }

  /**
   * Resolve method.
   */
  public resolve(route: ActivatedRouteSnapshot): Observable<DocsInfo> {
    return this.docService.getDocs().catch(
      (err) => {
        return Observable.of(null);
      });
  }
}
