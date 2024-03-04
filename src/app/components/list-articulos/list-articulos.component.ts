import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RevistaService } from 'src/app/services/revista.service';

@Component({
  selector: 'app-list-articulos',
  templateUrl: './list-articulos.component.html',
  styleUrls: ['./list-articulos.component.css']
})
export class ListArticulosComponent implements OnInit {

  id_seccion: string | null;
  articulos: any[] = [];
  nombre_seccion_padre:string = 'Cargando...';
  id_edicion_padre:string = '1';

  constructor(private _revistaService: RevistaService, private router: Router, private toastr: ToastrService,
    private  aRoute: ActivatedRoute) { 

    //recoger id de la seccion al que pertence la seccion
    this.id_seccion = this.aRoute.snapshot.paramMap.get('id_se'); //id_se tiene el mismo nombre que el declarado en app.routing.module
    console.log(this.id_seccion)
    }

  ngOnInit(): void {
    if(this.id_seccion === null){
      console.log("No se recibio ID de una Edicion")
    }else{
      this.getArticulos(this.id_seccion);
    }
  }

  getArticulos(id_seccion:string){
    //Get articulos de seccion padre
    this._revistaService.getArticulos(id_seccion).subscribe(data =>{
      this.articulos=[];
      data.forEach((element:any) => {
        this.articulos.push({
          ...element.payload.doc.data()
        })
        /*console.log(element.payload.doc.id);  */ 
      });
      console.log(this.articulos);
    });

    //Get nombre de seccion padre
    this._revistaService.getSeccion(id_seccion).subscribe(data => {
      this.nombre_seccion_padre = data.payload.data()['nombre_seccion'];
      console.log(data.payload.data()['nombre_seccion']);
    })

    //Get id del abuelo (padre de seccion)
    this._revistaService.getSeccion(id_seccion).subscribe(data => {
      this.id_edicion_padre = data.payload.data()['id_edicion'];
      console.log(data.payload.data()['id_edicion']);
    })
  }

  eraseArticulo(id_ar:string){
   
    this._revistaService.eliminarArticulo(id_ar).then(()=>{
      console.log("Articulo Eliminado")
      this.toastr.error("El articulo ha sido eliminado con exito", "Articulo Eliminado",{
        positionClass: 'toast-bottom-right'
      })
    }).catch(error => {
      console.log(error)
    })

  }

  volver_a_Secciones(){
    //hace lo mismo que -->  [routerLink]="['/list-seccion/',id_edicion_padre]" que antes se ´pnia directamente en el tah the boton
    this.router.navigate(['/list-seccion/', this.id_edicion_padre]);
    this.id_edicion_padre = '';
    this.nombre_seccion_padre = '';

  }

}
