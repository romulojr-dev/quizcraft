<?php

use App\Models\User;
use App\Models\Quiz;
use App\Models\LectureNote;
use Illuminate\Support\Collection;
use Livewire\Volt\Component;
use Mary\Traits\Toast;
use Livewire\WithFileUploads;
use OpenAI\Laravel\Facades\OpenAI;

new class extends Component {
    use Toast;
    use WithFileUploads;

    public string $search = '';
    public string $title = '';

    public bool $drawer = false;

    public array $sortBy = ['column' => 'name', 'direction' => 'asc'];

    public $file;
    public $lectureNote;

    public $response;

    public function generateQuiz($content){
        $prompt = "
            You are an intelligent quiz generator.

            Based on the following lecture notes, generate a multiple-choice quiz. Follow these rules:

            - Generate maximum of 5 questions.
            - Each question should have 4 choices labeled A, B, C, and D.
            - Only one correct answer per question.
            - Indicate the correct answer clearly after each question.
            - Focus on definition-based and conceptual questions.
            - Use only information from the text.

            Lecture Notes:
            \"\"\"
            {$content}
            \"\"\"

            Output Format (exactly like this, replace the square brackets with actual content and please print the three asterisk after):
                Q1. [Question text] | A. [Option A] | B. [Option B] | C. [Option C] | D. [Option D] | Answer: [Correct letter] |
                Q2. [Question text] | A. [Option A] | B. [Option B] | C. [Option C] | D. [Option D] | Answer: [Correct letter] |
                Q3. [Question text] | A. [Option A] | B. [Option B] | C. [Option C] | D. [Option D] | Answer: [Correct letter] |
        ";


        // $response = OpenAI::responses()->create([
        //     'model' => 'gpt-3.5-turbo',
        //     'input' => $prompt,
        // ]);

        $response = "
            Q1. What type of machine learning involves the use of labeled data for training? | A. Supervised Learning | B. Unsupervised Learning | C. Reinforcement Learning | D. None of the above | Answer: A | Q2. Which term describes the situation when a model performs well on training data but poorly on unseen data? | A. Overfitting | B. Underfitting | C. Training set | D. Test set | Answer: A | Q3. In machine learning, what type of learning involves an agent learning to make decisions based on rewards or penalties? | A. Supervised Learning | B. Unsupervised Learning | C. Reinforcement Learning | D. Clustering | Answer: C |
        ";

        $this->response = $response->outputText;

        $questions = [ ];
        $pointer = ['Q', 'A', 'B', 'C', 'D', 'A'];

        $cur = "";
        $idx = 0;
        for($i=0; $i<strlen($response);$i++){
            if($response[$i] == '|'){
                if($idx == 0){
                    $questions['q'] = $cur;
                    $questions['c'] = [];
                } else if($idx == 5){
                    $questions['a'] = $cur;
                } else {
                    $questions['c'][$pointer[$idx]] = $cur;
                }

                $cur = "";
                $idx = ($idx + 1) % 6;
            } else {
                $cur .= $response[$i];
            }
        }

        // $quiz = Quiz::create([
        //     'title' => $this->title,
        //     'description' => 'Generated from uploaded lecture notes.',
        //     'lecture_note_id' => $this->lectureNote,
        // ]);


        $this->reset('file');
    }

    public function uploadLectureNotes()
    {
        $this->validate([
            'file' => 'required|file|mimes:pdf,doc,docx,txt|max:10240', // allow txt files
        ]);

        // Use original filename (without extension) as title
        $originalName = pathinfo($this->file->getClientOriginalName(), PATHINFO_FILENAME);

        // Generate a unique filename to store
        $filename = Str::random(10) . '_' . $this->file->getClientOriginalName();

        // Store the file in public storage
        $path = $this->file->storeAs('lecture_notes', $filename, 'public');

        $content = file_get_contents($this->file->getRealPath());

        $lectureNote = LectureNote::create([
            'title' => $originalName, // use filename as title
            'file_path' => $path,
        ]);

        $this->lectureNote = $lectureNote->id;
        $this->title = $originalName;

        $this->generateQuiz($content);
    }

    // Clear filters
    public function clear(): void
    {
        $this->reset();
        $this->success('Filters cleared.', position: 'toast-bottom');
    }

    // Delete action
    public function delete($id): void
    {
        $this->warning("Will delete #$id", 'It is fake.', position: 'toast-bottom');
    }

    public function with(): array
    {
        return [
            'quizzes' => Quiz::latest()->get(),
        ];
    }
}; ?>

<div>
    <!-- HEADER -->
    <x-header title="Hello, Juan Dela Cruz" separator progress-indicator>
        <x-slot:middle class="!justify-end">
            <x-input placeholder="Search..." wire:model.live.debounce="search" clearable icon="o-magnifying-glass" />
        </x-slot:middle>
        <x-slot:actions>
            <x-button label="Filters" @click="$wire.drawer = true" responsive icon="o-funnel" />
        </x-slot:actions>
    </x-header>

    <div>
        {{ $response ?? 'No response yet.' }}
    </div>


    <div class="w-1/4 mb-4 mx-auto">
        <form wire:submit.prevent="uploadLectureNotes" enctype="multipart/form-data">
            <x-file wire:model="file" label="Upload File" hint="PDF, TXT, DOCX"/>
            <x-button class="bg-primary" type="submit" label="CRAFT QUIZ" spinner />
        </form>
    </div>
    <!-- LIST  -->
    @foreach($quizzes as $quiz)
        <x-list-item :item="$quiz" link="{{ route('questions.index', $quiz->id) }}" class="hover:bg-primary">
            <x-slot:value>
                {{ $quiz->title }}
            </x-slot:value>
            <x-slot:sub-value>
                {{ $quiz->lectureNote->title ?? 'No Lecture Note' }}
            </x-slot:sub-value>
            <x-slot:actions>
                <x-button icon="o-trash" class="btn-sm" wire:click="delete(1)" spinner />
            </x-slot:actions>
        </x-list-item>
    @endforeach


    <!-- FILTER DRAWER -->
    <x-drawer wire:model="drawer" title="Filters" right separator with-close-button class="lg:w-1/3">
        <x-input placeholder="Search..." wire:model.live.debounce="search" icon="o-magnifying-glass" @keydown.enter="$wire.drawer = false" />

        <x-slot:actions>
            <x-button label="Reset" icon="o-x-mark" wire:click="clear" spinner />
            <x-button label="Done" icon="o-check" class="btn-primary" @click="$wire.drawer = false" />
        </x-slot:actions>
    </x-drawer>
</div>
