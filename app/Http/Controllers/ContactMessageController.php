<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Http\Controllers;

use App\ContactMessage;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\View\View;
use DateTime;

/**
 * Class ContactMessageController
 * CRUD for user messages
 */
class ContactMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Application|Factory|View
     */
    public function index()
    {
        return view('admin.messages.index', [
            'messages' => ContactMessage::orderByDesc('created_at')->simplePaginate(20)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Application|RedirectResponse|Redirector
     */
    public function create()
    {
        return redirect('/admin/messages')->with('messages', [
            [
                'type' => 'error',
                'message' => 'Url does not exist'
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Application|RedirectResponse|Redirector
     */
    public function store()
    {
        return redirect('/admin/messages')->with('messages', [
            [
                'type' => 'error',
                'message' => 'Url does not exist'
            ]
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param int $message
     * @return Application|Factory|View
     */
    public function show(int $message)
    {
        $contactMessage = ContactMessage::findOrFail($message);
        $contactMessage->seen_at = new DateTime();
        $contactMessage->save();

        return view('admin.messages.show', [
            'message' => $contactMessage
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return Application|RedirectResponse|Redirector
     */
    public function edit()
    {
        return redirect('/admin/messages')->with('messages', [
            [
                'type' => 'error',
                'message' => 'Url does not exist'
            ]
        ]);
    }

    /**
     * @return Application|RedirectResponse|Redirector
     */
    public function update()
    {
        return redirect('/admin/messages')->with('messages', [
            [
                'type' => 'error',
                'message' => 'Url does not exist'
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return Application|RedirectResponse|Redirector
     */
    public function destroy()
    {
        return redirect('/admin/messages')->with('messages', [
            [
                'type' => 'error',
                'message' => 'Url does not exist'
            ]
        ]);
    }

    public function massDelete(Request $request)
    {
        $entityIds = json_decode($request->get('entities'));
        ContactMessage::whereIn('id', $entityIds)->delete();

        return redirect('/admin/messages')->with('messages', [
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
