import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, Meta, Title, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DocsInfo } from './docsinfo';
import { LibsService } from '../libs/libs.service';

@Component({
  selector: 'gz-doc',
  templateUrl: 'doc.component.html',
  styleUrls: ['doc.component.scss']
})

export class DocComponent implements OnInit {

  public docContent: string = '';
  public version: string = '';
  public pageVersion: string;
  public docsInfo: DocsInfo;
  public editLink: string = '';
  public renderedContent: SafeHtml;

  constructor(public libsService: LibsService,
              private route: ActivatedRoute,
              private titleService: Title,
              private meta: Meta) {

  }

  public ngOnInit(): void {
    this.titleService.setTitle('Docs -- Gazebo');
    this.meta.updateTag({name: 'title', content: 'Docs -- Gazebo'});
    this.meta.updateTag({name: 'description',
      content: 'Tutorials, API documentation, releases, and roadmap information'});

    this.docsInfo = this.route.snapshot.data['docsInfo'];
  }
}
