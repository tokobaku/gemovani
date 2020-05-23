<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

/**
 * Class ContactEmail
 * Email that will notify admin about sent messages
 */
class ContactEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @var string
     */
    public $email;

    /**
     * @var string
     */
    public $messageText;

    /**
     * Create a new message instance.
     * @param string $email
     * @param string $message
     */
    public function __construct(string $email, string $message)
    {
        $this->email = $email;
        $this->messageText = $message;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('email.contact')
            ->subject('New message from user');
    }
}
