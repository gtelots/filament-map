<?php

namespace LaraGIS\FilamentMap\Columns;

use Filament\Tables\Columns\Column;

class MapColumn extends Column
{
    protected string $view = 'filament-map::columns.filament-map-column';

    private array $mapConfig = [
        'defaultCenter' => [10.7578001, 106.6309967],
        'defaultZoom' => 8,
        'controls' => [],
        'baseLayers' => [],
        'layers' => [],
    ];

    /**
     * Create json configuration string
     */
    public function getMapConfig(): string
    {
        $config = array_merge($this->mapConfig, [

        ]);

        return json_encode($config);
    }
}
