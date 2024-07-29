import { Component } from '@angular/core';
import { FileTreeComponent } from '../file-tree/file-tree.component';

@Component({
  selector: 'app-files-view',
  standalone: true,
  imports: [FileTreeComponent],
  templateUrl: './files-view.component.html',
  styleUrl: './files-view.component.scss'
})
export class FilesViewComponent {

}
