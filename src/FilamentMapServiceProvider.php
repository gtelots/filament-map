<?php

namespace LaraGIS\FilamentMap;

use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Assets\Asset;
use Filament\Support\Assets\Css;
use Filament\Support\Assets\Js;
use Filament\Support\Facades\FilamentAsset;
use Filament\Support\Facades\FilamentIcon;
use Illuminate\Filesystem\Filesystem;
use Livewire\Features\SupportTesting\Testable;
use Spatie\LaravelPackageTools\Commands\InstallCommand;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;
use LaraGIS\FilamentMap\Commands\FilamentMapCommand;
use LaraGIS\FilamentMap\Testing\TestsFilamentMap;

class FilamentMapServiceProvider extends PackageServiceProvider
{
    public static string $name = 'filament-map';

    public static string $viewNamespace = 'filament-map';

    public function configurePackage(Package $package): void
    {
        /*
         * This class is a Package Service Provider
         *
         * More info: https://github.com/spatie/laravel-package-tools
         */
        $package->name(static::$name)
            ->hasCommands($this->getCommands())
            ->hasInstallCommand(function (InstallCommand $command) {
                $command
                    ->publishConfigFile()
                    ->publishMigrations()
                    ->askToRunMigrations()
                    ->askToStarRepoOnGitHub('laragis/filament-map');
            });

        $configFileName = $package->shortName();

        if (file_exists($package->basePath("/../config/{$configFileName}.php"))) {
            $package->hasConfigFile();
        }

        if (file_exists($package->basePath('/../database/migrations'))) {
            $package->hasMigrations($this->getMigrations());
        }

        if (file_exists($package->basePath('/../resources/lang'))) {
            $package->hasTranslations();
        }

        if (file_exists($package->basePath('/../resources/views'))) {
            $package->hasViews(static::$viewNamespace);
        }
    }

    public function packageRegistered(): void
    {
    }

    public function packageBooted(): void
    {
        // Asset Registration
        FilamentAsset::register(
            $this->getAssets(),
            $this->getAssetPackageName()
        );

        FilamentAsset::registerScriptData(
            $this->getScriptData(),
            $this->getAssetPackageName()
        );

        // Icon Registration
        FilamentIcon::register($this->getIcons());

        // Handle Stubs
        if (app()->runningInConsole()) {
            foreach (app(Filesystem::class)->files(__DIR__ . '/../stubs/') as $file) {
                $this->publishes([
                    $file->getRealPath() => base_path("stubs/filament-map/{$file->getFilename()}"),
                ], 'filament-map-stubs');
            }
        }

        // Testing
        Testable::mixin(new TestsFilamentMap());
    }

    protected function getAssetPackageName(): ?string
    {
        return 'laragis/filament-map';
    }

    /**
     * @return array<Asset>
     */
    protected function getAssets(): array
    {
        return [
            AlpineComponent::make('filament-map-column', __DIR__ . '/../resources/monorepo/apps/filament-map-column/dist/assets/index.js'),
            Css::make('filament-map-column', __DIR__ . '/../resources/monorepo/apps/filament-map-column/dist/assets/index.css')->loadedOnRequest(),

            AlpineComponent::make('filament-map-field', __DIR__ . '/../resources/monorepo/apps/filament-map-field/dist/assets/index.js'),
            Css::make('filament-map-field', __DIR__ . '/../resources/monorepo/apps/filament-map-field/dist/assets/index.css')->loadedOnRequest(),

            AlpineComponent::make('filament-map-entry', __DIR__ . '/../resources/monorepo/apps/filament-map-entry/dist/assets/index.js'),
            Css::make('filament-map-entry', __DIR__ . '/../resources/monorepo/apps/filament-map-entry/dist/assets/index.css')->loadedOnRequest(),

            AlpineComponent::make('filament-map-geocomplete', __DIR__ . '/../resources/monorepo/apps/filament-map-geocomplete/dist/assets/index.js'),
            Css::make('filament-map-geocomplete', __DIR__ . '/../resources/monorepo/apps/filament-map-geocomplete/dist/assets/index.css')->loadedOnRequest(),
        ];
    }

    /**
     * @return array<class-string>
     */
    protected function getCommands(): array
    {
        return [
            FilamentMapCommand::class,
        ];
    }

    /**
     * @return array<string>
     */
    protected function getIcons(): array
    {
        return [];
    }

    /**
     * @return array<string>
     */
    protected function getRoutes(): array
    {
        return [];
    }

    /**
     * @return array<string, mixed>
     */
    protected function getScriptData(): array
    {
        return [];
    }

    /**
     * @return array<string>
     */
    protected function getMigrations(): array
    {
        return [
            'create_filament-map_table',
        ];
    }
}
