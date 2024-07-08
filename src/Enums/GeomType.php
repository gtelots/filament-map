<?php

namespace LaraGIS\FilamentMap\Enums;

enum GeomType: string
{
    case Point = 'Point';
    case MultiPoint = 'MultiPoint';
    case LineString = 'LineString';
    case MultiLineString = 'MultiLineString';
    case Polygon = 'Polygon';
    case MultiPolygon = 'MultiPolygon';
    case GeometryCollection = 'GeometryCollection';
}
