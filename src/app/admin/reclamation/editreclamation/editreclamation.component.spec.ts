import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditreclamationComponent } from './editreclamation.component';

describe('EditreclamationComponent', () => {
  let component: EditreclamationComponent;
  let fixture: ComponentFixture<EditreclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditreclamationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditreclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
