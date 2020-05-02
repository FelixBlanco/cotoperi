import { Component, OnInit } from '@angular/core';
import { PagosService } from 'src/app/services/pagos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-nomina',
  templateUrl: './lista-nomina.component.html',
  styleUrls: ['./lista-nomina.component.css']
})
export class ListaNominaComponent implements OnInit {

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
    this._pagos.listaFechaPagos().subscribe((resp)=> {
      this.isLoading = false
      this.lista_fechas = resp
    })
  }

}


@Component({
  selector: 'app-lista-nomina-list',
  templateUrl: './lista-nomina-list.component.html',
  styleUrls: ['./lista-nomina.component.css']
})
export class ListaNominaListComponent implements OnInit {

  fechaSeach : Date
  listaPagos : any = []
  isLoading : boolean = false
  totalNeto : any = null 
  
  constructor(
    private router : ActivatedRoute,
    private _pago : PagosService
  ) { }

  ngOnInit(): void {    
    this.fechaSeach = this.router.snapshot.params.date    
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
