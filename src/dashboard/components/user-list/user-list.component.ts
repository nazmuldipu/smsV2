import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/shared/models/user.model';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input() userList: User[];
  @Output() edit = new EventEmitter();

  editUser(id) {
    this.edit.emit(id);
  }
}
