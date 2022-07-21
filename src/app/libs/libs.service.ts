import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Library } from './lib';
import { BehaviorSubject } from 'rxjs';
import { UiError } from '../ui-error';
import { environment } from '../../environments/environment';

@Injectable()
export class LibsService {

  public libraries: Library[] = [];
  public libraries$ = new BehaviorSubject<Library[]>(this.libraries);

  private libsUrl = `${environment.API_HOST}/${environment.API_VERSION}/libs`;

  constructor(private http: HttpClient) {
    this.initializeData();
  }

  /** Get library information
   */
  public initializeData() {
    this.http.get<Library[]>(this.libsUrl).subscribe(
      (response) => {
        this.libraries = response;
        // this.libraries = response.json() as Library[];
        this.libraries.sort((a, b) => {
          const x = a.name.toLowerCase();
          const y = b.name.toLowerCase();
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return 0;
        });
        this.libraries$.next(this.libraries);
      },
      (error) => {
        console.error('An error occurred retreiving the libraries');
      }
    );
  }

  public libs(): Observable<Library[]> {
    return this.libraries$.asObservable();
  }

  public getLibs(): Observable<Library[]> {
    return this.http.get<Library[]>(this.libsUrl);
  }
}
