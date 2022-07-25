import {  AfterViewChecked, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DocsInfo } from './docsinfo';
import { DocService } from './doc.service';
import { Page } from './page';
import { LibsService } from '../libs/libs.service';
import { environment } from '../../environments/environment';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'gz-doc',
  templateUrl: 'doc.component.html',
  styleUrls: ['doc.component.scss']
})

export class DocComponent implements OnInit, AfterViewChecked {

  public docContent: string = '';
  public version: string = '';
  public pageName: string = '';
  public docsInfo: DocsInfo;
  public editLink: string = '';
  //public renderedContent: SafeHtml;
  public pages: Page[] = [];
  private page: Page;
  private fragment: string = '';

  private pageOrder: string[] = ['getstarted', 'install', 'tutorials'];

  constructor(public libsService: LibsService,
              private route: ActivatedRoute,
              private docService: DocService,
              private markdownService: MarkdownService,
              private titleService: Title,
              private meta: Meta,
              private router: Router,
              private viewportScroller: ViewportScroller) {

    // Render images from the server.
    this.markdownService.renderer.image = (href: string, title: string, text: string) => {
      return '<img style="max-width:100%" src="' + `${environment.API_HOST}` + '/' + `${environment.API_VERSION}` +
        '/images/' + this.page.version + '/' + href +
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
        return '<a href="docs/' + this.page.version + '/' + this.pageName +
          href + '" title="' + title + '">' + text + '</a>';
      } else {
        return '<a href="docs/' + this.page.version + '/' + href + '" title="'
          + title + '">' + text + '</a>';
      }
    };

    // Render header anchors
    this.markdownService.renderer.heading = (text: string, level: number) => {
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      return '<h' + level + '  id="' + escapedText + '" class="heading-anchor">' + "<a name='" + escapedText + "' href='#'>" + text + "</a>" +
        '<a name="' + escapedText + '" class="anchor" title="Link to this heading" name="' + escapedText + '" href="docs/'
          + this.page.version + '/' + this.page.name + '#' + escapedText + '">' +
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
    this.titleService.setTitle('Docs -- Gazebo');
    this.meta.updateTag({name: 'title', content: 'Docs -- Gazebo'});
    this.meta.updateTag({name: 'description',
      content: 'Tutorials, API documentation, releases, and roadmap information'});

    // Get all the documentation
    this.docsInfo = this.route.snapshot.data['docsInfo'];

    this.route.fragment.subscribe((fragment) => {
      this.fragment = fragment!;
      console.log('Fragment', this.fragment);
    });

    this.route.params.subscribe((params) => {
      // Update the version
      this.updateVersion(params['version']);

      this.pageName = params['page'];

      // Order pages and add some metadata.
      this.massageDocs();

      if (this.pageName === undefined || this.pageName === '') {
        this.pageName = this.pages[0].name;
      }

      // If no version, then we are looking at global/root documentation that
      // is not associated with a particular version
      /*if (this.version === undefined || this.version === '' || this.version === 'all') {
        this.version = 'all';
        this.pageVersion = 'all';

        // Get the correct page
        if (this.pageName === undefined || this.pageName === '') {
          this.page = this.pages[0];
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
     */
        // Display a default page if the pagename is undefined
        /*if (this.pageName === undefined || this.pageName === '') {
          try {
            this.page = this.pages[0];
          } catch (err) {
            this.router.navigate(['/not-found']);
            return true;
          }
        } else {
       */
          // Get the correct page
          try {
            this.pages.some((element) => {
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
            /*this.docsInfo.pages[this.version].some((element) => {
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
           */
          } catch (err) {
            this.router.navigate(['/not-found']);
            return true;
          }
        //}

        try {
          this.editLink = this.version + '/' + this.page.file;
        } catch (err) {
          this.router.navigate(['/not-found']);
          return true;
        }
      //}

      this.titleService.setTitle('Gazebo - Docs: ' + this.page.title);
      this.docService.getDoc(this.page.version, this.page.file).subscribe((doc) => {
        this.docContent = doc;
        /*this.renderedContent = this.markdownService.parse(doc);
        console.log(this.renderedContent);
       */
      });
      return true;
    });

  }

  public ngAfterViewChecked(): void {
    try {
      if (this.fragment) {
        const elem = document.querySelector('#' + this.fragment);
        console.log('1. ngAfterViewChecked', elem, this.fragment);
        if (elem !== undefined && elem !== null) {
          console.log('ngAfterViewChecked', elem);
          setTimeout(() => {
            elem.scrollIntoView();
          }, 2000);
          // this.viewportScroller.scrollToAnchor(this.fragment);
          // Clear the fragment, otherwise clicking on another button will just
          // reload the page to the current fragment.
          this.fragment = '';
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  public onVersionChange(newVersion: string): void {
    this.router.navigate(['/docs', newVersion]);
  }


  private updateVersion(routeVersion: string): void {
    if (routeVersion === undefined || routeVersion === '' ||
        routeVersion === 'latest') {
      // Get the first LTS version.
      for (let i in this.docsInfo.versions) {
        if (this.docsInfo.versions[i].lts) {
          this.version = this.docsInfo.versions[i].name;
          break;
        }
      }
    } else {
      this.version = routeVersion;
    }
  }

  private massageDocs(): void {
    this.pages = [];

    // Create links for all the documentation pages.
    for (let refName in this.docsInfo.pages) {
      for (let pageIndex in this.docsInfo.pages[refName]) {
        this.docsInfo.pages[refName][pageIndex].link='/docs/' + refName + '/' +
          this.docsInfo.pages[refName][pageIndex].name;
        this.docsInfo.pages[refName][pageIndex].version = refName;
      } 
    }

    // Temporarily store all the pages so that we can arrange them in pageOrder
    let tmpPages: Page[] = this.docsInfo.pages[this.version];
    tmpPages = tmpPages.concat(this.docsInfo.pages['all']);

    // Insert pages into `this.pages` according to `this.pageOrder`
    for (let i in this.pageOrder) {
      for (let j = 0; j < tmpPages.length; j++) {
        if (tmpPages[j].name == this.pageOrder[i]) {
          let p = tmpPages.splice(j, 1)[0]; 
          this.pages.push(p);
          break;
        }
      }
    }

    // Add in the remaining pages.
    this.pages = this.pages.concat(tmpPages);
  }
}
