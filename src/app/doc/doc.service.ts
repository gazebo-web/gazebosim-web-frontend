import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocsInfo } from './docsinfo';
import { UiError } from '../ui-error';
import { environment } from '../../environments/environment';

@Injectable()
export class DocService {

  private docsUrl = `${environment.API_HOST}/${environment.API_VERSION}/docs`;

  constructor(private http: HttpClient) {
  }

  public getDocs(): Observable<DocsInfo> {
    return this.http.get<DocsInfo>(this.docsUrl);
  }

  public getDoc(version: string, page: string): Observable<string> {
    const url = this.docsUrl + '/' + version + '/' + page;

    return this.http.get<string>(url);
  }
}
