import { Component, OnInit } from '@angular/core';
import { PagosService } from 'src/app/services/pagos.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  
  pagos_pendientes : any = []
  formCancela : FormGroup
  isLoading : boolean = false
  
  constructor(
    private _pago : PagosService,
    private fb : FormBuilder    
  ) { 
    this.formCancela = this.fb.group({
      code : ['']
    })    
  }

  ngOnInit(): void {
    this.pagosPendientes()    
  }

  pagosPendientes(){
    this._pago.pagosPendientes().subscribe((resp:any) => {
      this.pagos_pendientes = resp
    })
  }

  codePago(idPago){
    this.isLoading = true
    const formData = this.formCancela.value
    const info = { code : formData.code, idPago : idPago }    
    this._pago.pagar(info).subscribe((resp:any) => {
      this.pagosPendientes()
      this.formCancela.reset();
      this.isLoading = false
    })
  }

  deletePago(id){
    this._pago.deletePagos(id).subscribe((resp) => {
      this.pagosPendientes()      
    })
  }

}
