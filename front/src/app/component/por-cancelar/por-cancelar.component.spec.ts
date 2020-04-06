import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorCancelarComponent } from './por-cancelar.component';

describe('PorCancelarComponent', () => {
  let component: PorCancelarComponent;
  let fixture: ComponentFixture<PorCancelarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorCancelarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorCancelarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
