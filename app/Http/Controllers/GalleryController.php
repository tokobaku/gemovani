<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Http\Controllers;

use App\Gallery\Gallery;
use App\Http\Requests\Admin\Gallery\Store as StoreGallery;
use App\Http\Requests\Admin\Gallery\Update as UpdateRequest;
use Exception;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\View\View;

/**
 * Class GalleryController
 * CRUD operations on gallery entity
 */
class GalleryController extends Controller
{
    /**
     * Display a listing of galleries.
     *
     * @return Factory|View
     */
    public function index()
    {
        return view('admin.galleries.index', [
            'galleries' => Gallery::all()
        ]);
    }

    /**
     * Show the form for creating a new gallery.
     *
     * @return Factory|View
     */
    public function create()
    {
        return view('admin.galleries.create');
    }

    /**
     * Store a newly created gallery.
     *
     * @param StoreGallery $request
     * @return RedirectResponse|Redirector
     */
    public function store(StoreGallery $request)
    {
        $validated = $request->validated();

        $gallery = new Gallery();
        $gallery->url_key = $validated['url_key'];
        $gallery->items = $validated['items'];
        $gallery->save();

        foreach ($validated['translations'] as $locale => $translation) {
            $gallery->translateOrNew($locale, $translation);
        }

        return redirect('/admin/galleries/')->with('messages', [
            [
                'type' => 'success',
                'message' => 'Successfully created gallery!'
            ]
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @return RedirectResponse|Redirector
     */
    public function show()
    {
        return redirect('/admin/galleries');
    }

    /**
     * Show the form for editing gallery.
     *
     * @param Gallery $gallery
     * @return Factory|View
     */
    public function edit(Gallery $gallery)
    {
        return view('admin.galleries.edit', [
            'gallery' => $gallery
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateRequest $request
     * @param Gallery $gallery
     * @return RedirectResponse|Redirector
     * @throws Exception
     */
    public function update(UpdateRequest $request, Gallery $gallery)
    {
        $validated = $request->validated();
        $gallery->url_key = $validated['url_key'];
        $gallery->save();

        $gallery->saveTranslations($validated['translations']);

        return redirect('admin/galleries')->with('messages', [
            [
                'type' => 'success',
                'message' => 'Successfully saved gallery'
            ]
        ]);
    }

    /**
     * Remove the specified gallery.
     *
     * @param Gallery $gallery
     * @return RedirectResponse|Redirector
     * @throws Exception
     */
    public function destroy(Gallery $gallery)
    {
        $gallery->delete();

        return redirect('/admin/galleries');
    }

    public function massDelete(Request $request)
    {
        $entityIds = json_decode($request->get('entities'));
        Gallery::whereIn('id', $entityIds)->delete();

        return redirect('/admin/galleries')->with('messages', [
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
