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
        'layers' => [

        ],
        'controls' => [
            'layersControl' => [
                'position' => 'topright',
            ],
            'locateControl' => [
                'position' => 'bottomright',
            ],
            'attributionControl' => [
                'position' => 'bottomright',
            ],
            'fullscreenControl' => [
                'position' => 'bottomright'
            ],
            'zoomControl' => [
                'position' => 'bottomright',
            ],
            'scaleControl' => false,
        ],
        'controlCases' => [
            'MapField' => [
                'drawControl' => [
                    'position' => 'topleft',
                    'globalOptions' => [
                        'continueDrawing' => false,
                    ],
                    'drawModeOptions' => [],
                    'editModeOptions' => [],
                    'dragModeOptions' => [],
                    'removalModeOptions' => [],
                ]
            ],
            'MapEntry' => [],
            'MapWidget' => []
        ]
    ]
];
