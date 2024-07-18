<?php

namespace LaraGIS\FilamentMap\Infolists;

use Closure;
use Filament\Infolists\Components\Entry;
use LaraGIS\FilamentMap\Concerns\HasMap;

class MapEntry extends Entry
{

    protected string $view = 'filament-map::infolists.filament-map-entry';

    protected Closure|string $height = '350px';

    protected Closure|bool $zoomToFeature = true;

    protected Closure|array $baseLayers = [];

    protected Closure|array $layers = [];

    public array $controls = [];

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

    public function zoomToFeature(Closure|bool $bool = true): static
    {
        $this->zoomToFeature = $bool;

        return $this;
    }

    public function getZoomToFeature(): bool
    {
        return $this->evaluate($this->zoomToFeature);
    }

    public function baseLayers(Closure|array $layers): static
    {
        $this->baseLayers = $layers;

        return $this;
    }

    public function getBaseLayers(): array
    {
        $baseLayers = $this->evaluate($this->baseLayers);

        return empty($baseLayers) ? config('filament-map.config.baseLayers', []) : $baseLayers;
    }

    public function layers(Closure|array $layers): static
    {
        $this->layers = $layers;

        return $this;
    }

    public function getLayers(): array
    {
        $layers = $this->evaluate($this->layers);

        return empty($layers) ? config('filament-map.config.layers', []) : $layers;
    }

    public function controls(Closure|array $controls): static
    {
        $this->controls = $controls;

        return $this;
    }

    public function getControls(): array
    {
        $controlCases = config('filament-map.config.controlCases.MapEntry', []);
        return array_merge(config('filament-map.config.controls', []), $controlCases, $this->evaluate($this->controls));
    }

    /**
     * Create json configuration string
     */
    public function getMapConfig(): string
    {
        $config = array_merge($this->mapConfig, [
            'statePath' => $this->getStatePath(),
            'baseLayers' => $this->getBaseLayers(),
            'layers' => $this->getLayers(),
            'controls' => $this->getControls(),
            'zoomToFeature' => $this->getZoomToFeature(),
        ]);

        return json_encode($config);
    }

}
