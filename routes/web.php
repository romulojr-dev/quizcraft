<?php

use Livewire\Volt\Volt;

Volt::route('/', 'users.index');
Volt::route('/quiz/{id}', 'questions.index')->name('questions.index');
