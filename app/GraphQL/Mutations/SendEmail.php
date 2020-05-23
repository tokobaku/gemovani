<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\GraphQL\Mutations;

use App\Mail\ContactEmail;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\Mail;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

/**
 * Class Config
 * Resolves config query in gql
 */
class SendEmail
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
        Mail::to('tokobakuradze@gmail.com')
            ->send(new ContactEmail($args['email'], $args['message']));

        return [
            'result' => 'SUCCESS',
        ];
    }
}
