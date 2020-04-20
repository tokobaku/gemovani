<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Http\Controllers;

use App\Http\Requests\Admin\Slide\Store as StoreSlide;
use App\Http\Requests\Admin\Slide\Update as SlideUpdate;
use App\Slide\Slide;
use Exception;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\View\View;

/**
 * Class SlideController
 * For CRUD operations on slide entity
 */
class SlideController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Application|Factory|View
     */
    public function index()
    {
        return view('admin.slides.index', [
            'slides' => Slide::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Application|Factory|View
     */
    public function create()
    {
        return view('admin.slides.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreSlide $request
     * @return Application|RedirectResponse|Redirector
     * @throws Exception
     */
    public function store(StoreSlide $request)
    {
        $validated = $request->validated();

        $slide = new Slide();
        $slide->fill([
            'image' => $validated['image']
        ])
        ->save();

        $slide->saveTranslations($validated['translations'] ?? []);

        return redirect('/admin/slides')->with('messages', [
            [
                'message' => 'Successfully created new slide',
                'type' => 'success'
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Slide $slide
     * @return Application|Factory|View
     */
    public function edit(Slide $slide)
    {
        return view('admin.slides.edit', [
            'slide' => $slide
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param SlideUpdate $request
     * @param Slide $slide
     * @return Application|RedirectResponse|Redirector
     * @throws Exception
     */
    public function update(SlideUpdate $request, Slide $slide)
    {
        $validated = $request->validated();

        $slide->fill([
            'image' => $validated['image']
        ]);

        $slide->saveTranslations($validated['translations']);

        return redirect('/admin/slides')->with('messages', [
            [
                'message' => 'Successfully updated slide',
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
        Slide::whereIn('id', $entityIds)->delete();

        return redirect('/admin/slides')->with('messages', [
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
