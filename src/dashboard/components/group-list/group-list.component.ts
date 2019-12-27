import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Group } from 'src/shared/models/group.model';

@Component({
  selector: 'group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent {
  @Input() groupList: Group[];
  @Output() edit = new EventEmitter();

  editCompany(id) {
    this.edit.emit(id);
  }

}
