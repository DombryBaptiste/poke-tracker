import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBoxComponent } from './all-box.component';

describe('AllBoxComponent', () => {
  let component: AllBoxComponent;
  let fixture: ComponentFixture<AllBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
