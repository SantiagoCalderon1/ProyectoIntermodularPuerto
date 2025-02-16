import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormmuellesComponent } from './formmuelles.component';

describe('FormmuellesComponent', () => {
  let component: FormmuellesComponent;
  let fixture: ComponentFixture<FormmuellesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormmuellesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormmuellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
