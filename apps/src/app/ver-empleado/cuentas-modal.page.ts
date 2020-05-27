import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CuentasService } from '../services/cuentas.service';
import { PagosService } from '../services/pagos.service';

@Component({
  selector: 'app-cuentas-modal',
  templateUrl: './cuentas-modal.page.html',
  styleUrls: ['./ver-empleado.page.scss'],
})
export class cuentasModalPage implements OnInit {

  @Input('empleados') empleados : any 
  @Input() isEdit : boolean
  @Input() dataEdit : any 

  formCuentas     : FormGroup
  tipos : any  = []
  
  constructor(
    private modalCtrl : ModalController,
    private fb : FormBuilder,
    private _cuentas : CuentasService,   
    private _pagos : PagosService
  ){
    this.formCuentas = this.fb.group({
      id        : [''],
      tipo      : [''],
      nro       : [''],
      titular   : [''],
      telefono  : [''],
      cedula    : [''],
      tipo_banco : [''],
      empleado_id : ['']
    }) 
  }

  ngOnInit(){    
    if(this.isEdit){
      this.formCuentas.setValue(this.dataEdit)      
    }
    this.getTipos()
  }

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  getTipos(){
    this._pagos.getTipos().subscribe((resp:any) => this.tipos = resp )
  }

  newCuenta(){
    const dataValue = this.formCuentas.value
    const data = {
      'nro'       : dataValue.nro,
      'titular'   :  dataValue.titular,
      'telefono'  : dataValue.telefono,
      'cedula'    : dataValue.cedula,
      'empleado_id' : this.empleados.id,
      'tipo_id'     : dataValue.tipo
    }
    this._cuentas.cuentasStore(data).subscribe((resp:any) => {
      this.formCuentas.reset()            
      this.closeModal()
    })
  }

  upgradeCuentas(){
    this._cuentas.cuentasUpgrade(this.formCuentas.value).subscribe((resp:any) => this.closeModal() )
  }

}