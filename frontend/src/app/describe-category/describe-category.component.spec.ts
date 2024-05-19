import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescribeCategoryComponent } from './describe-category.component';

describe('DescribeCategoryComponent', () => {
  let component: DescribeCategoryComponent;
  let fixture: ComponentFixture<DescribeCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescribeCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescribeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
