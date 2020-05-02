<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

use Illuminate\Database\Seeder;

/**
 * Class UsersTableSeeder
 */
class AddTinaAsUser extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Tina Nadare',
            'email' => 'tinanadare@yahoo.com',
            'password' => Hash::make('password')
        ]);
    }
}
