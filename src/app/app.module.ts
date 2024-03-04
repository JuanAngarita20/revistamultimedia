import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListEdicionComponent } from './components/list-edicion/list-edicion.component';
import { CreateEdicionComponent } from './components/create-edicion/create-edicion.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListSeccionComponent } from './components/list-seccion/list-seccion.component';
import { CreateSeccionComponent } from './components/create-seccion/create-seccion.component';
import { EditSeccionComponent } from './components/edit-seccion/edit-seccion.component';
import { ListArticulosComponent } from './components/list-articulos/list-articulos.component';
import { CreateArticuloComponent } from './components/create-articulo/create-articulo.component';
import { EditArticuloComponent } from './components/edit-articulo/edit-articulo.component';
import { ViewArticuloComponent } from './components/view-articulo/view-articulo.component';

@NgModule({
  declarations: [
    AppComponent,
    ListEdicionComponent,
    CreateEdicionComponent,
    NavbarComponent,
    ListSeccionComponent,
    CreateSeccionComponent,
    EditSeccionComponent,
    ListArticulosComponent,
    CreateArticuloComponent,
    EditArticuloComponent,
    ViewArticuloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
