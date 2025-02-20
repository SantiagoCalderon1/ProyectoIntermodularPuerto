import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarecibosComponent } from './listarecibos.component';

describe('ListarecibosComponent', () => {
  let component: ListarecibosComponent;
  let fixture: ComponentFixture<ListarecibosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarecibosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarecibosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
