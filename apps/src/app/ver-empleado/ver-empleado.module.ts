import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerEmpleadoPageRoutingModule } from './ver-empleado-routing.module';

import { VerEmpleadoPage } from './ver-empleado.page';
import { cuentasModalPage } from './cuentas-modal.page';
import { pagosModalPage } from './pagos-modal.page';
import { InputMonedaPipe } from '../input-moneda.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerEmpleadoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VerEmpleadoPage, cuentasModalPage, pagosModalPage, InputMonedaPipe],
  entryComponents:[cuentasModalPage, pagosModalPage]
})
export class VerEmpleadoPageModule {}
