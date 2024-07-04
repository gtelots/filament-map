<div {{ $attributes->merge($getExtraAttributes())->class([
    'filament-google-maps-column',
    'px-4 py-3' => ! $isInline(),
]) }} xmlns:wire='http://www.w3.org/1999/xhtml'>
    <div
        x-ignore
        x-load-css="[
            @js(\Filament\Support\Facades\FilamentAsset::getStyleHref('filament-map-column', 'laragis/filament-map'))
        ]"
        ax-load
        ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('filament-map-column', 'laragis/filament-map') }}"
        x-data="
            window.filamentMapColumn({
                state: @js($getState()),
                config: {{ $getMapConfig() }},
                mapEl: $refs.map,
            })
        "
        wire:ignore
    >
        <div x-ref="map"></div>
    </div>
</div>
