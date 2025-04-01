import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesOfBusinessComponent } from './lines-of-business.component';

describe('LinesOfBusinessComponent', () => {
  let component: LinesOfBusinessComponent;
  let fixture: ComponentFixture<LinesOfBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinesOfBusinessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinesOfBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
