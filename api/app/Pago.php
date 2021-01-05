<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pago extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'cuenta_id','empleado_id','is_pago','code','observacion','monto'
    ];

    public function empleado(){
        return $this->belongsTo(Empleado::class);
    }

    public function cuenta(){
        return $this->belongsTo(Cuenta::class);
    }    

    public static function ultimosPagos($idEmpleado){
        $ultimo_pagos = Pago::select(
            'pagos.id as idPago','pagos.cuenta_id','pagos.empleado_id','pagos.is_pago','pagos.code','pagos.observacion','pagos.monto','pagos.updated_at as datePago',
            'cuentas.id as idCuenta','cuentas.nro','cuentas.titular','cuentas.telefono','cuentas.cedula','cuentas.empleado_id','cuentas.tipo_id','cuentas.tipo_banco'
            )
            ->join('cuentas','cuentas.id','=','pagos.cuenta_id')
            ->where('pagos.empleado_id',$idEmpleado)
            ->orderby('pagos.id','desc')
            ->limit(2)
            ->get();

        return $ultimo_pagos;
    }
}
