<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Http\Controllers;

use App\Faq;
use App\Http\Requests\Admin\Faq\Store as FaqStore;
use Illuminate\Contracts\View\Factory;
use Illuminate\View\View;

/**
 * Class FaqController
 * Faq controller for Admin CRUD
 */
class FaqController extends Controller
{
    /**
     * @return Factory|View
     */
    public function index()
    {
        return view('admin.faqs.index', [
            'faqs' => Faq::all(),
            'locales' => config('gemovani.languages')
        ]);
    }

    public function store(FaqStore $faqStoreRequest)
    {
        $validated = $faqStoreRequest->validated();
        $faqs = Faq::all();

        foreach ($validated['translations'] as $faqData) {
            $faq = $faqs->where('locale', $faqData['locale'])->first() ?? new Faq();

            $faq->fill([
                'content' => $faqData['content'],
                'locale' => $faqData['locale']
            ]);

            $faq->save();
        }

        return redirect('/admin/faq')->with('messages', [
            [
                'message' => 'Successfully saved FAQs!',
                'type' => 'success'
            ]
        ]);
    }
}
