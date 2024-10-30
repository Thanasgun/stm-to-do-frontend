export interface ITodo{
  id?: any;
  content: string;
  date: string;
  done?: boolean
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url: string = 'http://localhost:5039/';
  storageKey: string = 'local-storage-todo';
  data: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.getLocal());

  constructor(private http: HttpClient) { 

  }

  getLocal(): ITodo[]{
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  setLocal(data: ITodo[]){
    localStorage.setItem(this.storageKey, JSON.stringify(data))
    this.data.next(data);
  }

  data$(){
    return this.data.asObservable();
  }

  get(){
    const data = this.getLocal();
    return data;
  }

  add(item: ITodo){
    const data = this.getLocal();
    const calId = data.length > 0 ? Math.max(...data.map((i:ITodo) => i.id)) : 0;

    item.id = calId + 1;
    item.date = new Date().toLocaleDateString();
    console.log(item);
    data.push(item);
    this.setLocal(data);
  }

  update(item: ITodo){
    const data = this.getLocal();
    const findIndex = data.findIndex((find: ITodo) => find.id == item.id)
  
    if(findIndex >= 0){
      data[findIndex] = item;
      console.log('updating', item)
      this.setLocal(data);    
    }
  }

  delete(id: string){
    const data = this.getLocal();
    const updatedItem =  data.filter((find: ITodo) => find.id != id)
    this.setLocal(updatedItem);
  }

}
