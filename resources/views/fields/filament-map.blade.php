<x-dynamic-component :component="$getFieldWrapperView()" :field="$field">
    @php
        $statePath = $getStatePath();
    @endphp

    <div
            x-ignore
            wire:ignore
            x-load-css="[
                @js(\Filament\Support\Facades\FilamentAsset::getStyleHref('filament-map-field', 'laragis/filament-map'))
            ]"
            ax-load
            ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('filament-map-field', 'laragis/filament-map') }}"
            x-data="window.filamentMapField({
                state: $wire.entangle('{{ $getStatePath() }}'),
                config: {{ $getMapConfig() }},
                mapEl: $refs.map,
            })"
            id="{{ $getId() . '-alpine' }}"
    >
        <div
                x-ref="map"
                class="w-full"
                style="
                    height: {{ $getHeight() }};
                    min-height: 30vh;
                    z-index: 1 !important;
                "
        ></div>
    </div>
</x-dynamic-component>