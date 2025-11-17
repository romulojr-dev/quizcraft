<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LectureNote extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'file_path',
        'extracted_text',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }
}
