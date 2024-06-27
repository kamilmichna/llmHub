import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDetailsAccordionComponent } from './agent-details-accordion.component';

describe('AgentDetailsAccordionComponent', () => {
  let component: AgentDetailsAccordionComponent;
  let fixture: ComponentFixture<AgentDetailsAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentDetailsAccordionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentDetailsAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
