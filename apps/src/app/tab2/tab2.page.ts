import { Component, OnInit } from '@angular/core';
import { PagosService } from '../services/pagos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  lista_fechas : any = []
  isLoading : boolean = false

  constructor(
    private _pagos : PagosService
  ) { }

  ngOnInit(): void {
    this.getListaFechas()
  }

  getListaFechas(){
    this.isLoading = true
    this._pagos.listaFechaPagos().subscribe((resp:any)=> {      
      this.isLoading = false
      this.lista_fechas = resp
    })    
  }


}


@Component({
  selector: 'app-lista-nomina-list',
  templateUrl: './lista-nomina-list.component.html',  
})
export class ListaNominaListComponent implements OnInit {

  fechaSeach : any  = null
  listaPagos : any = []
  isLoading : boolean = false
  totalNeto : any = null 
  
  constructor(
    private router : ActivatedRoute,
    private _pago : PagosService
  ) { }

  ngOnInit(): void {    
    this.fechaSeach = this.router.snapshot.params.fecha   
    // console.log(this.router.snapshot.params)
    console.log(this.fechaSeach)
    this.getSeachPagos(this.fechaSeach)
  }
  
  getSeachPagos(date){    
    
    this.isLoading = true
    this._pago.seachNomina(date).subscribe((resp:any) => {
      this.isLoading = false
      this.listaPagos = resp.p
      this.totalNeto = resp.totalNeto
    })
  }

}