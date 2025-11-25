import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTablaComponent } from './data-tabla.component';

describe('DataTablaComponent', () => {
  let component: DataTablaComponent;
  let fixture: ComponentFixture<DataTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTablaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
