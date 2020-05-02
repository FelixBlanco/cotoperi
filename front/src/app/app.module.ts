import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagosComponent } from './component/pagos/pagos.component';
import { EmpleadosComponent } from './component/empleados/empleados.component';
import { PorCancelarComponent } from './component/por-cancelar/por-cancelar.component';
import { VerEmpleadoComponent } from './component/ver-empleado/ver-empleado.component';
import { ListaNominaComponent, ListaNominaListComponent } from './component/lista-nomina/lista-nomina.component';
import { FilterSeachPipe } from './filter-seach.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PagosComponent,
    EmpleadosComponent,
    PorCancelarComponent,
    VerEmpleadoComponent,
    ListaNominaComponent,
    ListaNominaListComponent,
    FilterSeachPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, FormsModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
