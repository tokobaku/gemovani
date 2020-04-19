<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Class CreateLocationTranslationsTable
 * Creates table for LocationTranslation entity
 * @see \App\Location\LocationTranslation
 */
class CreateLocationTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('location_translations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('locale')->nullable(false);
            $table->bigInteger('location_id')->unsigned()->nullable(false);
            $table->string('title');
            $table->text('description');
            $table->timestamps();

            $table->unique(['locale', 'location_id']);
            $table->foreign('location_id')
                ->references('id')
                ->on('locations')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('location_translations');
    }
}
