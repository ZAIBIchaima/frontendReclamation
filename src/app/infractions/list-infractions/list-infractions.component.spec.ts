import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInfractionsComponent } from './list-infractions.component';

describe('ListInfractionsComponent', () => {
  let component: ListInfractionsComponent;
  let fixture: ComponentFixture<ListInfractionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInfractionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInfractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
