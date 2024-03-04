import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RevistaService } from 'src/app/services/revista.service';

@Component({
  selector: 'app-edit-articulo',
  templateUrl: './edit-articulo.component.html',
  styleUrls: ['./edit-articulo.component.css']
})
export class EditArticuloComponent implements OnInit {

  EditarArticulo: FormGroup;
  submited = false;
  spinnerAnim = false;
  id_articulo:  string | null;
  id_sec_padre = "";

  constructor(private fb: FormBuilder, private _revistaService: RevistaService, private router: Router, private toastr: ToastrService,
    private  aRoute: ActivatedRoute) { 

      this.EditarArticulo = this.fb.group({
        titulo_articulo: ['',Validators.required],
        autor_articulo: ['',Validators.required],
        cuerpo_articulo: ['',Validators.required],
        conclusion_articulo: ['',Validators.required]
      })

    this.id_articulo = this.aRoute.snapshot.paramMap.get('id_ar');
    console.log(this.id_articulo)
  }

  ngOnInit(): void {
    this.setvaluesForm();
  }

  setvaluesForm(){
    if(this.id_articulo !== null){
      this._revistaService.getArticulo(this.id_articulo).subscribe(data => {
        this.EditarArticulo.setValue({
          titulo_articulo:data.payload.data()['titulo_articulo'],
          autor_articulo:data.payload.data()['autor_articulo'],
          cuerpo_articulo:data.payload.data()['cuerpo_articulo'],
          conclusion_articulo:data.payload.data()['conclusion_articulo'],
        })
      })

      //Get id de la seccion padre
      this._revistaService.getArticulo(this.id_articulo).subscribe(data => {
        this.id_sec_padre= data.payload.data()['id_seccion'];
        console.log(this.id_sec_padre);
      })
    }

  }

  funcBotonFormEditar_Articulo(){
    this.submited = true;
    if(this.EditarArticulo.invalid){
      return;
    }
    this.editarArticulo();
  }

  editarArticulo(){
    const fechaActualizacion_date = new Date();
    this.spinnerAnim = true;

    const articulo_editado: any ={
      titulo_articulo: this.EditarArticulo.value.titulo_articulo,
      autor_articulo: this.EditarArticulo.value.autor_articulo,
      cuerpo_articulo: this.EditarArticulo.value.cuerpo_articulo,
      conclusion_articulo: this.EditarArticulo.value.conclusion_articulo,
      fechaActualizacion: fechaActualizacion_date.toDateString()
    }
    if(this.id_articulo !==null){

   
      this._revistaService.actualizarArticulo(this.id_articulo,articulo_editado).then(()=>{
        this.toastr.info("El articulo fue con exito!", "Articulo Editado",{
          positionClass: 'toast-bottom-right'
        })
        this.router.navigate(['/list-articulo',this.id_sec_padre]);
      })

    }
  }

}
