import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendaneComponent } from './attendane.component';

describe('AttendaneComponent', () => {
  let component: AttendaneComponent;
  let fixture: ComponentFixture<AttendaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
