import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing  } from './app.routing';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { PanelComponent } from './componentes/panel/panel.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    PanelComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
