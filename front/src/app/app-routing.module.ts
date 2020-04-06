import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagosComponent } from './component/pagos/pagos.component'
import { EmpleadosComponent } from './component/empleados/empleados.component'
import { PorCancelarComponent } from './component/por-cancelar/por-cancelar.component';
import { VerEmpleadoComponent } from './component/ver-empleado/ver-empleado.component';

const routes: Routes = [
  { path : '', component : EmpleadosComponent },
  { path : "ver/:idEmpleado", component : VerEmpleadoComponent },
  { path : 'por-cancelar', component : PorCancelarComponent },
  { path : 'pagos', component : PagosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
