import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripulantesListComponent } from './tripulantes-list.component';

describe('TripulantesListComponent', () => {
  let component: TripulantesListComponent;
  let fixture: ComponentFixture<TripulantesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripulantesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripulantesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
