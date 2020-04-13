<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Http\Controllers;

use App\Http\Requests\Admin\Tour\Store as StoreTour;
use App\Http\Requests\Admin\Tour\Update as UpdateTour;
use App\Tour\Tour;
use Exception;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use Illuminate\View\View;
use Illuminate\Http\Request;

/**
 * Class TourController
 * For CRUD operation in admin panel
 */
class TourController extends Controller
{
    /**
     * Display a listing of tours.
     *
     * @return Factory|View
     */
    public function index()
    {
        return view('admin.tours.index', [
            'tours' => Tour::all()
        ]);
    }

    /**
     * Show the form for creating a tour.
     *
     * @return Factory|View
     */
    public function create()
    {
        return view('admin.tours.create');
    }

    /**
     * Store a newly created tour in db.
     *
     * @param StoreTour $request
     * @return RedirectResponse|Redirector
     * @throws Exception
     */
    public function store(StoreTour $request)
    {
        $validated = $request->validated();

        $tour = new Tour();
        $tour->fill([
            'url_key' => $validated['url_key'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'cover_image' => $validated['cover_image']
        ])->save();

        foreach ($validated['translations'] as $locale => $translation) {
            $tour->translateOrNew($locale, $translation);
        }

        return redirect('/admin/tours')->with('messages', [
            [
                'message' => 'Successfully created message',
                'type' => 'success'
            ]
        ]);
    }

    /**
     * Show the form for editing the specified tour.
     *
     * @param Tour $tour
     * @return Factory|View
     */
    public function edit(Tour $tour)
    {
        return view('admin.tours.edit', [
            'tour' => $tour
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateTour $request
     * @param Tour $tour
     * @return RedirectResponse|Redirector
     * @throws Exception
     */
    public function update(UpdateTour $request, Tour $tour)
    {
        $validated = $request->validated();

        $tour->fill([
            'url_key' => $validated['url_key'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'cover_image' => $validated['cover_image']
        ])
        ->save();
        $tour->saveTranslations($validated['translations']);

        return redirect('/admin/tours')->with('messages', [
            [
                'message' => 'Successfully updated messages',
                'type' => 'success'
            ]
        ]);
    }

    /**
     * Remove the specified tour from db.
     *
     * @param Tour $tour
     * @return RedirectResponse|Redirector
     * @throws Exception
     */
    public function destroy(Tour $tour)
    {
        $tour->delete();

        return redirect('/admin/tours');
    }

    /**
     * @param Request $request
     * @return RedirectResponse|Redirector
     */
    public function massDelete(Request $request)
    {
        $entityIds = json_decode($request->get('entities'));
        Tour::whereIn('id', $entityIds)->delete();

        return redirect('/admin/tours')->with('messages', [
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
