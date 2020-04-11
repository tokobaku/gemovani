<?php
/**
 * @author Tornkie Bakuradze <tokobakuradze@gmail.com>
 */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Class CreateGalleriesTable
 * Creates galleries table for App\Gallery\Gallery model
 * @see \App\Gallery\Gallery
 */
class CreateGalleriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('galleries', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('url_key')->nullable(false);
            $table->text('items')->nullable(false);
            $table->timestamps();

            $table->unique('url_key');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('galleries');
    }
}
