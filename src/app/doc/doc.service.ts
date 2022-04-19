import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs';
import { DocumentContents } from '../documents';
import { DocsInfo } from './docsinfo';
import { UiError } from '../ui-error';

@Injectable()
export class DocService {

  private docsUrl = `${API_HOST}/${API_VERSION}/docs`;

  constructor(private http: HttpClient) {
  }

  public getDocs(): Observable<DocsInfo> {
    return this.http.get<DocsInfo>(this.docsUrl)
      .catch(this.handleError);
  }

  public getDoc(version: string, page: string): Observable<string> {
    const url = this.docsUrl + '/' + version + '/' + page;

    return this.http.get<string>(url)
      .catch(this.handleError);
  }

  private handleError(response: HttpErrorResponse): ErrorObservable {
    console.error('An error occurred', response);
    return Observable.throw(new UiError(response));
  }
}
