import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'gz-project-maritime',
  templateUrl: 'maritime.component.html',
  styleUrls: ['maritime.component.scss']
})

export class MaritimeComponent implements OnInit {
  constructor(private titleService: Title, private meta: Meta) {
  }

  public ngOnInit(): void {
    this.titleService.setTitle('Project -- Maritime simulation');
    this.meta.updateTag({name: 'title', content: 'Project -- Maritime simulation'});
    this.meta.updateTag({name: 'description',
      content: 'Maritime simulation project'});
  }
}
