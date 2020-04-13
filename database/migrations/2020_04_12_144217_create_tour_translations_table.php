<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Class CreateTourTranslationsTable
 * Creates table for TourTranslation entity
 * @see \App\TourTranslation
 */
class CreateTourTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tour_translations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('tour_id')->nullable(false)->unsigned();
            $table->string('locale')->nullable(false);
            $table->string('title')->nullable(false);
            $table->text('description')->nullable(false);
            $table->timestamps();

            $table->unique(['tour_id', 'locale']);
            $table->foreign('tour_id')
                ->references('id')
                ->on('tours')
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
        Schema::dropIfExists('tour_translations');
    }
}
