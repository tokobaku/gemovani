<?php
/**
 * @author Tornkie Bakuradze <tokobakuradze@gmail.com>
 */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Class CreateGalleriesTable
 * Creates gallery_translations table for App\Gallery\GalleryTranslation model
 * @see \App\Gallery\GalleryTranslation
 */
class CreateGalleryTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gallery_translations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('locale')->nullable(false);
            $table->bigInteger('gallery_id')->unsigned()->nullable(false);
            $table->string('title')->nullable(false);
            $table->text('description')->nullable(true);
            $table->timestamps();

            $table->unique(['gallery_id', 'locale']);
            $table->foreign('gallery_id')
                ->references('id')
                ->on('galleries')
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
        Schema::dropIfExists('gallery_translations');
    }
}
