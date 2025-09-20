import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { MessageService} from 'primeng/api';
import { PrimeNG } from 'primeng/config';
import { FileUpload } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { ProgressBar } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-subir-archivo',
  imports: [FileUpload, ButtonModule, BadgeModule, ProgressBar, ToastModule, CommonModule],
  templateUrl: './subir-archivo.component.html',
  styleUrl: './subir-archivo.component.scss',
  providers: [MessageService]
})
export class SubirArchivoComponent implements OnInit, AfterViewInit, OnDestroy {

  files = [];

  totalSize : number = 0;

  totalSizePercent : number = 0;

  constructor(private config: PrimeNG, private messageService: MessageService) {}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

  choose(event: any, callback: any) {
      callback();
  }

  onRemoveTemplatingFile(event: any, file: File, removeFileCallback: any, index: any) {
      removeFileCallback(event, index);
      this.totalSize -= parseInt(this.formatSize(file.size));
      this.totalSizePercent = this.totalSize / 10;
  }

  onClearTemplatingUpload(clear: any) {
      clear();
      this.totalSize = 0;
      this.totalSizePercent = 0;
  }

  onTemplatedUpload() {
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
  }

  onSelectedFiles(event: any) {
      this.files = event.currentFiles;

      console.log('select', this.files);
      this.files.forEach((file: File) => {
          this.totalSize += parseInt(this.formatSize(file.size));
      });
      this.totalSizePercent = this.totalSize / 10;
  }

  uploadEvent(callback: any) {
      callback();
  }

  formatSize(bytes: number) {
      const k = 1024;
      const dm = 3;
      const sizes = this.config.translation.fileSizeTypes!;
      if (bytes === 0) {
          return `0 ${sizes[0]}`;
      }

      const i = Math.floor(Math.log(bytes) / Math.log(k));
      const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

      return `${formattedSize} ${sizes[i]}`;
  }
}
