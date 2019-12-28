import { Component, EventEmitter, Input, Output } from '@angular/core';
import { People } from 'src/shared/models/people.model';

@Component({
  selector: 'people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent {
  @Input() peopleList: People[];
  @Output() edit = new EventEmitter();

  onEdit(id) {
    this.edit.emit(id);
  }

}
