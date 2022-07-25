import {  AfterViewChecked, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DocsInfo } from './docsinfo';
import { DocService } from './doc.service';
import { Page } from './page';
import { Version } from './version';
import { LibsService } from '../libs/libs.service';
import { environment } from '../../environments/environment';
import { MarkdownService } from 'ngx-markdown';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

// Defines a node on the page tree structure.
interface PageFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  link: string;
}

@Component({
  selector: 'gz-doc',
  templateUrl: 'doc.component.html',
  styleUrls: ['material-table.scss', 'doc.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class DocComponent implements OnInit, AfterViewChecked {

  public docContent: string = '';
  public version: Version = new Version();
  public pageName: string = '';
  public docsInfo: DocsInfo;
  public editLink: string = '';
  public pages: Page[] = [];
  private page: Page;
  private fragment: string = '';

  private pageOrder: string[] = ['getstarted', 'install', 'tutorials'];

  private _transformer = (node: Page, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.title,
      level: level,
      link: node.link,
    };
  };

  public treeControl = new FlatTreeControl<PageFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  private treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  // Data source for the page tree.
  public dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

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
      return '<h' + level + '  id="' + escapedText + '" class="heading-anchor">' +  text +
        '<a name="' + escapedText + '" class="anchor" title="Link to this heading" href="docs/'
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
    });

    this.route.params.subscribe((params) => {
      // Update the version
      this.updateVersion(params['version']);

      this.pageName = params['page'];

      // Order pages and add some metadata.
      this.massageDocs();

      this.dataSource.data = this.pages;

      // Expand the tree if a child node was selected
      this.dataSource.data.forEach(node => {
        if (node.children && node.children.find(c => c.link === this.router.url)) {

          this.treeControl.dataNodes.forEach(dataNode => {
            if (dataNode.link === node.link) {
              this.treeControl.expand(dataNode);
            }
          });
        }
      });

      if (this.pageName === undefined || this.pageName === '') {
        this.pageName = this.pages[0].name;
      }

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
      } catch (err) {
        this.router.navigate(['/not-found']);
        return true;
      }

      try {
        this.editLink = this.version.name + '/' + this.page.file;
      } catch (err) {
        this.router.navigate(['/not-found']);
        return true;
      }

      this.titleService.setTitle('Gazebo - Docs: ' + this.page.title);
      this.docService.getDoc(this.page.version, this.page.file).subscribe((doc) => {
        this.docContent = doc;
      });
      return true;
    });
  }

  public ngAfterViewChecked(): void {
    try {
      if (this.fragment) {
        const elem = document.querySelector('#' + this.fragment);
        if (elem !== undefined && elem !== null) {
          setTimeout(() => {
            elem.scrollIntoView({behavior: 'smooth', block: 'start'});
          }, 100);
          // this.viewportScroller.scrollToAnchor(this.fragment);
          // Clear the fragment, otherwise clicking on another button will just
          // reload the page to the current fragment.
          this.fragment = '';
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  public onVersionChange(newVersion: string): void {
    this.router.navigate(['/docs', newVersion]);
  }


  private updateVersion(routeVersion: string): void {
    if (routeVersion === undefined || routeVersion === '' ||
        routeVersion === 'latest' || routeVersion === 'all') {

      if (routeVersion === 'latest') {
        this.version = {...this.docsInfo.versions[0]};
      } else {
        // Get the first LTS version.
        for (let i in this.docsInfo.versions) {
          if (this.docsInfo.versions[i].lts) {
            this.version = {...this.docsInfo.versions[i]};
            break;
          }
        }
      }

    } else {
      // Get the matching version version.
      for (let i in this.docsInfo.versions) {
        if (this.docsInfo.versions[i].name === routeVersion) {
          this.version = {...this.docsInfo.versions[i]};
          return;
        }
      }
      // Default behavior will get the most recent version.
      this.version = {...this.docsInfo.versions[0]};
    }
  }

  private massageDocs(): void {
    this.pages = [];

    // Create links for all the documentation pages.
    for (let refName in this.docsInfo.pages) {
      for (let pageIndex in this.docsInfo.pages[refName]) {
        this.docsInfo.pages[refName][pageIndex].link='/docs/' + this.version.name
        + '/' + this.docsInfo.pages[refName][pageIndex].name;
        this.docsInfo.pages[refName][pageIndex].version = refName;

        // Update child pages.
        for (let childPageIndex in this.docsInfo.pages[refName][pageIndex].children) {
        this.docsInfo.pages[refName][pageIndex].children[childPageIndex].link='/docs/' + this.version.name + '/' + this.docsInfo.pages[refName][pageIndex].children[childPageIndex].name;
        this.docsInfo.pages[refName][pageIndex].children[childPageIndex].version = refName;
        }
      } 
    }

    // Temporarily store all the pages so that we can arrange them in pageOrder
    let tmpPages: Page[] = this.docsInfo.pages[this.version.name];
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

    // Add in the libraries
    this.libsService.libs().subscribe(
      (libs) => {
        if (libs.length > 0) {
          let libsPage = new Page;
          libsPage.name = 'Libraries';
          libsPage.title = 'Libraries';
          libsPage.link = '/docs/libs';
          libsPage.unlisted = false;
          libsPage.version = this.version.name;
          libsPage.children = [];
          this.pages.push(libsPage);
          libs.forEach(lib => {
            let libPage = new Page;
            libPage.name = lib.name;
            libPage.title = lib.name;
            libPage.link = '/libs/' + lib.name;
            libPage.unlisted = false;
            libPage.version = this.version.name;
            libsPage.children!.push(libPage);
          });
          this.dataSource.data = this.pages;
        }
    });
  }

  // Used to determine if the navigation tree on the left side should have
  // an expand icon or not. 
  public hasChild = (_: number, node: PageFlatNode) => node.expandable;
}
