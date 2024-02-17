import { Component, Input, OnInit } from '@angular/core';
import { Agent } from '../agents.service';
import { DatePipe } from '@angular/common';
import { FileTreeComponent } from '../file-tree/file-tree.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-agent-details-accordion',
  standalone: true,
  imports: [DatePipe,FileTreeComponent,RouterModule],
  templateUrl: './agent-details-accordion.component.html',
  styleUrl: './agent-details-accordion.component.scss'
})
export class AgentDetailsAccordionComponent implements OnInit {
    @Input('agent') agent?: Agent;
    

    ngOnInit(){
      
    }

}
