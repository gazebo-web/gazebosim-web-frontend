import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibsService } from '../libs/libs.service';
import { Library } from '../libs/lib';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'gz-lib',
  templateUrl: 'lib.component.html',
  styleUrls: ['lib.component.scss']
})

export class LibComponent implements OnInit {

  /** The library being displayed
   */
  public lib: Library = new Library();

  /** Constructor
   */
  constructor(public libsService: LibsService,
              private route: ActivatedRoute,
              private markdownService: MarkdownService) {
    this.route.params.subscribe((params) => {
      // Render versioned links
      this.markdownService.renderer.link = (href: string, title: string, text: string) => {
        if (href.startsWith('#')) {
          return '<a href="/libs/' + params['lib'] + href + '">' + text + '</a>';
        }
        return '<a href="' + href + '" title="'
          + title + '">' + text + '</a>';
      };
    });
  }

  /** Get the library information
   */
  public ngOnInit(): void {
    this.lib = new Library();

    // Wait for the route parameters
    this.route.params.subscribe((params) => {
      this.libsService.getLibs().subscribe(
        (libs) => {
          // Find the library that has been selected
          for (const l of libs) {
            if (l.name.toLowerCase() === params['lib']) {
              const stringTokens = l.repo.split('/');
              const libraryName = stringTokens[stringTokens.length - 1];
              if ( libraryName === 'sdformat') {
                l.reporaw = 'https://raw.githubusercontent.com/osrf/' + libraryName;
              } else {
                l.reporaw = 'https://raw.githubusercontent.com/gazebosim/' + libraryName;
              }
              this.lib = l;
            }
          }
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }
}
