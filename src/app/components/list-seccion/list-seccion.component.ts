import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RevistaService } from 'src/app/services/revista.service';

@Component({
  selector: 'app-list-seccion',
  templateUrl: './list-seccion.component.html',
  styleUrls: ['./list-seccion.component.css']
})
export class ListSeccionComponent implements OnInit {

  id_edicion: string | null;
  secciones: any[] = [];
  nombre_edicion_padre:string = 'Cargando...';

  constructor(private _revistaService: RevistaService, private router: Router, private toastr: ToastrService,
    private  aRoute: ActivatedRoute) {

    //recoger id de la edicion al que pertence la seccion
    this.id_edicion = this.aRoute.snapshot.paramMap.get('id_ed'); //id_ed tiene el mismo nombre que el declarado en app.routing.module
    console.log(this.id_edicion)
  }
  ngOnInit(): void {
    
    if(this.id_edicion === null){
      console.log("No se recibio ID de una Edicion")
    }else{
      this.getSecciones(this.id_edicion);
    }
    
  }

  getSecciones(id_edicion:string){
    //Get secciones de edicion padre
    this._revistaService.getSecciones(id_edicion).subscribe(data =>{
      this.secciones=[];
      data.forEach((element:any) => {
        this.secciones.push({
          ...element.payload.doc.data()
        })
        /*console.log(element.payload.doc.id);  */ 
      });
      console.log(this.secciones);
    });

    //Get nombre de edicion padre
    this._revistaService.getEdicion(id_edicion).subscribe(data => {
      this.nombre_edicion_padre = data.payload.data()['nombreEd'];
      console.log(data.payload.data()['nombreEd']);
    })
  }

  eraseSeccion(id_se:string){
    this._revistaService.eliminarSeccion(id_se).then(()=>{
      console.log("Seccion Eliminada")
      this.toastr.error("La seccion ha sido eliminada con exito", "Seccion Eliminada",{
        positionClass: 'toast-bottom-right'
      })
    }).catch(error => {
      console.log(error)
    })

    //borar articulos de seccion -- Borrar esto
    this._revistaService.getArticulos(id_se).subscribe(data =>{
  
      data.forEach((element:any) => {
        this._revistaService.eliminarArticulo(element.payload.doc.data()['id']).then(()=>{
          console.log("articulos Eliminada")
        }).catch(error => {
          console.log(error)
        })

        /*console.log(element.payload.doc.id);  */ 
      });
    });

  }

  

}
