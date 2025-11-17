<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'lecture_note_id',
        'title',
        'prompt_used',
        'ai_response',
    ];

    public function lectureNote()
    {
        return $this->belongsTo(LectureNote::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
