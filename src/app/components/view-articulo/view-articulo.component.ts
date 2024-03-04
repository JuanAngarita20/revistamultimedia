import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RevistaService } from 'src/app/services/revista.service';

@Component({
  selector: 'app-view-articulo',
  templateUrl: './view-articulo.component.html',
  styleUrls: ['./view-articulo.component.css']
})
export class ViewArticuloComponent implements OnInit {

  id_articulo:  string | null;
  id_sec_padre = "";
  titulo = "";
  autor = "";
  cuerpo = "";
  conclusion = "";
  file_url = ""; 
  fileExist= false;

  constructor(private _revistaService: RevistaService, private router: Router, private toastr: ToastrService,
    private  aRoute: ActivatedRoute) {

    this.id_articulo = this.aRoute.snapshot.paramMap.get('id_ar');
     console.log(this.id_articulo)

     }

  ngOnInit(): void {
    this.getarticulo_toView();
  }

  getarticulo_toView(){

    if(this.id_articulo !== null){
      this._revistaService.getArticulo(this.id_articulo).subscribe(data => {
        this.titulo = data.payload.data()['titulo_articulo'],
        this.autor = data.payload.data()['autor_articulo'],
        this.cuerpo = data.payload.data()['cuerpo_articulo'],
        this.conclusion= data.payload.data()['conclusion_articulo'],
        this.file_url= data.payload.data()['url_imagen1']

        if(this.file_url == ""){      
          console.log("No hay imagen");
        }
        else{
          console.log("hay imagen");
          this.fileExist = true;
        }
        
      })

      //Get id de la seccion padre
      this._revistaService.getArticulo(this.id_articulo).subscribe(data => {
        this.id_sec_padre= data.payload.data()['id_seccion'];
        console.log(this.id_sec_padre);
      })
    }


  }

}
