<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmpleadosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Empleado::class,20)->create();   
    }
}
