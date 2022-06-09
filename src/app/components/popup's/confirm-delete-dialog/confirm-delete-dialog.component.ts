import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.css']
})
export class ConfirmDeleteDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDeleteDialogData
  ) { }

  executeCallback() {
    this.data?.onYesCallback();
  }

}

export interface ConfirmDeleteDialogData {

  onYesCallback: () => void;

}