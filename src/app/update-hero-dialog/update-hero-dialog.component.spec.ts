import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHeroDialogComponent } from './update-hero-dialog.component';

describe('UpdateHeroDialogComponent', () => {
  let component: UpdateHeroDialogComponent;
  let fixture: ComponentFixture<UpdateHeroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateHeroDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHeroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
