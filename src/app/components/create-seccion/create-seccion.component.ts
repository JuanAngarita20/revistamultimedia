import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RevistaService } from 'src/app/services/revista.service';

@Component({
  selector: 'app-create-seccion',
  templateUrl: './create-seccion.component.html',
  styleUrls: ['./create-seccion.component.css']
})
export class CreateSeccionComponent implements OnInit {

  CreateSeccion: FormGroup;
  submited = false;
  spinnerAnim = false;
  id_ed_padre: string | null;
  titulo = 'Crear Nueva seccion';
  labelBoton = "Crear";

  constructor(private fb: FormBuilder, private _revistaService: RevistaService, private router: Router, private toastr: ToastrService,
    private  aRoute: ActivatedRoute) { 

      this.CreateSeccion = this.fb.group({
        nombre_seccion: ['',Validators.required]
      })
      this.id_ed_padre = this.aRoute.snapshot.paramMap.get('id_ed');
      console.log(this.id_ed_padre)
    
    }

  ngOnInit(): void {
  }

  funcBotonFormSeccion(){
    this.submited = true;
    if(this.CreateSeccion.invalid){
      return;
    }
    this.crearNuevaSeccion();
  }

  crearNuevaSeccion(){
    const fechaCreacion_date = new Date();
    const fechaActualizacion_date = new Date();

    this.spinnerAnim = true;
    const seccion: any ={
      nombre_seccion: this.CreateSeccion.value.nombre_seccion,
      id_edicion : this.id_ed_padre,
      fechaCreacion: fechaCreacion_date.toDateString(),
      fechaActualizacion: fechaActualizacion_date.toDateString()
    }

    this._revistaService.agregarSeccion(seccion).then(() =>{
      this.toastr.success("La seccion fue creada con exito!", "Seccion Creada",{
        positionClass: 'toast-bottom-right'
      })
      console.log("Seccion registrada con exito");
      this.router.navigate(['/list-seccion/', this.id_ed_padre]);
    }).catch(error =>{
      console.log(error)
    })
  }

  editarSeccion(id_se: string){
  
    const fechaActualizacion_date = new Date();
    this.spinnerAnim = true;

    const edicion_editada: any ={
      nombreEd: this.CreateSeccion.value.nombre_edicion,
      fechaActualizacion: fechaActualizacion_date.toDateString()
    }
    this._revistaService.actualizarEdicion(id_se,edicion_editada).then(()=>{
      this.toastr.info("La edicion fue editada con exito!", "Edicion Editada",{
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/list-edicion']);
    })

    //id_ed es un párametro de la funcion editarfuncion, le pasamos la variable global del id_edicion en funcBotonFormEdicion

  }

}
