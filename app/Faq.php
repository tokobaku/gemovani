<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Faq
 * Model for Frequently Asked Questions
 * @property string locale
 * @property string content
 * @property string id
 */
class Faq extends Model
{
    protected $fillable = [
        'locale',
        'content'
    ];
}
