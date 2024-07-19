@php
//    $isLocation            = $getIsLocation();
//    $id                    = $getIsLocation() ? $getId() . '-fgm-address' : $getId();
    $datalistOptions       = [];
    $extraAlpineAttributes = $getExtraAlpineAttributes();
    $id                    = $getId();
    $isConcealed           = $isConcealed();
    $isDisabled            = $isDisabled();
    $isPrefixInline        = $isPrefixInline();
    $isSuffixInline        = $isSuffixInline();
    $statePath             = $getStatePath();
    $prefixActions         = $getPrefixActions();
    $prefixIcon            = $getPrefixIcon();
    $prefixLabel           = $getPrefixLabel();
    $suffixActions         = $getSuffixActions();
    $suffixIcon            = $getSuffixIcon();
    $suffixLabel           = $getSuffixLabel();
    $mask                  = null;
@endphp

<x-dynamic-component :component="$getFieldWrapperView()" :field="$field">
    <x-filament::input.wrapper
        :disabled="$isDisabled"
        :inline-prefix="$isPrefixInline"
        :inline-suffix="$isSuffixInline"
        :prefix="$prefixLabel"
        :prefix-actions="$prefixActions"
        :prefix-icon="$prefixIcon"
        :suffix="$suffixLabel"
        :suffix-actions="$suffixActions"
        :suffix-icon="$suffixIcon"
        :valid="! $errors->has($statePath)"
        class="fi-fo-text-input"
        :attributes="
            \Filament\Support\prepare_inherited_attributes($getExtraAttributeBag())
        "
    >
        <div
            class="w-full"
            x-ignore
            wire:ignore
            x-load-css="[
                @js(\Filament\Support\Facades\FilamentAsset::getStyleHref('filament-map-geocomplete', 'laragis/filament-map'))
            ]"
            ax-load
            ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('filament-map-geocomplete', 'laragis/filament-map') }}"
            x-data="
            window.filamentMapGeocomplete({
                config: {{ $getMapConfig() }},
                setStateUsing: async (path, state) => {
                    return await $wire.set(path, state)
                },
            })
            "
            @click.away="open=false"
            @keydown.escape="open=false"
        >
            <x-filament::input
                :attributes="
                    \Filament\Support\prepare_inherited_attributes($getExtraInputAttributeBag())
                        ->merge($extraAlpineAttributes, escape: false)
                        ->merge([
                            'autocapitalize'                                                        => $getAutocapitalize(),
                            'autocomplete'                                                          => $getAutocomplete(),
                            'autofocus'                                                             => $isAutofocused(),
                            'disabled'                                                              => $isDisabled,
                            'id'                                                                    => $id,
                            'inlinePrefix'                                                          => $isPrefixInline && (count($prefixActions) || $prefixIcon || filled($prefixLabel)),
                            'inlineSuffix'                                                          => $isSuffixInline && (count($suffixActions) || $suffixIcon || filled($suffixLabel)),
                            'inputmode'                                                             => $getInputMode(),
                            'list'                                                                  => $datalistOptions ? $id . '-list' : null,
                            'max'                                                                   => null,
                            'maxlength'                                                             => null,
                            'min'                                                                   => null,
                            'minlength'                                                             => null,
                            'placeholder'                                                           => $getPlaceholder(),
                            'readonly'                                                              => $isReadOnly(),
                            'required'                                                              => $isRequired() && (! $isConcealed),
                            'step'                                                                  => null,
                            'type'                                                                  => 'text',
                            $applyStateBindingModifiers('wire:model')                               => $statePath,
                            'x-data'                                                                => (count($extraAlpineAttributes) || filled($mask)) ? '{}' : null,
                            'x-mask' . ($mask instanceof \Filament\Support\RawJs ? ':dynamic' : '') => filled($mask) ? $mask : null,
                            '@click'                                                                => 'open = true',
                        ], escape: false)
                "
            />

            <template x-if="open && suggestions?.length">
                <div class="choices">
                    <div class="choices__list choices__list--dropdown is-active">
                        <div class="choices__list">
                            <template x-for="(v, k) in suggestions">
                                <div class="choices__item choices__item--choice" @click="handleSelect(v)">
                                    <span class="main_text" x-text="v.structured_formatting.main_text"></span>
                                    <span class="secondary_text" x-text="v.structured_formatting.secondary_text"></span>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </template>

        </div>

    </x-filament::input.wrapper>

</x-dynamic-component>
