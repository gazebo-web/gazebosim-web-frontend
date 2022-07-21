import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LibsService } from './libs.service';

@Component({
  selector: 'gz-libs',
  templateUrl: 'libs.component.html',
  styleUrls: ['libs.component.scss']
})

export class LibsComponent implements OnInit  {
  constructor(public libsService: LibsService,
              private titleService: Title,
              private meta: Meta) {
  }

  public ngOnInit(): void {
    this.titleService.setTitle('Libs -- Gazebo');
    this.meta.updateTag({name: 'title', content: 'Libs -- Gazebo'});
    this.meta.updateTag({name: 'description',
      content: 'Libraries available through Gazebo.'});
  }
}
