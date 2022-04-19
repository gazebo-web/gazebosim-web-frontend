import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';

import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let comp: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  /**
   * async beforeEach
   */
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
      ],
      declarations: [
        PageNotFoundComponent,
      ],
    })
    /**
     * Compile template and css.
     */
    .compileComponents();
  });

  /**
   * synchronous beforeEach
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

  it('should not log to console', () => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();
  });
});
