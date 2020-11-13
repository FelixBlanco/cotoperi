import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
import { LoginComponent } from './component/login/login.component';
import { AboutComponent } from './component/about/about.component';
import { FooterComponent } from './component/footer/footer.component';
import { InputMonedaPipe } from './pipes/input-moneda.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BodyComponent } from './component/body/body.component';

@NgModule({
  declarations: [
    AppComponent,
    PagosComponent,
    EmpleadosComponent,
    PorCancelarComponent,
    VerEmpleadoComponent,
    ListaNominaComponent,
    ListaNominaListComponent,
    FilterSeachPipe,
    LoginComponent,
    AboutComponent,
    FooterComponent,
    InputMonedaPipe,
    BodyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, FormsModule, 
    HttpClientModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

  
})
export class AppModule { }
