import { Component, OnInit } from '@angular/core';
import { PagosService } from 'src/app/services/pagos.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-por-cancelar',
  templateUrl: './por-cancelar.component.html',
  styleUrls: ['./por-cancelar.component.css']
})
export class PorCancelarComponent implements OnInit {

  pagos_pendientes : any = []
  formCancela : FormGroup

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
    const formData = this.formCancela.value
    const info = { code : formData.code, idPago : idPago }    
    this._pago.pagar(info).subscribe((resp:any) => {
      this.pagosPendientes()
      this.formCancela.reset();
    })
  }
}
