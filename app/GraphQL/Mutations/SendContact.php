<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\GraphQL\Mutations;

use App\ContactMessage;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

/**
 * Class Config
 * Resolves config query in gql
 */
class SendContact
{
    /**
     * Return a value for the field.
     *
     * @param  null  $rootValue
     * @param  mixed[]  $args
     * @param GraphQLContext $context
     * @param ResolveInfo $resolveInfo
     * @return mixed
     */
    public function __invoke($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $contactMessage = new ContactMessage();
        $contactMessage->message = $args['message'];
        $contactMessage->email = $args['email'];
        $contactMessage->save();

        return [
            'result' => 'SUCCESS',
        ];
    }
}
