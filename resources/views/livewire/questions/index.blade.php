<?php

use Livewire\Volt\Component;
use App\Models\Quiz;

new class extends Component {
    public $quiz;

    public function mount($id)
    {
        // Eager load the relationships
        $this->quiz = Quiz::find($id);
    }

    public function with(): array
    {
        return [
            'questions' => $this->quiz->questions,
        ];
    }
}; ?>

<div>
<!-- HEADER -->
    <x-header title="{{ $quiz->title }}" separator progress-indicator>
        <x-slot:middle class="!justify-end">
            <x-input placeholder="Search..." wire:model.live.debounce="search" clearable icon="o-magnifying-glass" />
        </x-slot:middle>
        <x-slot:actions>
            <x-button label="Filters" @click="$wire.drawer = true" responsive icon="o-funnel" />
        </x-slot:actions>
    </x-header>

    @foreach ($questions as $question)
        <x-card title="{{ $question->question_text }}" shadow separator class="mb-4">
            @foreach ($question->choices as $choice)
                <x-list-item :item="$choice" no-separator>
                        <x-slot:avatar>
                            <x-badge value="{{ $choice->choice_letter }}" class="badge-soft {{ $choice->choice_letter === $question->correct_answer ? 'badge-success' : 'badge-error'}}" />
                        </x-slot:avatar>
                    <x-slot:value>
                        {{ $choice->choice_text }}
                    </x-slot:value>
                </x-list-item>
            @endforeach
        </x-card>
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
