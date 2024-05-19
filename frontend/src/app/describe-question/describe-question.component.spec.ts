import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescribeQuestionComponent } from './describe-question.component';

describe('DescribeQuestionComponent', () => {
  let component: DescribeQuestionComponent;
  let fixture: ComponentFixture<DescribeQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescribeQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescribeQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
