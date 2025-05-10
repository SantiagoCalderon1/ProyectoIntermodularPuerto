import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitosListComponent } from './transitos-list.component';

describe('TransitosListComponent', () => {
  let component: TransitosListComponent;
  let fixture: ComponentFixture<TransitosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransitosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransitosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
