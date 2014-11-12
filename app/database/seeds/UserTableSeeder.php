<?php

class UserTableSeeder extends Seeder {

	public function run()
	{
		// Uncomment the below to wipe the table clean before populating
		DB::table('users')->truncate();

		$agents = array(

			array('email'=>'adam@smallcomb.me', 'password'=>Hash::make('chmasa21'), 'username'=>'cloverstone', 'created_at' => new DateTime,'updated_at' => new DateTime)
		);

		// Uncomment the below to run the seeder
		DB::table('users')->insert($agents);


	}

}
