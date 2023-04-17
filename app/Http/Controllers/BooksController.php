<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;

class BooksController extends Controller
{
	public function show(Request $request)
	{
        $booksPerPage = 20;
        $currentPage = (int)$request->query('page', 1);
        $offset = (int)$request->query('offset', 0);
        $startLimit = ($currentPage - 1) * $booksPerPage + $offset;
        $books = Book::select('rowid AS id', 'title as name', 'author', 'timestamp')
        ->orderBy('rowid', 'desc')
        ->skip($startLimit)
        ->take($booksPerPage)
        ->get()
        ->toArray();

        return response()->json($books, 200);
	}

	public function store(Request $request)
	{
        if ($request->missing('title')) {
            abort(400, 'Missing book title');
        }
        $title = $request->input('title');
        if (strlen($title) === 0) {
            abort(400, 'Book title cannot be empty');
        }
        $author = $request->input('author', '');
        if (strlen($author) === 0) {
            $author = NULL;
        }
	    $book = Book::create([
            'title' => $title,
            'author' => $author,
            'timestamp' => date('Y-m-d\TH:i:sp')
        ]);

	    return response()->json([
            'message' => "{$title} added successfully!",
            'data' => $book
        ], 201);
	}

	public function delete(string $id)
	{
	    $deleted = Book::where('rowid', (int)$id)->delete();
        
	    return response()->json(null, 204);
	}
}
