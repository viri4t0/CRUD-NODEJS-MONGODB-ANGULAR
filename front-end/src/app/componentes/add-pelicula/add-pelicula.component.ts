import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../models/pelicula';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
/**RECUERDA IMPORTAR FORMS EN EL MODULO */




@Component({
  selector: 'app-add-pelicula',
  templateUrl: './add-pelicula.component.html',
  styleUrls: ['./add-pelicula.component.css']
})
export class AddPeliculaComponent implements OnInit {

  
  public pelicula : Pelicula;
  /*Checkbox*/
  dropdownList : any;
  selectedItems : any;
  dropdownSettings : IDropdownSettings;


  
  constructor() 
  { 
    this.pelicula = new Pelicula("","","","","",{nombre: "", apellidos: ""},[]);

    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
    ];
    this.selectedItems = [];
    this.dropdownSettings  = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: false,
      itemsShowLimit: 5,
      allowSearchFilter: false
    };

    
  }

  ngOnInit(): void 
  {

    
    
    
  }

  onSubmit()
  {
    console.log("funciona");
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}

