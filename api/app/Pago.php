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
}
