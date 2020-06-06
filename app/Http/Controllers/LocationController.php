<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Http\Controllers;

use App\Http\Requests\Admin\Location\Store as StoreLocation;
use App\Http\Requests\Admin\Location\Update as UpdateLocation;
use App\Location\Location;
use Exception;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\View\View;

/**
 * Class LocationController
 * For CRUD operations of Location entity
 * @see Location
 */
class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Factory|View
     */
    public function index()
    {
        return view('admin.locations.index', [
            'locations' => Location::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Factory|View
     */
    public function create()
    {
        return view('admin.locations.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreLocation $request
     * @return RedirectResponse|Redirector
     * @throws Exception
     */
    public function store(StoreLocation $request)
    {
        $validated = $request->validated();
        $location = new Location();

        $location->fill([
            'url_key' => $validated['url_key'],
            'longitude' => $validated['longitude'],
            'latitude' => $validated['latitude'],
            'cover_image' => $validated['cover_image'],
        ])
        ->save();

        $location->saveTranslations($validated['translations']);

        return redirect('/admin/locations')->with('messages', [
            [
                'message' => 'Successfully saved location',
                'type' => 'success'
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  Location  $location
     * @return Factory|View
     */
    public function edit(Location $location)
    {
        return view('admin.locations.edit', [
            'location' => $location
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateLocation $request
     * @param Location $location
     * @return RedirectResponse|Redirector
     * @throws Exception
     */
    public function update(UpdateLocation $request, Location $location)
    {
        $validated = $request->validated();

        $location->fill([
            'url_key' => $validated['url_key'],
            'longitude' => $validated['longitude'],
            'latitude' => $validated['latitude'],
            'cover_image' => $validated['cover_image'],
        ])
        ->save();

        $location->saveTranslations($validated['translations']);

        return redirect('/admin/locations')->with('messages', [
            [
                'message' => 'Successfully updated location',
                'type' => 'success'
            ]
        ]);
    }

    /**
     * @param Request $request
     * @return RedirectResponse|Redirector
     */
    public function massDelete(Request $request)
    {
        $entityIds = json_decode($request->get('entities'));
        Location::whereIn('id', $entityIds)->delete();

        return redirect('/admin/locations')->with('messages', [
            [
                'type' => 'success',
                'message' => sprintf(
                    'Successfully removed %s %s',
                    count($entityIds),
                    count($entityIds) === 1 ? 'item' : 'items'
                )
            ]
        ]);
    }
}
