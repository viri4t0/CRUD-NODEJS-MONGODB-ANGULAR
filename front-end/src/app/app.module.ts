import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing  } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
/**IMPORTANTISIMO O NO FUNCIONARAN LOS FORMULARIOS */
import {FormsModule} from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { PanelComponent } from './componentes/panel/panel.component';
import { AddPeliculaComponent } from './componentes/add-pelicula/add-pelicula.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    PanelComponent,
    AddPeliculaComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    NgMultiSelectDropDownModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
