<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Class CreateSlideTranslationsTable
 * Creates table for SlideTranslation
 * @see \App\Slide\SlideTranslation
 */
class CreateSlideTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('slide_translations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('slide_id')->unsigned()->nullable(false);
            $table->string('locale')->nullable(false);
            $table->text('content')->nullable(true);
            $table->timestamps();

            $table->unique(['slide_id', 'locale']);
            $table->foreign('slide_id')
                ->references('id')
                ->on('slides')
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
        Schema::dropIfExists('slide_translations');
    }
}
