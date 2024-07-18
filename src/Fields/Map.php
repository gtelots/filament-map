<?php

namespace LaraGIS\FilamentMap\Fields;

use Closure;
use Exception;
use Filament\Forms\Components\Field;
use LaraGIS\FilamentMap\Helpers\FieldHelper;

class Map extends Field
{
    protected string $view = 'filament-map::fields.filament-map';

    protected Closure|string $height = '350px';

    protected int $precision = 8;

    protected array|Closure|null $defaultCenter = null;

    protected Closure|int|null $defaultZoom = null;

    protected Closure|string|null $longitudeField = null;

    protected Closure|string|null $latitudeField = null;

    protected Closure|string|null $drawField = null;

    protected Closure|string|null $geomType = null;

    protected Closure|bool $geolocateOnLoad = false;

    protected Closure|bool $geolocateOnLoadAlways = false;

    protected Closure|bool $zoomToFeature = true;

    protected Closure|array $baseLayers = [];

    protected Closure|array $layers = [];

    public array $controls = [];

    /**
     * Main field config variables
     */
    private array $mapConfig = [];

    /**
     * MapOptions: https://leafletjs.com/reference.html#map-option
     */
    protected Closure|array $mapOptions = [];

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

    public function height(Closure|string $height): static
    {
        $this->height = $height;

        return $this;
    }

    public function getHeight(): string
    {
        return $this->evaluate($this->height);
    }

    public function latitudeField(Closure|string|null $latitudeField = null): static
    {
        $this->latitudeField = $latitudeField;

        return $this;
    }

    public function defaultCenter(Closure|array $location): static
    {
        $this->defaultCenter = $location;

        return $this;
    }

    public function getDefaultCenter(): array
    {
        $position = $this->evaluate($this->defaultCenter);

        if(is_array($position)) return $position;

        return config('filament-map.config.mapOptions.center', [0, 0]);
    }

    public function defaultZoom(Closure|int|null $defaultZoom): static
    {
        $this->defaultZoom = $defaultZoom;

        return $this;
    }

    public function getDefaultZoom(): int|null
    {
        $zoom = $this->evaluate($this->defaultZoom);

        if(is_numeric($zoom) && $zoom >= 0) return $zoom;

        return config('filament-map.config.mapOptions.zoom') ?? 0;
    }

    public function getLatitudeField(): ?string
    {
        $latitudeField = $this->evaluate($this->latitudeField);

        if ($latitudeField) {
            return FieldHelper::getFieldId($latitudeField, $this);
        }

        return null;
    }

    public function longitudeField(Closure|string|null $longitudeField = null): static
    {
        $this->longitudeField = $longitudeField;

        return $this;
    }

    public function getLongitudeField(): ?string
    {
        $longitudeField = $this->evaluate($this->longitudeField);

        if ($longitudeField) {
            return FieldHelper::getFieldId($longitudeField, $this);
        }

        return null;
    }

    /**
     * Form field to update with GeoJSON (ish) representing draw coordinates
     *
     * @return $this
     */
    public function drawField(Closure|string|null $drawField = null): static
    {
        $this->drawField = $drawField;

        return $this;
    }

    public function getDrawField(): ?string
    {
        $drawField = $this->evaluate($this->drawField);

        if ($drawField) {
            return FieldHelper::getFieldId($drawField, $this);
        }

        return null;
    }

    public function geomType(Closure|string|null $geomType): static
    {
        $this->geomType = $geomType;

        return $this;
    }

    public function getGeomType(): string|null
    {

        return $this->evaluate($this->geomType);
    }

    public function geolocateOnLoad(Closure|bool $geolocateOnLoad = true, Closure|bool $always = false): static
    {
        $this->geolocateOnLoad = $geolocateOnLoad;
        $this->geolocateOnLoadAlways = $always;

        return $this;
    }

    public function getGeolocateOnLoad(): ?bool
    {
        if ($this->evaluate($this->geolocateOnLoad)) {
            $always = $this->evaluate($this->geolocateOnLoadAlways);
            $state = parent::getState();

            if ($always || is_null($state)) {
                return true;
            }
        }

        return false;
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

    public function mapOptions(Closure|array $mapOptions): static
    {
        $this->mapOptions = $mapOptions;

        return $this;
    }

    public function getMapOptions(): ?array
    {
        return $this->evaluate($this->mapOptions);
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

    public function getState(): mixed
    {
        $state = parent::getState();

        if (is_array($state)) {
            return $state;
        } else {
            try {
                return @json_decode($state, true, 512, JSON_THROW_ON_ERROR);
            } catch (Exception $e) {
                return null;
            }
        }
    }

    public function baseLayers(Closure|array $layers): static
    {
        $this->baseLayers = $layers;

        return $this;
    }

    public function getBaseLayers(): array
    {
        $baseLayers = $this->evaluate($this->baseLayers);

        return empty($baseLayers) ? config('filament-map.config.baseLayers', []) : [];
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
        $controlCases = config('filament-map.config.controlCases.MapField', []);
        return array_merge(config('filament-map.config.controls', []), $controlCases, $this->evaluate($this->controls));
    }

    /**
     * Create json configuration string
     */
    public function getMapConfig(): string
    {
        $config = array_merge($this->mapConfig, [
            'statePath' => $this->getStatePath(),
            'defaultCenter' => $this->getDefaultCenter(),
            'defaultZoom' => $this->getDefaultZoom(),
            'latitudeField' => $this->getLatitudeField(),
            'longitudeField' => $this->getLongitudeField(),
            'drawField' => $this->getDrawField(),
            'geomType' => $this->getGeomType(),
            'geolocateOnLoad' => $this->getGeolocateOnLoad(),
            'zoomToFeature' => $this->getZoomToFeature(),
            'mapOptions' => $this->getMapOptions(),
            'markerOptions' => $this->getMarkerOptions(),
            'circleOptions' => $this->getCircleOptions(),
            'polylineOptions' => $this->getPolylineOptions(),
            'polygonOptions' => $this->getPolygonOptions(),
            'rectangleOptions' => $this->getRectangeOptions(),
            'baseLayers' => $this->getBaseLayers(),
            'layers' => $this->getLayers(),
            'controls' => $this->getControls(),
        ]);

        return json_encode($config);
    }
}
