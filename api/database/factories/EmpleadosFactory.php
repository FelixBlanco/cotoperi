<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(App\Empleado::class, function (Faker $faker) {
    return [
        'username' => $faker->name, 
        'ubicacion' => 'Monagas',
        'user_id' => '1'
    ];
});
