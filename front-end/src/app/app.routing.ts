import { RouterModule } from '@angular/router';
import { AddPeliculaComponent } from './componentes/add-pelicula/add-pelicula.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { PanelComponent } from './componentes/panel/panel.component';


const appRoutes = 
[
    { path: '', component: PanelComponent},
    { path: 'panel', component: PanelComponent},
    { path: 'nuevo', component: AddPeliculaComponent},
    { path: '**', component: PageNotFoundComponent},
];

export const routing = RouterModule.forRoot(appRoutes);