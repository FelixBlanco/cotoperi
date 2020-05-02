<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cuenta extends Model
{
    use SoftDeletes;
    
    protected $fillable = ['nro','titular','telefono','cedula','empleado_id','tipo_id','tipo_banco'];
    
    public function cuentas(){
        return $this->hasMany(Pago::class);
    }    
}