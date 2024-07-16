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

    protected static ?string $icon = 'heroicon-o-map';

    protected static bool $collapsible = false;

    protected static ?string $maxHeight = null;

    protected static ?string $minHeight = '50vh';

    public string $dataChecksum;

    protected array $mapConfig = [

    ];

    protected function getHeading(): ?string
    {
        return static::$heading;
    }

    protected function getFilters(): ?array
    {
        return null;
    }

    protected function getIcon(): ?string
    {
        return static::$icon;
    }

    protected function getCollapsible(): bool
    {
        return static::$collapsible;
    }

    protected function getMaxHeight(): ?string
    {
        return static::$maxHeight;
    }

    protected function getMinHeight(): ?string
    {
        return static::$minHeight;
    }

    public function getConfig(): array
    {
        return [

        ];
    }

    public function getMapConfig(): string
    {
        $config = $this->getConfig();

        return json_encode(
            array_merge(
                $this->mapConfig,
                $config,
            )
        );
    }

    protected function getData(): array
    {
        return [];
    }

    protected function getCachedData(): array
    {
        return $this->cachedData ??= $this->getData();
    }

    public function mount()
    {
        $this->dataChecksum = md5('{}');
    }

    protected function generateDataChecksum(): string
    {
        return md5(json_encode($this->getCachedData()));
    }

    public function updateMapData()
    {
        $newDataChecksum = $this->generateDataChecksum();

        if ($newDataChecksum !== $this->dataChecksum) {
            $this->dataChecksum = $newDataChecksum;

            $this->dispatch('updateMapData', [
                'data' => $this->getCachedData(),
            ])->self();
        }
    }
}
