<?php

namespace LaraGIS\FilamentMap\Widgets;
use Filament\Actions\Action;
use Filament\Actions\Concerns\InteractsWithActions;
use Filament\Actions\Contracts\HasActions;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Support\Contracts\TranslatableContentDriver;
use Filament\Widgets;

class MapWidget extends Widgets\Widget implements HasActions, HasForms
{
    use InteractsWithActions;
    use InteractsWithForms;
    use Widgets\Concerns\CanPoll;

    protected static string $view = 'filament-map::widgets.filament-map-widget';
}
