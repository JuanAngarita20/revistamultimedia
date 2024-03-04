import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RevistaService } from 'src/app/services/revista.service';

@Component({
  selector: 'app-edit-seccion',
  templateUrl: './edit-seccion.component.html',
  styleUrls: ['./edit-seccion.component.css']
})
export class EditSeccionComponent implements OnInit {

  EditarSeccion: FormGroup;
  submited = false;
  spinnerAnim = false;
  id_seccion:  string | null;
  id_ed_padre = "";

  constructor(private fb: FormBuilder, private _revistaService: RevistaService, private router: Router, private toastr: ToastrService,
    private  aRoute: ActivatedRoute) { 

    this.EditarSeccion = this.fb.group({
      nombre_seccion: ['',Validators.required]
    })

    this.id_seccion = this.aRoute.snapshot.paramMap.get('id_se');
    console.log(this.id_seccion)
  }

  ngOnInit(): void {
    this.setvaluesForm();    
  }

  setvaluesForm(){
    if(this.id_seccion !== null){
      this._revistaService.getSeccion(this.id_seccion).subscribe(data => {
        this.EditarSeccion.setValue({
          nombre_seccion:data.payload.data()['nombre_seccion']
        })
      })

      //Get id de le edicion padre
      this._revistaService.getSeccion(this.id_seccion).subscribe(data => {
        this.id_ed_padre= data.payload.data()['id_edicion'];
        console.log(this.id_ed_padre);
      })
    }

  }

  editarSeccion(){
    const fechaActualizacion_date = new Date();
    this.spinnerAnim = true;

    const seccion_editada: any ={
      nombre_seccion: this.EditarSeccion.value.nombre_seccion,
      fechaActualizacion: fechaActualizacion_date.toDateString()
    }
    if(this.id_seccion !==null){

      console.log("Llega hasta aqui");

      this._revistaService.actualizarSeccion(this.id_seccion,seccion_editada).then(()=>{
        this.toastr.info("La seccion fue editada con exito!", "Seccion Editada",{
          positionClass: 'toast-bottom-right'
        })
        this.router.navigate(['/list-seccion',this.id_ed_padre]);
      })

    }
  }

}
