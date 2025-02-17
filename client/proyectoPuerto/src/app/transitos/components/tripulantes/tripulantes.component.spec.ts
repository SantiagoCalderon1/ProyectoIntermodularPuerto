import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripulantesComponent } from './tripulantes.component';

describe('TripulantesComponent', () => {
  let component: TripulantesComponent;
  let fixture: ComponentFixture<TripulantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripulantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripulantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
