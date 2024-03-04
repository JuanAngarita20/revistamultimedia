import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RevistaService } from 'src/app/services/revista.service';
import { Storage, ref, uploadBytesResumable,getDownloadURL} from '@angular/fire/storage';
import { EditArticuloComponent } from '../edit-articulo/edit-articulo.component';

@Component({
  selector: 'app-create-articulo',
  templateUrl: './create-articulo.component.html',
  styleUrls: ['./create-articulo.component.css']
})
export class CreateArticuloComponent implements OnInit {

  CreateArticulo: FormGroup;
  submited = false;
  spinnerAnim = false;
  id_ed_abuelo = "";
  id_sec_padre: string | null;
 
  //Subida Imagenes
  imagen1 = false;
  botonSubirImagen1 = false;
  file1_url = "";
  type_file1 = "";
  public file:any = {};
  mensajeImagen = "Si va a incluir imagen, haga click en Subir imagen ANTES de crear el articulo";

  
  constructor(private fb: FormBuilder, private _revistaService: RevistaService, private router: Router, private toastr: ToastrService,
    private  aRoute: ActivatedRoute, private storage: Storage) {

      this.CreateArticulo = this.fb.group({
        titulo_articulo: ['',Validators.required],
        autor_articulo: ['',Validators.required],
        cuerpo_articulo: ['',Validators.required],
        conclusion_articulo: ['',Validators.required]
      })
      this.id_sec_padre = this.aRoute.snapshot.paramMap.get('id_se');
      console.log(this.id_sec_padre);
      this.file1_url = "";
      
      //Get id de edicion abuelo
      if(this.id_sec_padre !== null){
        this._revistaService.getSeccion(this.id_sec_padre).subscribe(data => {
          this.id_ed_abuelo = data.payload.data()['id_edicion'];
          console.log(data.payload.data()['id_edicion']);
        })
      }
      
    }

  ngOnInit(): void {
  }

  funcBotonFormArticulo(){
    this.submited = true;
    if(this.CreateArticulo.invalid){
      return;
    }
    this.crearNuevoArticulo();
  }

  crearNuevoArticulo(){
    
    this.spinnerAnim = true;
    const fechaCreacion_date = new Date();
    const fechaActualizacion_date = new Date();
    
    //Data con imagen
    if(this.imagen1){
      const articulo: any ={
        titulo_articulo: this.CreateArticulo.value.titulo_articulo,
        autor_articulo: this.CreateArticulo.value.autor_articulo,
        cuerpo_articulo: this.CreateArticulo.value.cuerpo_articulo,
        conclusion_articulo: this.CreateArticulo.value.conclusion_articulo,
        id_seccion : this.id_sec_padre,
        id_edicion : this.id_ed_abuelo,
        fechaCreacion: fechaCreacion_date.toDateString(),
        fechaActualizacion: fechaActualizacion_date.toDateString(),
        url_imagen1: this.file1_url
      }

      this._revistaService.agregarArticulo(articulo).then(() =>{
        this.toastr.success("El articulo fue creado con exito!", "Articulo Creado",{
          positionClass: 'toast-bottom-right'
        })
        console.log("articulo registrado con exito");
        this.router.navigate(['/list-articulo/', this.id_sec_padre]);
      }).catch(error =>{
        console.log(error)
      })

    }
    else{ //No hay imagen
      const articulo: any ={
        titulo_articulo: this.CreateArticulo.value.titulo_articulo,
        autor_articulo: this.CreateArticulo.value.autor_articulo,
        cuerpo_articulo: this.CreateArticulo.value.cuerpo_articulo,
        conclusion_articulo: this.CreateArticulo.value.conclusion_articulo,
        id_seccion : this.id_sec_padre,
        id_edicion : this.id_ed_abuelo,
        fechaCreacion: fechaCreacion_date.toDateString(),
        fechaActualizacion: fechaActualizacion_date.toDateString(),
        url_imagen1: this.file1_url
      }
      this._revistaService.agregarArticulo(articulo).then(() =>{
        this.toastr.success("El articulo fue creado con exito!", "Articulo Creado",{
          positionClass: 'toast-bottom-right'
        })
        console.log("articulo registrado con exito");
        this.router.navigate(['/list-articulo/', this.id_sec_padre]);
      }).catch(error =>{
        console.log(error)
      })

    }

  }

  uploadImagen1(){

    //Subir imagen primero
    if(this.imagen1){

      const storageRef = ref(this.storage,this.file.name);
      const uploadTask = uploadBytesResumable(storageRef,this.file);
      uploadTask.on('state_changed',
        (snapshot)=>{
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error)=>{
          console.log(error.message);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            this.file1_url = downloadURL;
            console.log('File available at', this.file1_url);
          });
        }
      );
      this.mensajeImagen = "Imagen Subida";
      this.botonSubirImagen1 = true;

    }
    else{
      this.mensajeImagen = "No se ha seleccionado imagen";
      console.log("No se ha subido imagen")
    }

  }

  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      this.file =  event.target.files[0];
      if(this.file.type === 'image/png' || this.file.type === 'image/jpeg'){ //si subio imagen
        this.imagen1 = true; //si se subio imagen
        this.botonSubirImagen1 = false; //volver habilitar opcion de subir imagen
        this.type_file1 = this.file.type;

      }
      else{
        this.mensajeImagen = "Por favor seleccione imagenes (PNG, JPEG)"
      }

    }
    console.log(this.file);
    console.log(this.file.type);
  }
}
