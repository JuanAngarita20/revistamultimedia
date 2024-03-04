import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevistaService {

  constructor(private firestore: AngularFirestore) { }

  //Agregar datos
  agregarEdicion(edicion:any): Promise<any> { 
    const id = this.firestore.createId();
    const edicion_w_id = {id,...edicion}
    return this.firestore.collection("Ediciones").doc(edicion_w_id.id).set(edicion_w_id);
  }

  agregarSeccion(seccion:any): Promise<any> { 
    const id = this.firestore.createId();
    const seccion_w_id = {id,...seccion}
    return this.firestore.collection("Secciones").doc(seccion_w_id.id).set(seccion_w_id);
  }

  agregarArticulo(articulo:any): Promise<any> { 
    const id = this.firestore.createId();
    const articulo_w_id = {id,...articulo}
    return this.firestore.collection("Articulos").doc(articulo_w_id.id).set(articulo_w_id);
  }


  //Get para listas a renderizar
  getEdiciones(): Observable<any>{
    return this.firestore.collection("Ediciones", ref => ref.orderBy('fechaCreacion','desc')).snapshotChanges();
  }
  getSecciones(id_edicion:string): Observable<any>{
    return this.firestore.collection("Secciones", ref=>ref.where("id_edicion",'==',id_edicion)).snapshotChanges();
  }
  getArticulos(id_seccion:string): Observable<any>{
    return this.firestore.collection("Articulos", ref=>ref.where("id_seccion",'==',id_seccion)).snapshotChanges();
  }

  getArticulos_FromEdicion(id_edicion:string): Observable<any>{
    return this.firestore.collection("Articulos", ref=>ref.where("id_edicion",'==',id_edicion)).snapshotChanges();
  }



  //Eliminar
  eliminarEdicion(id: string):Promise<any> {
    return this.firestore.collection("Ediciones").doc(id).delete();
  }

  eliminarSeccion(id_se:string):Promise<any>{
    return this.firestore.collection("Secciones").doc(id_se).delete();
  }

  eliminarArticulo(id_ar:string):Promise<any>{
    return this.firestore.collection("Articulos").doc(id_ar).delete();
  }


  //get para editar
  getEdicion(id:string): Observable<any> {
    return this.firestore.collection("Ediciones").doc(id).snapshotChanges();
  }

  getSeccion(id_se:string): Observable<any> {
    return this.firestore.collection("Secciones").doc(id_se).snapshotChanges();
  }

  getArticulo(id_ar:string): Observable<any> {
    return this.firestore.collection("Articulos").doc(id_ar).snapshotChanges();
  }


  //actualizar despues de get
  actualizarEdicion(id:string, data:any):Promise<any>{
    return this.firestore.collection('Ediciones').doc(id).update(data);
  }

  actualizarSeccion(id_se:string, data:any):Promise<any>{
    console.log("llega a servicio");
    console.log(data);
    return this.firestore.collection('Secciones').doc(id_se).update(data);
  }

  actualizarArticulo(id_ar:string, data:any):Promise<any>{
    return this.firestore.collection('Articulos').doc(id_ar).update(data);
  }

}
