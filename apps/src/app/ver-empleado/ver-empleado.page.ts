import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Tab1Service } from '../tab1/tab1.service';
import { CuentasService } from '../services/cuentas.service';
import { PagosService } from '../services/pagos.service';

import { ModalController } from '@ionic/angular';
import { cuentasModalPage } from './cuentas-modal.page';
import { pagosModalPage } from './pagos-modal.page';

@Component({
  selector: 'app-ver-empleado',
  templateUrl: './ver-empleado.page.html',
  styleUrls: ['./ver-empleado.page.scss'],
})
export class VerEmpleadoPage implements OnInit {

  empleado  : any = null
  pagos     : any = []
  cuentas   : any = []
  tipos     : any = []

  formCuentasEdit : FormGroup
  formCancela     : FormGroup
  
  respIs : boolean = false // medimos si el usuario es nuetro o no 

  segmentValue : string = 'pagos'

  constructor(
    private rutaActiva : ActivatedRoute,
    private _empleado : Tab1Service,
    private _cuentas : CuentasService ,
    private fb : FormBuilder,
    private _pago : PagosService,
    private router : Router,
    public modalController: ModalController
  ) { 

    
    this.formCuentasEdit = this.fb.group({
      id        : [''],
      tipo      : [''],
      nro       : [''],
      titular   : [''],
      telefono  : [''],
      cedula    : [''],
      tipo_banco : [''],
      empleado_id : ['']
    })   
    
    this.formCancela = this.fb.group({
      code : ['']
    })     
  }

  ngOnInit(): void {
    const id = this.rutaActiva.snapshot.params.idEmpleado    
    this.getEmpleado(id)
    this.getTipos()
  }

  getTipos(){
    this._pago.getTipos().subscribe((resp:any) => {
      this.tipos = resp
    })
  }

  getEmpleado(id){
    this._empleado.showEmpleado(id).subscribe((resp:any) => {
      if(resp.response){
        this.empleado = resp.empleado
        this.pagos = resp.pagos
        this.getCuentasEmpleados(id)
           
        this.respIs = true;        
      }else{
        this.respIs = false;
      }
    })
  }

  getCuentasEmpleados(idEmpleado){
    this._cuentas.cuentasEmpleados(idEmpleado).subscribe((resp:any) => {
      this.cuentas = resp
    })
  }

  editCuenta(datos){    
   
    if(datos.tipo_id == 1){ // datos trasferencia
      
      this.formCuentasEdit.controls['id'].setValue(datos.id)
      this.formCuentasEdit.controls['cedula'].setValue(datos.cedula)
      this.formCuentasEdit.controls['empleado_id'].setValue(datos.empleado_id)
      this.formCuentasEdit.controls['nro'].setValue(datos.nro)
      this.formCuentasEdit.controls['titular'].setValue(datos.titular)
      this.formCuentasEdit.controls['tipo'].setValue(datos.tipo_id)
    }

    if(datos.tipo_id == 2){ // datos pago movil
      this.formCuentasEdit.controls['id'].setValue(datos.id)
      this.formCuentasEdit.controls['cedula'].setValue(datos.cedula)
      this.formCuentasEdit.controls['empleado_id'].setValue(datos.empleado_id)
      this.formCuentasEdit.controls['telefono'].setValue(datos.telefono)
      this.formCuentasEdit.controls['titular'].setValue(datos.titular)
      this.formCuentasEdit.controls['tipo_banco'].setValue(datos.tipo_banco)
      this.formCuentasEdit.controls['tipo'].setValue(datos.tipo_id)

    }

    this.modalCuentas(true,this.formCuentasEdit.value);
  }

  codePago(idPago){
    const formData = this.formCancela.value
    const info = { code : formData.code, idPago : idPago }    
    this._pago.pagar(info).subscribe((resp:any) => {
      this.getEmpleado(resp.empleado_id)
      this.formCancela.reset();
    })
  }

  deletePago(id){
    this._pago.deletePagos(id).subscribe((resp:any) => {      
      this.getEmpleado(resp.empleado_id) 
    })
  }

  deleteCuentas($idcuenta){
    this._cuentas.deleteCuentas($idcuenta).subscribe((resp:any) => {
      this.getCuentasEmpleados(resp.empleado_id)
    })
  }


  deleteEmpleado(){
   this._empleado.deletesEmpleado(this.empleado.id).subscribe((resp:any) => {
     this.router.navigate(['/'])
   }) 
  }

  segmentChanged(ev: any) {    
    this.segmentValue = ev.detail.value
    this.pagos
  }


  async modalCuentas(isEdit : boolean = false, dataEdit : any = [] ) {
    const modal = await this.modalController.create({
      component: cuentasModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'empleados' : this.empleado,
        isEdit : isEdit,
        dataEdit : dataEdit
      }
    });
    return await modal.present();
  }

  async modalPagos(){
    const modal = await this.modalController.create({
      component: pagosModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        empleados : this.empleado,        
      }
    });
    return await modal.present();
  }  

}
