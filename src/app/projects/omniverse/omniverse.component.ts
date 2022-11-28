import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'gz-project-omniverse',
  templateUrl: 'omniverse.component.html',
  styleUrls: ['omniverse.component.scss']
})

export class OmniverseComponent implements OnInit {
  constructor(private titleService: Title, private meta: Meta) {
  }

  public ngOnInit(): void {
    this.titleService.setTitle('Project -- Omniverse');
    this.meta.updateTag({name: 'title', content: 'Project -- Omniverse'});
    this.meta.updateTag({name: 'description',
      content: 'Omniverse project'});
  }
}
