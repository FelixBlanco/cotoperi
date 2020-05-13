<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Empleado extends Model
{
    use SoftDeletes;
    
    protected $fillable = [ 'username', 'ubicacion','user_id'];


    public function pagos(){
        return $this->hasMany(Pago::class);
    }
}
