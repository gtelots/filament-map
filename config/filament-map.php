<?php

return [
    'config' => [
        'mapOptions' => [
            'center' => [10.7578001, 106.6309967],
            'zoom' => 9
        ],
        'baseLayers' => [
            [
                'title' => 'Google Streets',
                'selected' => true,
                'url' => 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
                'attribution' => '&copy; <a href="https://www.google.com/maps">Google Maps</a>'
            ],
            [
                'title' => 'Google Satellite',
                'url' => 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
                'attribution' => '&copy; <a href="https://www.google.com/maps">Google Maps</a>'
            ],
        ],
        'layers' => [],
        'controls' => [
            [
                'name' => 'drawControl',
                'position' => 'topleft',
                'globalOptions' => [
                    'continueDrawing' => false,
                ],
                'drawModeOptions' => [],
                'editModeOptions' => [],
                'dragModeOptions' => [],
                'removalModeOptions' => [],
            ],
            [
                'name' => 'layersControl',
                'position' => 'topright',
            ],
            [
                'name' => 'locateControl',
                'position' => 'bottomright',
            ],
            [
                'name' => 'attributionControl',
                'position' => 'bottomright',
            ],
            [
                'name' => 'fullscreenControl',
                'position' => 'bottomright'
            ],
            [
                'name' => 'zoomControl',
                'position' => 'bottomright',
            ],
            [
                'name' => 'scaleControl',
                'enabled' => false,
            ],
        ]
    ]
];
