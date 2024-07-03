<?php

namespace LaraGIS\FilamentMap\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \LaraGIS\FilamentMap\FilamentMap
 */
class FilamentMap extends Facade
{
    protected static function getFacadeAccessor()
    {
        return \LaraGIS\FilamentMap\FilamentMap::class;
    }
}
