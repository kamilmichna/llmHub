import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AgentsService } from '../../agents.service';

@Component({
    selector: 'app-keys-view',
    standalone: true,
    imports: [],
    templateUrl: './keys-view.component.html',
    styleUrl: './keys-view.component.scss',
})
export class KeysViewComponent {
    apiKeys$ = this.agentsService.getApiKeys();
    constructor(private agentsService: AgentsService) {}

    deleteRow(_t11: any) {
        throw new Error('Method not implemented.');
    }

    async openProviderModal() {
        await Swal.fire({
            background: '#2a323c',
            color: '#a6adbb',
            html: `
                <input id="api-key" class="swal2-input">
            `,
            title: 'Delete Agent',
            text: 'Are you sure that you want to delete this agent?',
            icon: 'error',
            confirmButtonText: 'Confirm',
        });
    }


}
