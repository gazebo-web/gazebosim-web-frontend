import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'gz-project-subt',
  templateUrl: 'subt.component.html',
  styleUrls: ['subt.component.scss']
})

export class SubtComponent implements OnInit {
  constructor(private titleService: Title, private meta: Meta) {
  }

  public ngOnInit(): void {
    this.titleService.setTitle('Project -- SubT');
    this.meta.updateTag({name: 'title', content: 'Project -- SubT'});
    this.meta.updateTag({name: 'description',
      content: 'SubT project'});
  }
}
