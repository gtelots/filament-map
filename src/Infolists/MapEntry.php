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

    /**
     * MarkerOptions: https://leafletjs.com/reference.html#marker-option
     */
    protected Closure|array $markerOptions = [];

    /**
     * CircleOptions: https://leafletjs.com/reference.html#circle-option
     */
    protected Closure|array $circleOptions = [];

    /**
     * PolylineOptions: https://leafletjs.com/reference.html#polyline-option
     */
    protected Closure|array $polylineOptions = [];

    /**
     * PathOptions: https://leafletjs.com/reference.html#map-option
     */
    protected Closure|array $polygonOptions = [];

    /**
     * PathOptions: https://leafletjs.com/reference.html#map-option
     */
    protected Closure|array $rectangleOptions = [];

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

    public function markerOptions(Closure|array $markerOptions): static
    {
        $this->markerOptions = $markerOptions;

        return $this;
    }

    public function getMarkerOptions(): ?array
    {
        return empty($this->markerOptions) ? config('filament-map.config.markerOptions', []) :$this->evaluate($this->markerOptions);
    }

    public function circleOptions(Closure|array $circleOptions): static
    {
        $this->circleOptions = $circleOptions;

        return $this;
    }

    public function getCircleOptions(): ?array
    {
        return empty($this->circleOptions) ? config('filament-map.config.circleOptions', []) :$this->evaluate($this->circleOptions);
    }

    public function polylineOptions(Closure|array $polylineOptions): static
    {
        $this->polylineOptions = $polylineOptions;

        return $this;
    }

    public function getPolylineOptions(): ?array
    {
        return empty($this->polylineOptions) ? config('filament-map.config.polylineOptions', []) :$this->evaluate($this->polylineOptions);
    }

    public function polygonOptions(Closure|array $polygonOptions): static
    {
        $this->polygonOptions = $polygonOptions;

        return $this;
    }

    public function getPolygonOptions(): ?array
    {
        return empty($this->polygonOptions) ? config('filament-map.config.polygonOptions', []) :$this->evaluate($this->polygonOptions);
    }

    public function rectangleOptions(Closure|array $rectangleOptions): static
    {
        $this->rectangleOptions = $rectangleOptions;

        return $this;
    }

    public function getRectangeOptions(): ?array
    {
        return empty($this->rectangleOptions) ? config('filament-map.config.rectangleOptions', []) :$this->evaluate($this->rectangleOptions);
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
