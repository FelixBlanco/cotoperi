import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { CuentasService } from 'src/app/services/cuentas.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PagosService } from 'src/app/services/pagos.service';

declare var $ : any;

@Component({
  selector: 'app-ver-empleado',
  templateUrl: './ver-empleado.component.html',
  styleUrls: ['./ver-empleado.component.css']
})
export class VerEmpleadoComponent implements OnInit {

  empleado  : any = null
  pagos     : any = []
  cuentas   : any = []
  tipos     : any = []

  formCuentas     : FormGroup
  formCuentasEdit : FormGroup
  formCancela     : FormGroup
  formAddPago     : FormGroup

  respIs : boolean = false // medimos si el usuario es nuetro o no 

  constructor(
    private rutaActiva : ActivatedRoute,
    private _empleado : EmpleadosService,
    private _cuentas : CuentasService ,
    private fb : FormBuilder,
    private _pago : PagosService,
    private router : Router
  ) { 
    this.formCuentas = this.fb.group({
      tipo      : [''],
      nro       : [''],
      titular   : [''],
      telefono  : [''],
      cedula    : [''],
    }) 
    
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

    this.formAddPago = this.fb.group({
      'monto'       : [''],
      'observacion' : ['Pago semana'],
      'cuenta_id'   : [''],
      'empleado_id' : [''],    
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
        this.formAddPago.controls['empleado_id'].setValue(resp.empleado.id)      
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


  newCuenta(){
    const dataValue = this.formCuentas.value
    const data = {
      'nro'       : dataValue.nro,
      'titular'   :  dataValue.titular,
      'telefono'  : dataValue.telefono,
      'cedula'    : dataValue.cedula,
      'empleado_id' : this.empleado.id,
      'tipo_id'     : dataValue.tipo
    }
    this._cuentas.cuentasStore(data).subscribe((resp:any) => {
      this.getCuentasEmpleados(this.empleado.id)
      this.formCuentas.reset()      
      $("#staticBackdrop").modal('hide')
    })
  }

  editCuenta(datos){
    console.log(datos)
   
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

    $("#editarCuentaModal").modal('show')
  }

  upgradeCuentas(){
    this._cuentas.cuentasUpgrade(this.formCuentasEdit.value).subscribe((resp:any) => this.getCuentasEmpleados(resp.empleado_id) )
    $("#editarCuentaModal").modal('hide')
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

  agregarPago(){
   this._pago.addPagoEmpleados(this.formAddPago.value).subscribe((resp:any)=> {
     this.getEmpleado(resp.empleado_id)     
     this.formAddPago.controls['monto'].setValue('0')
     this.formAddPago.controls['observacion'].setValue('pago semana')
     $("#addPagos").modal('hide')
   }) 
  }

  deleteEmpleado(){
   this._empleado.deletesEmpleado(this.empleado.id).subscribe((resp:any) => {
     this.router.navigate(['/'])
   }) 
  }
}
