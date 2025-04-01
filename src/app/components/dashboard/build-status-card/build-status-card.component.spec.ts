import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildStatusCardComponent } from './build-status-card.component';

describe('BuildStatusCardComponent', () => {
  let component: BuildStatusCardComponent;
  let fixture: ComponentFixture<BuildStatusCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildStatusCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildStatusCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
