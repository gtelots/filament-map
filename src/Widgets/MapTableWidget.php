<?php

namespace LaraGIS\FilamentMap\Widgets;
use Filament\Tables;

class MapTableWidget extends MapWidget implements Tables\Contracts\HasTable
{
    use Tables\Concerns\InteractsWithTable {
        getTableRecords as traitGetTableRecords;
    }

    protected static string $view = 'filament-map::widgets.filament-map-table-widget';
}
