<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use DateTime;

/**
 * Class ContactMessage
 * Model for clients contact message
 * @property DateTime $seen_at
 * @property string $email
 * @property string $message
 * @property DateTime $created_at
 * @method static whereNull(string $string)
 */
class ContactMessage extends Model
{
    /**
     * @inheritDoc
     */
    protected $fillable = [
        'seen_at',
        'email',
        'message'
    ];

    /**
     * @return ContactMessage[]|Collection
     */
    public static function getNotSeenMessages()
    {
        return ContactMessage::whereNull('seen_at')->get();
    }

    /**
     * Returns message in a short form
     * @param int $maxLength
     * @return string
     */
    public function getShortMessage(int $maxLength = 100): string
    {
        if (strlen($this->message) > $maxLength) {
            return sprintf("%s...", substr($this->message, 0, $maxLength));
        }

        return $this->message;
    }
}
