import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../models/pelicula';
import { Global } from '../../services/global';
import { Router } from '@angular/router';

import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  providers: [PeliculaService]
})
export class PanelComponent implements OnInit {

  public peliculas : Pelicula[];
  public url: string;

  constructor(
    public _peliculaService: PeliculaService,
    private _router: Router) 
    { 
      this.url = Global.url;
      this.peliculas = [new Pelicula("","","","","",{nombre: "", apellidos: ""},[])];
    }

  ngOnInit(): void 
  {

    this._peliculaService.getPeliculas().subscribe(
      response =>
      {
        this.peliculas = response.peliculas;
      },
      error => {
        //Si no recoge los articulos borramos el de por defecto
        this.peliculas.splice(0, 1);
      });    
  }




  obtenerImagen(imagen: string): string
  {

    let ruta = "../../../assets/images/nofound.png"
    
    if(imagen)
    {
      ruta =  this.url + 'get-image/' + imagen
    }
    
    return ruta;
  }

  eliminarPelicula(id: string, index: number)
  {

    this._peliculaService.deletePelicula(id).subscribe(
      res =>
      {
        console.log("pelicula eliminada");

        this.peliculas.splice(index, 1);
          
      },
      err =>
      {
        console.log("pelicula no eliminada");
        this._router.navigate(['/panel']);
      });
      
  }

}


