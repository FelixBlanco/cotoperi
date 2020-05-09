import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagosComponent } from './component/pagos/pagos.component'
import { EmpleadosComponent } from './component/empleados/empleados.component'
import { PorCancelarComponent } from './component/por-cancelar/por-cancelar.component';
import { VerEmpleadoComponent } from './component/ver-empleado/ver-empleado.component';
import { ListaNominaComponent, ListaNominaListComponent } from './component/lista-nomina/lista-nomina.component';
import { AboutComponent } from './component/about/about.component';

const routes: Routes = [
  { path : '', component : EmpleadosComponent },
  { path : 'empleados', component : EmpleadosComponent},
  { path : "empleados/:idEmpleado", component : VerEmpleadoComponent },
  { path : 'por-cancelar', component : PorCancelarComponent },
  { path : 'pagos', component : PagosComponent },
  { path : 'nominas', component : ListaNominaComponent },
  { path : 'nominas/:date', component : ListaNominaListComponent },
  { path : 'acerca', component : AboutComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
