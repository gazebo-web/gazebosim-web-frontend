import { AfterViewChecked, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, Title, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DocService } from './doc.service';
import { MarkdownService } from 'ngx-markdown';
import { DocsInfo } from './docsinfo';
import { Page } from './page';
import { LibsService } from '../libs/libs.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'gz-doc-version',
  templateUrl: 'doc-version.component.html',
  styleUrls: ['doc.component.scss']
})

export class DocVersionComponent implements OnInit, AfterViewChecked {

  public docContent: string = '';
  public version: string = '';
  public pageName: string = '';
  public pageVersion: string = '';
  public docsInfo: DocsInfo;
  public editLink: string = '';
  public renderedContent: SafeHtml;
  private page: Page;
  private fragment: string = '';

  constructor(public libsService: LibsService,
              private route: ActivatedRoute,
              private docService: DocService,
              private markdownService: MarkdownService,
              private titleService: Title,
              private router: Router) {

    // Render images from the server.
    this.markdownService.renderer.image = (href: string, title: string, text: string) => {
      return '<img style="max-width:100%" src="' + `${environment.API_HOST}` + '/' + `${environment.API_VERSION}` +
        '/images/' + this.version + '/' + href +
        '" title="' + title + '" alt="' + text + '"></img>';
    };

    // Render versioned links
    this.markdownService.renderer.link = (href: string, title: string, text: string) => {
      if (title === null || title === '') {
        title = href;
      }
      if (href.startsWith('http') || href.startsWith('/')) {
        return '<a href="' + href + '" title="' + title + '">' + text + '</a>';
      } else if (href.startsWith('#')) {
        href = '#' + href.substring(17);
        return '<a href="docs/' + this.version + '/' + this.pageName +
          href + '" title="' + title + '">' + text + '</a>';
      } else {
        return '<a href="docs/' + this.version + '/' + href + '" title="'
          + title + '">' + text + '</a>';
      }
    };

    // Render header anchors
    this.markdownService.renderer.heading = (text: string, level: number) => {
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      return '<h' + level + '  id="' + escapedText + '" class="heading-anchor">' + text +
        '<a name="' + escapedText + '" class="anchor" title="Link to this heading" href="docs/'
          + this.version + '/' + this.page.name + '#' + escapedText + '">' +
          '<span style="padding-left:4px" \
            id="heading-anchor-img"><img \
              src="/assets/icon/baseline-link-24px.svg"></img></span> \
        </a>' +
        '</h' + level + '>';
    };

    this.markdownService.renderer.codespan = (code: string) => {
    return '<code style="padding: 2px; \
      background-color: rgb(244, 245, 247)">' + code + '</code>';
    };

    this.markdownService.renderer.code = (code: string, language: string, isEscaped: boolean) => {
      const escapedText = code.replace(/&/g, '&amp;').replace(/</g,
        '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

      return '<code style="border-radius: 4px; display: block;\
        padding: 8px; border: 1px solid rgb(219, 219, 219); \
        background-color: rgb(244, 245, 247);"><pre style="white-space: \
          pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; \
          white-space: -o-pre-wrap; word-wrap: break-word">' +
          escapedText  + '</pre></code>';
    };
  }

  public ngOnInit(): void {
    this.docsInfo = this.route.snapshot.data['docsInfo'];

    this.route.fragment.subscribe((fragment) => {
      this.fragment = fragment!;
    });

    this.route.params.subscribe((params) => {
      // Get the version and page information
      this.version = params['version'];
      this.pageName = params['page'];
      this.pageVersion = this.version;

      // If no version, then we are looking at global/root documentation that is not
      // associated with a particular version
      if (this.version === undefined || this.version === '' || this.version === 'all') {
        this.version = 'all';
        this.pageVersion = 'all';

        // Get the correct page
        if (this.pageName === undefined || this.pageName === '') {
          this.page = this.docsInfo.pages['all'];
        } else {
          this.docsInfo.pages['all'].some((element) => {
            if (element.name === this.pageName) {
              this.page = element;
              return true;
            }
            return false;
          });
        }

        this.editLink = this.page.file;
      } else {
        if (this.version === 'latest') {
          this.version = this.docsInfo.versions[0].name;
          this.pageVersion = this.version;
        }

        // Display a default page if the pagename is undefined
        if (this.pageName === undefined || this.pageName === '') {
          try {
            this.page = this.docsInfo.pages[this.version][0];
          } catch (err) {
            this.router.navigate(['/not-found']);
            return true;
          }
        } else {
          // Get the correct page
          try {
            this.docsInfo.pages[this.version].some((element) => {
              if (element.name === this.pageName) {
                this.page = element;
                return true;
              }
              if (element.children !== null && element.children !== undefined) {
                for (const value of element.children) {
                  if (value.name === this.pageName) {
                    this.page = value;
                    return true;
                  }
                }
              }
              return false;
            });
          } catch (err) {
            this.router.navigate(['/not-found']);
            return true;
          }
        }

        try {
          this.editLink = this.version + '/' + this.page.file;
        } catch (err) {
          this.router.navigate(['/not-found']);
          return true;
        }
      }

      this.titleService.setTitle('Gazebo - Docs: ' + this.page.title);
      this.docService.getDoc(this.pageVersion, this.page.file).subscribe((doc) => {
        this.docContent = doc;
        this.renderedContent = this.markdownService.parse(doc);
      });
      return true;
    });
  }

  public ngAfterViewChecked(): void {
    try {
      if (this.fragment) {
        const elem = document.querySelector('#' + this.fragment);
        if (elem !== undefined && elem !== null) {
          document.querySelector('#' + this.fragment!)!.scrollIntoView();
          // Clear the fragment, otherwise clicking on another button will just
          // reload the page to the current fragment.
          this.fragment = '';
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}
