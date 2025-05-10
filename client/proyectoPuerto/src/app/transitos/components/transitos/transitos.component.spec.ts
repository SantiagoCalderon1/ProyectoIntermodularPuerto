import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitosComponent } from './transitos.component';

describe('TransitosComponent', () => {
  let component: TransitosComponent;
  let fixture: ComponentFixture<TransitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransitosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
