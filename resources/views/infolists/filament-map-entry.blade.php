<x-dynamic-component :component='$getEntryWrapperView()' :entry='$entry' xmlns:wire='http://www.w3.org/1999/xhtml'>
    <div
        x-ignore
        ax-load
        x-load-css="[
            @js(\Filament\Support\Facades\FilamentAsset::getStyleHref('filament-map-entry', 'laragis/filament-map'))
        ]"
        ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('filament-map-entry', 'laragis/filament-map') }}"
        x-data="
            window.filamentMapEntry({
                state: @js($getState()),
                config: {{ $getMapConfig() }},
                mapEl: $refs.map,
            })
        "
        wire:ignore
    >
        <div
            x-ref="map"
            class="w-full"
            style="
                height: {{ $getHeight() }};
                min-height: 30vh;
                overflow: hidden;
            "
        ></div>
    </div>
</x-dynamic-component>
