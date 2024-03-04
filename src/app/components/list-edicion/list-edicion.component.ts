import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RevistaService } from 'src/app/services/revista.service';

@Component({
  selector: 'app-list-edicion',
  templateUrl: './list-edicion.component.html',
  styleUrls: ['./list-edicion.component.css']
})
export class ListEdicionComponent implements OnInit {
 
  ediciones: any[] = [];
  lista_secciones: any[] = [];

  constructor(private _revistaService: RevistaService, private toastr: ToastrService) { 
    
  }

  ngOnInit(): void {
    this.getEdiciones()
  }

  getEdiciones(){
    this._revistaService.getEdiciones().subscribe(data =>{
      this.ediciones=[];
      data.forEach((element:any) => {
        this.ediciones.push({
          ...element.payload.doc.data()
        })
        /*console.log(element.payload.doc.id);  */ 
      });
      console.log(this.ediciones);
    });
  }

  eraseEdicion(id:string){
    this._revistaService.eliminarEdicion(id).then(()=>{
      console.log("Edicion Eliminada")
      this.toastr.error("La edicion ha sido eliminada con exito", "Edicion Eliminada",{
        positionClass: 'toast-bottom-right'
      })
    }).catch(error => {
      console.log(error)
    })

    //Eliminar secciones de la edicion -- Borrar esto
    this._revistaService.getSecciones(id).subscribe(data =>{
  
      data.forEach((element:any) => {
        this._revistaService.eliminarSeccion(element.payload.doc.data()['id']).then(()=>{
          console.log("secciones Eliminada")
        }).catch(error => {
          console.log(error)
        })

        /*console.log(element.payload.doc.id);  */ 
      });
    });

    //Eliminar articulos de la edicion -- Borrar esto
    this._revistaService.getArticulos_FromEdicion(id).subscribe(data =>{
  
      data.forEach((element:any) => {
        this._revistaService.eliminarArticulo(element.payload.doc.data()['id']).then(()=>{
          console.log("articulos Eliminados")
        }).catch(error => {
          console.log(error)
        })

        /*console.log(element.payload.doc.id);  */ 
      });
    });
    
  }



}
