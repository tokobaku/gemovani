<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\GraphQL\Queries;

use App\Config\Config as ConfigModel;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

/**
 * Class Config
 * Resolves config query in gql
 */
class Config
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
        $config = ConfigModel::keyValuePairs(array_merge([
            'title',
            'gemovani_logo',
            'gemovani_sound'
        ]));

        $config['about_us'] = array_map(function ($lang) {
            return [
                'locale' => $lang['code'],
                'content' => ConfigModel::get("about_us_{$lang['code']}")->value
            ];
        }, config('gemovani.languages'));

        return array_merge(
            [
                'title' => '',
                'gemovani_logo' => '',
                'about_us' => [
                    [
                        'locale' => 'en',
                        'content' => 'About us'
                    ]
                ],
                'gemovani_sound' => ''
            ],
            $config
        );
    }
}
