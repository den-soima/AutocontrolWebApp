import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestCrudServices {

  constructor() { }

  refreshList(){
    console.log('test rest Api')
  }
}
