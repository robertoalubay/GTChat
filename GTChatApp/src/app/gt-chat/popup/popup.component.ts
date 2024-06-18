import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule,
    MatDialogModule,
    
  ],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  constructor(public dialogRef: MatDialogRef<PopupComponent>) {}
  
  popupMessage: string= "Please enter your Name.";

  closeDialog(): void {
    this.dialogRef.close();
  }

}
