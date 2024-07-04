<?php

namespace LaraGIS\FilamentMap\Fields;

use Closure;
use Filament\Forms\Components\Field;
use LaraGIS\FilamentMap\Helpers\FieldHelper;

class Map extends Field
{
    protected string $view = 'filament-map::fields.filament-map';

    protected Closure|string $height = '350px';

    protected int $precision = 8;

    protected array|Closure|null $defaultCenter = [10.7578001, 106.6309967];

    protected Closure|int|null $defaultZoom = 8;

    protected Closure|string|null $geomType = null;

    protected Closure|bool $zoomToState = true;

    protected Closure|string|null $longitudeField = null;

    protected Closure|string|null $latitudeField = null;

    protected Closure|string|null $geoJsonField = null;

    protected Closure|string|null $geoJsonProperty = null;

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

    public array $controls = [
        'zoomControl' => true,
        'fullscreenControl' => true,
    ];

    protected Closure|array $baseLayers = [
        [
            'title' => 'GTEL OTS Basic',
            'url' => 'https://maps.ots.vn/api/v1/tiles/basic/{z}/{x}/{y}.png',
            'selected' => true,
            'attribution' => '&copy; <a href="https://www.google.com/maps">Google Maps</a>'
        ],
        [
            'title' => 'GTEL OTS Dark',
            'url' => 'https://maps.ots.vn/api/v1/tiles/dark/{z}/{x}/{y}.png',
            'attribution' => '&copy; <a href="https://www.google.com/maps">Google Maps</a>'
        ],
        [
            'title' => 'Google Streets',
            'url' => 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
            'attribution' => '&copy; <a href="https://www.google.com/maps">Google Maps</a>'
        ],
        [
            'title' => 'Google Satellite',
            'url' => 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
            'attribution' => '&copy; <a href="https://www.google.com/maps">Google Maps</a>'
        ],
    ];

    protected Closure|array $layers = [];

    /**
     * Main field config variables
     */
    private array $mapConfig = [
        'statePath'            => '',
        'defaultCenter'     => [ 10.7578001, 106.6309967 ],
        'defaultZoom'          => 8,
        'controls'       => [],
//        'drawingControl' => false,
//        'drawingModes'   => [
//            'marker'    => true,
//            'circle'    => true,
//            'rectangle' => true,
//            'polygon'   => true,
//            'polyline'  => true,
//        ],
//        'drawingField'         => null,
        'baseLayers'               => [],
        'layers'               => [],
//        'autocomplete'        => false,
//        'autocompleteReverse' => false,
//        'geolocate'           => false,
//        'geolocateOnLoad'     => false,
//        'geolocateLabel'      => '',
//        'reverseGeocodeFields' => [],
//        'debug'                => false,
//        'gmaps'                => '',
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
     * Set the default location for new maps, accepts an array of either [$lat, $lng] or ['lat' => $lat, 'lng' => $lng],
     * or a closure which returns this
     *
     *
     * @return $this
     */
    public function defaultCenter(Closure|array $location): static
    {
        $this->defaultCenter = $location;

        return $this;
    }

    public function getDefaultCenter(): array
    {
        $position = $this->evaluate($this->defaultCenter);

        if(is_array($position) && count($position) >= 2) return $position;

        return config('filament-map.map_options.center');
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

        return config('filament-map.map_options.zoom');
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

    public function zoomToState(Closure|bool $bool = true): static
    {
        $this->zoomToState = $bool;

        return $this;
    }

    public function getZoomToState(): bool
    {
        return $this->evaluate($this->zoomToState);
    }


    public function latitudeField(Closure|string|null $latitudeField = null): static
    {
        $this->latitudeField = $latitudeField;

        return $this;
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
     * This method allows you to record which polygon(s) from the GeoJSON layer the map marker is contained by.  The
     * $field arg is a field name on your form (which can be a Hidden field type).  Whenever the marker is moved, this field is
     * updated to show which polygons now contain the marker.  If no $property is given as the second argument, the data saved
     * in the field will be a GeoJSON FeatureCollection of the containing features.  If a $property is given, the data saved
     * will be a simple JSON array of that property's value from each of the containing polygons.  In both cases this will save
     * an empty collection/array if the marker is not within any polygon.
     *
     * @return $this
     */
    public function geoJsonField(Closure|string|null $field = null, Closure|string|null $property = null): static
    {
        $this->geoJsonField = $field;

        $this->geoJsonProperty = $property;

        return $this;
    }

    public function getGeoJsonField(): ?string
    {
        $jsonField = $this->evaluate($this->geoJsonField);

        if ($jsonField) {
            return FieldHelper::getFieldId($jsonField, $this);
        }

        return null;
    }

    public function getGeoJsonProperty(): ?string
    {
        return $this->evaluate($this->geoJsonProperty);
    }

    public function controls(Closure|array $controls): static
    {
        $this->controls = $controls;

        return $this;
    }

    public function getControls(): array
    {
        return $this->evaluate($this->controls);
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
        return $this->evaluate($this->markerOptions);
    }

    public function circleOptions(Closure|array $circleOptions): static
    {
        $this->circleOptions = $circleOptions;

        return $this;
    }

    public function getCircleOptions(): ?array
    {
        return $this->evaluate($this->circleOptions);
    }

    public function polylineOptions(Closure|array $polylineOptions): static
    {
        $this->polylineOptions = $polylineOptions;

        return $this;
    }


    public function getPolylineOptions(): ?array
    {
        return $this->evaluate($this->polylineOptions);
    }

    public function polygonOptions(Closure|array $polygonOptions): static
    {
        $this->polygonOptions = $polygonOptions;

        return $this;
    }

    public function getPolygonOptions(): ?array
    {
        return $this->evaluate($this->polygonOptions);
    }

    public function rectangleOptions(Closure|array $rectangleOptions): static
    {
        $this->rectangleOptions = $rectangleOptions;

        return $this;
    }

    public function getRectangeOptions(): ?array
    {
        return $this->evaluate($this->rectangleOptions);
    }

    public function baseLayers(Closure|array $layers): static
    {
        $this->baseLayers = $layers;

        return $this;
    }

    /**
     * @throws JsonException
     */
    public function getBaseLayers(): array
    {
        return $this->evaluate($this->baseLayers);
    }

    public function layers(Closure|array $layers): static
    {
        $this->layers = $layers;

        return $this;
    }

    /**
     * @throws JsonException
     */
    public function getLayers(): array
    {
        return $this->evaluate($this->layers);
    }

    protected function setUp(): void
    {
        parent::setUp();
    }


    /**
     * Create json configuration string
     */
    public function getMapConfig(): string
    {
        $config = array_merge($this->mapConfig, [
            'statePath'              => $this->getStatePath(),
//            'autocomplete'           => $this->getAutocompleteId(),
//            'types'                  => $this->getTypes(),
//            'countries'              => $this->getCountries(),
//            'placeField'             => $this->getPlaceField(),
//            'autocompleteReverse'    => $this->getAutocompleteReverse(),
//            'geolocate'              => $this->getGeolocate(),
//            'geolocateLabel'         => $this->getGeolocateLabel(),
//            'geolocateOnLoad'        => $this->getGeolocateOnLoad(),

            'defaultCenter'        => $this->getDefaultCenter(),
            'defaultZoom'            => $this->getDefaultZoom(),
            'geomType'            => $this->getGeomType(),
            'zoomToState'              => $this->getZoomToState(),
            'controls'               => $this->getControls(),
//            'drawingControl'         => $this->getDrawingControl(),
//            'drawingControlPosition' => $this->getDrawingControlPosition(),
//            'drawingModes'           => $this->getDrawingModes(),
//            'drawingField'           => $this->getDrawingField(),
            'baseLayers'                 => $this->getBaseLayers(),
            'layers'                 => $this->getLayers(),
//            'reverseGeocodeFields'   => $this->getReverseGeocode(),
//            'reverseGeocodeUsing'    => $this->getReverseGeocodeUsing(),
//            'placeUpdatedUsing'      => $this->getPlaceUpdatedUsing(),
//            'defaultZoom'            => $this->getDefaultZoom(),
//            'geoJson'                => $this->getGeoJsonFile(),
            'latitudeField'           => $this->getLatitudeField(),
            'longitudeField'           => $this->getLongitudeField(),
            'geoJsonField'           => $this->getGeoJsonField(),
            'geoJsonProperty'        => $this->getGeoJsonProperty(),
//            'geoJsonVisible'         => $this->getGeoJsonVisible(),
//            'debug'                  => $this->getDebug(),
//            'gmaps'                  => MapsHelper::mapsUrl(false, $this->getDrawingControl() ? ['drawing'] : []),
            'mapOptions'          => $this->getMapOptions(),
            'markerOptions'          => $this->getMarkerOptions(),
            'circleOptions'          => $this->getCircleOptions(),
            'polylineOptions'            => $this->getPolylineOptions(),
            'polygonOptions'            => $this->getPolygonOptions(),
            'rectangleOptions'       => $this->getRectangeOptions(),
        ]);

        return json_encode($config);
    }
}
