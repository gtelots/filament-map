<?php

namespace LaraGIS\FilamentMap\Helpers;

use Filament\Forms\Components\Component;

class FieldHelper
{
    public static function getTopComponent(Component $component): Component
    {
        $parentComponent = $component->getContainer()->getParentComponent();

        return $parentComponent ? static::getTopComponent($parentComponent) : $component;
    }

    public static function getFlatFields($topComponent): array
    {
        $flatFields = $topComponent->getContainer()->getFlatFields();

        foreach ($topComponent->getContainer()->getComponents() as $component) {
            foreach ($component->getChildComponentContainers() as $container) {
                if ($container->isHidden()) {
                    continue;
                }

                $flatFields = array_merge($flatFields, $container->getFlatFields());
            }
        }

        return $flatFields;
    }

    public static function getFieldId(string $field, Component $component): ?string
    {
        $topComponent = self::getTopComponent($component);
        $flatFields   = static::getFlatFields($topComponent);

        if (array_key_exists($field, $flatFields)) {
            return $flatFields[$field]->getId();
        }

        return null;
    }
}
