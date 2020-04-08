<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Http\Controllers;

/**
 * Class FilesController
 * Handles routes under admin/files
 */
class FilesController extends Controller
{
    public function index()
    {
        return view('admin.files.index');
    }
}
