import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AgentsService } from '../../agents.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
    selector: 'app-keys-view',
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: './keys-view.component.html',
    styleUrl: './keys-view.component.scss',
})
export class KeysViewComponent {
    apiKeys$ = this.agentsService.getApiKeys();
    constructor(private agentsService: AgentsService) {}

    deleteRow() {
        throw new Error('Method not implemented.');
    }

    async addNewKey() {
        await Swal.fire({
            background: '#2a323c',
            color: '#a6adbb',
            html: `
                <div class='flex flex-col create-api-key'>
                    <label for="name">Name:</label>
                    <input id="name" class="swal2-input" required>
                    <br><br>
                    <label for="provider">Provider:</label>
                    <select id="provider" class="swal2-input" required>
                        <!-- assuming you have a list of providers, you can populate this select list dynamically -->
                        <option value="">Select provider</option>
                        <!-- add more options here -->
                    </select>
                    <br><br>
                    <label for="api-key">API Key:</label>
                    <input id="api-key" class="swal2-input" required> 
                </div>
            `,
            title: 'Add New Key',
            text: 'Enter new key details:',
            confirmButtonText: 'Add',
            preConfirm: () => {
                const [name, apiKey] = [
                    (
                        document.querySelector(
                            '.create-api-key #name'
                        ) as HTMLInputElement
                    ).value,
                    (
                        document.querySelector(
                            '.create-api-key #api-key'
                        ) as HTMLInputElement
                    ).value,
                ];

                if (!apiKey?.length || !name?.length)
                    Swal.showValidationMessage(
                        '<i class="fa fa-info-circle"></i>All Fields are required!!!'
                    );
            },
        });
    }
}
