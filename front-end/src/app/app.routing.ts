import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { PanelComponent } from './componentes/panel/panel.component';

const appRoutes = 
[
    { path: '', component: PanelComponent},
    { path: 'panel', component: PanelComponent},
    { path: '**', component: PageNotFoundComponent},
];

export const routing = RouterModule.forRoot(appRoutes);