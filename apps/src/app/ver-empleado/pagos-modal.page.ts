import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PagosService } from '../services/pagos.service';
import { CuentasService } from '../services/cuentas.service';

@Component({
  selector: 'app-pagos-modal',
  templateUrl: './pagos-modal.page.html',
  styleUrls: ['./ver-empleado.page.scss'],
})
export class pagosModalPage implements OnInit {

  @Input('empleados') empleados : any 

  formAddPago     : FormGroup
  cuentas   : any = []

  constructor(
    private modalCtrl : ModalController,
    private fb : FormBuilder,
    private _pago : PagosService,
    private _cuentas : CuentasService
  ){
    this.formAddPago = this.fb.group({
      'monto'       : [''],
      'observacion' : ['Pago semana'],
      'cuenta_id'   : [''],
      'empleado_id' : [''],    
    })
  }

  ngOnInit(){    
    this.formAddPago.controls['empleado_id'].setValue(this.empleados.id)   
    this.getCuentasEmpleados(this.empleados.id)
  }

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  getCuentasEmpleados(idEmpleado){
    this._cuentas.cuentasEmpleados(idEmpleado).subscribe((resp:any) => {
      this.cuentas = resp
    })
  }

  agregarPago(){
    this._pago.addPagoEmpleados(this.formAddPago.value).subscribe((resp:any)=> {      
      this.formAddPago.controls['monto'].setValue('0')
      this.formAddPago.controls['observacion'].setValue('pago semana')     
      this.closeModal()
    }) 
   }

}