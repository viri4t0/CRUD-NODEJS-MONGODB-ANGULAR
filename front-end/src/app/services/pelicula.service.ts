import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from './global';
import { Observable } from 'rxjs';
/*
Necesario importar el httpclient tambien en el app.module
*/


@Injectable()
export class PeliculaService 
{
    public url: string;
    private _http: HttpClient;

    constructor(_http:HttpClient)
    {
        this._http= _http;
        this.url = Global.url;
    }

    getPeliculas():Observable<any>
    {
        return this._http.get(this.url+'getPeliculas');  
    }

    deletePelicula(id:string):Observable<any>
    {
        return this._http.delete(this.url+'pelicula/'+id);
    }
}
