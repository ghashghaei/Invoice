import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ItemModel} from 'src/app/models/item.model';

@Component({
  selector: 'app-items-dialog',
  templateUrl: './items-dialog.component.html',
  styleUrls: ['./items-dialog.component.css']
})
export class ItemsDialogComponent {
  items: ItemModel[];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData) {
    this.items = this.dialogData.items;
  }
}


