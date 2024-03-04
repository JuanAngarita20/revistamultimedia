import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateArticuloComponent } from './components/create-articulo/create-articulo.component';
import { CreateEdicionComponent } from './components/create-edicion/create-edicion.component';
import { CreateSeccionComponent } from './components/create-seccion/create-seccion.component';
import { EditArticuloComponent } from './components/edit-articulo/edit-articulo.component';
import { EditSeccionComponent } from './components/edit-seccion/edit-seccion.component';
import { ListArticulosComponent } from './components/list-articulos/list-articulos.component';
import { ListEdicionComponent } from './components/list-edicion/list-edicion.component';
import { ListSeccionComponent } from './components/list-seccion/list-seccion.component';
import { ViewArticuloComponent } from './components/view-articulo/view-articulo.component';

const routes: Routes = [
  {path: '',redirectTo:'list-edicion', pathMatch:'full'},
  {path: 'list-edicion', component: ListEdicionComponent},
  {path: 'create-edicion', component: CreateEdicionComponent},
  {path: 'editar-edicion/:id', component: CreateEdicionComponent},
  {path: 'list-seccion/:id_ed', component: ListSeccionComponent},
  {path: 'create-seccion/:id_ed', component: CreateSeccionComponent},
  {path: 'editar-seccion/:id_se', component: EditSeccionComponent},
  {path: 'list-articulo/:id_se', component: ListArticulosComponent},
  {path: 'create-articulo/:id_se', component: CreateArticuloComponent},
  {path: 'editar-articulo/:id_ar', component: EditArticuloComponent},
  {path: 'view-articulo/:id_ar', component: ViewArticuloComponent},
  {path: '**',redirectTo:'list-edicion', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
