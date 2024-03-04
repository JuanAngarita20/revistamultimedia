import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RevistaService } from 'src/app/services/revista.service';

@Component({
  selector: 'app-create-edicion',
  templateUrl: './create-edicion.component.html',
  styleUrls: ['./create-edicion.component.css']
})
export class CreateEdicionComponent implements OnInit {

  CreateEdicion: FormGroup;
  submited = false;
  spinnerAnim = false;
  id_edicion: string | null;
  titulo = 'Crear Nueva edicion';
  labelBoton = "Crear";

  constructor(private fb: FormBuilder, private _revistaService: RevistaService, private router: Router, private toastr: ToastrService,
              private  aRoute: ActivatedRoute) { 

    this.CreateEdicion = this.fb.group({
      nombre_edicion: ['',Validators.required]
    })
    this.id_edicion = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id_edicion)
  }

  ngOnInit(): void {
    this.titulo = 'Crear Nueva edicion';
    this.labelBoton = "Crear";
    this.opcionEditar();
  }

  funcBotonFormEdicion(){

    this.submited = true;
    if(this.CreateEdicion.invalid){
      return;
    }
    if(this.id_edicion === null){
      this.crearNuevaEdicion();
    }else{
      
      this.editarEdicion(this.id_edicion);
    }

  }

  crearNuevaEdicion(){
    const fechaCreacion_date = new Date();
    const fechaActualizacion_date = new Date();

    this.spinnerAnim = true;
    const edicion: any ={
      nombreEd: this.CreateEdicion.value.nombre_edicion,
      fechaCreacion: fechaCreacion_date.toDateString(),
      fechaActualizacion: fechaActualizacion_date.toDateString()
    }

    this._revistaService.agregarEdicion(edicion).then(() =>{
      this.toastr.success("La edicion fue creada con exito!", "Edicion Creada",{
        positionClass: 'toast-bottom-right'
      })
      console.log("Edicion registrada con exito");
      this.router.navigate(['/list-edicion']);
    }).catch(error =>{
      console.log(error)
    })
  }

  editarEdicion(id_ed: string){
  
    const fechaActualizacion_date = new Date();
    this.spinnerAnim = true;

    const edicion_editada: any ={
      nombreEd: this.CreateEdicion.value.nombre_edicion,
      fechaActualizacion: fechaActualizacion_date.toDateString()
    }
    this._revistaService.actualizarEdicion(id_ed,edicion_editada).then(()=>{
      this.toastr.info("La edicion fue editada con exito!", "Edicion Editada",{
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/list-edicion']);
    })

    //id_ed es un párametro de la funcion editarfuncion, le pasamos la variable global del id_edicion en funcBotonFormEdicion

  }
  
  opcionEditar(){ /* set el renderizado como opcion Editar*/
   
    if(this.id_edicion !== null){
      this.titulo = 'Editar Edicion'
      this.labelBoton = "Editar";
      
      this._revistaService.getEdicion(this.id_edicion).subscribe(data => {
        
        console.log(data.payload.data()['nombreEd']);
        this.CreateEdicion.setValue({
          nombre_edicion:data.payload.data()['nombreEd']
        })
      })
    }


  }

}
