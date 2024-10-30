import { Component, OnInit } from '@angular/core';
import { ITodo, TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
model: ITodo = {
  content: '',
  date: '',
};

items: ITodo[] = [];

constructor(private service:TodoService){
}

ngOnInit(): void {
  this.service.data$().subscribe((data)=>{
    this.items = data;
  });
  console.log(this.items)
}

onSave() {
  if(this.model.id){
    this.service.update(this.model);
  }else{
    this.service.add(this.model);
  }

  this.model = {
    content:'',
    date:'',
    done:undefined,
    id:undefined,
  }
}

onCheck(item: ITodo) {
  item.done = !item.done
  this.service.update(item);
}
  

onSelectUpdate(item: ITodo){
  this.model = {...item};
}

onDelete(id:string){
  this.service.delete(id);
}

}
