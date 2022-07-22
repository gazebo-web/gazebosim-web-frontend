import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NgxGalleryOptions,
         NgxGalleryImage,
         NgxGalleryImageSize } from '@kolkov/ngx-gallery';

@Component({
  selector: 'gz-showcase',
  templateUrl: 'showcase.component.html',
  styleUrls: ['showcase.component.scss']
})

export class ShowcaseComponent implements OnInit {

  /**
   * The gallery options. Determines the behavior of the gallery component.
   *
   * See https://github.com/lukasz-galka/ngx-gallery#ngxgalleryoptions for more details.
   */
  public galleryOptions: NgxGalleryOptions[] = [];

  /**
   * The images to be displayed in the gallery.
   *
   * See https://github.com/lukasz-galka/ngx-gallery#ngxgalleryimage for more details.
   */
  public galleryImages: NgxGalleryImage[] = [];

  constructor(private titleService: Title, private meta: Meta) {
  }

  public ngOnInit(): void {
    this.titleService.setTitle('Showcase -- Gazebo');
    this.meta.updateTag({name: 'title', content: 'Showcase -- Gazebo'});
    this.meta.updateTag({name: 'description',
      content: 'Gazebo highlights and media'});

    this.galleryOptions = [{
      imageSize: NgxGalleryImageSize.Contain,
      thumbnailSize: NgxGalleryImageSize.Contain,
      width: '100%',
      height: '100%',
      thumbnailsColumns: 5,
      thumbnailsPercent: 15,
      preview: false,
      imageAutoPlay: false,
      imageAutoPlayInterval: 3000
    }];

    this.galleryImages = [
      {
        medium: 'assets/images/gallery/gallery_0.png',
        small: 'assets/images/gallery/gallery_0.png',
      },
      {
        medium: 'assets/images/gallery/gallery_1.png',
        small: 'assets/images/gallery/gallery_1.png',
      },
      {
        medium: 'assets/images/gallery/gallery_2.png',
        small: 'assets/images/gallery/gallery_2.png',
      },
      {
        medium: 'assets/images/gallery/gallery_3.png',
        small: 'assets/images/gallery/gallery_3.png',
      },
      {
        medium: 'assets/images/gallery/gallery_4.png',
        small: 'assets/images/gallery/gallery_4.png',
      },
      {
        medium: 'assets/images/gallery/gallery_5.png',
        small: 'assets/images/gallery/gallery_5.png',
      },
      {
        medium: 'assets/images/gallery/gallery_6.png',
        small: 'assets/images/gallery/gallery_6.png',
      },
    ];
  }
}
