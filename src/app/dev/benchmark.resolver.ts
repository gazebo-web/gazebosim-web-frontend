import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BenchmarkService } from './benchmark.service';
import { Series } from './series';

@Injectable()

/**
 * Resolver for the route.
 *
 * Fetches the model to display before the ModelComponent is created.
 */
export class BenchmarkResolver implements Resolve<Series[]> {

  /**
   * @param docService Service used to get documentation information from the Server.
   */
  constructor(private benchmarkService: BenchmarkService) {
  }

  /**
   * Resolve method.
   */
  public resolve(route: ActivatedRouteSnapshot): Observable<Series[]> {
    return this.benchmarkService.getSeries().catch(
      (err) => {
        return Observable.of(null);
      });
  }
}
