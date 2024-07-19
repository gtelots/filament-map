<?php

namespace LaraGIS\FilamentMap\Fields;
use Closure;
use Exception;
use Filament\Forms\Components\Actions\Action;
use Filament\Forms\Components\Concerns;
use Filament\Forms\Components\Contracts;
use Filament\Forms\Components\Field;
use Filament\Support\Concerns\HasExtraAlpineAttributes;
use LaraGIS\FilamentMap\Helpers\FieldHelper;

class Geocomplete extends Field implements Contracts\CanBeLengthConstrained, Contracts\HasAffixActions
{
    use Concerns\CanBeAutocapitalized;
    use Concerns\CanBeAutocompleted;
    use Concerns\CanBeLengthConstrained;
    use Concerns\CanBeReadOnly;
    use Concerns\HasAffixes;
    use Concerns\HasExtraInputAttributes;
    use Concerns\HasInputMode;
    use Concerns\HasPlaceholder;
    use HasExtraAlpineAttributes;

    protected string $view = 'filament-map::fields.filament-map-geocomplete';

    protected int $precision = 8;

    protected Closure|string|null $longitudeField = null;

    protected Closure|string|null $latitudeField = null;

    protected string|null $autocompleteUrl = null;
    protected array|null $autocompleteParams = [];

    protected string|null $detailUrl = null;

    /**
     * Main field config variables
     */
    private array $mapConfig = [];

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

    public function autocompleteUrl(string $autocompleteUrl): static {
        $this->autocompleteUrl = $autocompleteUrl;

        return $this;
    }

    public function getAutocompleteUrl(): string {
        return $this->autocompleteUrl ?? config('filament-map.geocomplete.url');
    }

    public function autocompleteParams(array $autocompleteParams): static {
        $this->autocompleteParams = $autocompleteParams;

        return $this;
    }

    public function getAutocompleteParams(): array {
        return array_merge(config('filament-map.geocomplete.params'), [
            'key' => env('GOOGLE_MAPS_API_KEY'),
        ], $this->autocompleteParams);
    }

    public function detailUrl(string $detailUrl): static {
        $this->detailUrl = $detailUrl;

        return $this;
    }

    public function getDetailUrl(): string {
        return $this->detailUrl ?? config('filament-map.geocomplete.detailUrl');
    }

    /**
     * Create json configuration string
     */
    public function getMapConfig(): string
    {
        $config = array_merge($this->mapConfig, [
            'statePath' => $this->getStatePath(),
            'latitudeField' => $this->getLatitudeField(),
            'longitudeField' => $this->getLongitudeField(),
            'autocompleteUrl' => $this->getAutocompleteUrl(),
            'autocompleteParams' => $this->getAutocompleteParams(),
            'detailUrl' => $this->getDetailUrl(),
            'googleMapsAPIKey' => env('GOOGLE_MAPS_API_KEY'),
        ]);

        return json_encode($config);
    }
}
