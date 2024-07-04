<?php

namespace LaraGIS\FilamentMap\Infolists;

use Closure;
use Filament\Infolists\Components\Entry;
use LaraGIS\FilamentMap\Concerns\HasMap;

class MapEntry extends Entry
{

    protected string $view = 'filament-map::infolists.filament-map-entry';

    protected Closure|string $height = '350px';

    /**
     * Main field config variables
     */
    private array $mapConfig = [
        'statePath' => '',
        'defaultCenter' => [10.7578001, 106.6309967],
        'defaultZoom' => 8,
        'controls' => [],
        'layers' => [],

    ];

    public function height(Closure|string $height): static
    {
        $this->height = $height;

        return $this;
    }

    public function getHeight(): string
    {
        return $this->evaluate($this->height);
    }

    /**
     * Create json configuration string
     */
    public function getMapConfig(): string
    {
        $config = array_merge($this->mapConfig, [
            'statePath'       => $this->getStatePath(),
        ]);

        return json_encode($config);
    }

}
