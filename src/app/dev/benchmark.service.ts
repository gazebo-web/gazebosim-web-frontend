import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs';
import { Benchmark } from './benchmarks';
import { BenchmarkDateData } from './benchmark-date-data';
import { Series } from './series';
import { UiError } from '../ui-error';

@Injectable()
export class BenchmarkService {

  private benchUrl = `${API_HOST}/${API_VERSION}/benchmarks`;

  constructor(private http: HttpClient) {
  }

  public getSeries(): Observable<Series[]> {
    return this.http.get<Series[]>(this.benchUrl)
      .catch(this.handleError);
  }

  public getBenchmarks(library: string, benchmark: string): Observable<any[]> {
    return this.http.get<any[]>(this.benchUrl + '/' + library + '?benchmark=' + benchmark)
      .catch(this.handleError);
  }

  public getBenchmarkDates(library: string): Observable<string[]> {
  return this.http.get<BenchmarkDateData[]>(this.benchUrl + '/' + library + '/dates')
      .catch(this.handleError);
  }

  public getBenchmarkByDate(library: string, date: string): Observable<BenchmarkDateData[]> {
    return this.http.get<BenchmarkDateData[]>(this.benchUrl + '/' + library + '?date=' + date)
      .catch(this.handleError);
  }

  private handleError(response: HttpErrorResponse): ErrorObservable {
    console.error('An error occurred', response);
    return Observable.throw(new UiError(response));
  }
}
