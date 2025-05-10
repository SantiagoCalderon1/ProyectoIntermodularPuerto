import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListamuellesComponent } from './listamuelles.component';

describe('ListamuellesComponent', () => {
  let component: ListamuellesComponent;
  let fixture: ComponentFixture<ListamuellesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListamuellesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListamuellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
