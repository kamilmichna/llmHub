import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-agent-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './agent-details.component.html',
  styleUrl: './agent-details.component.scss'
})
export class AgentDetailsComponent {
  isNewAgentMode = signal(true);
  constructor( private route: ActivatedRoute){
    if (this.route.snapshot.paramMap.get('agentId')) {
      this.isNewAgentMode.set(false)
      alert('123')
    }
  }
}
