<?php

namespace LaraGIS\FilamentMap\Commands;

use Illuminate\Console\Command;

class FilamentMapCommand extends Command
{
    public $signature = 'filament-map';

    public $description = 'My command';

    public function handle(): int
    {
        $this->comment('All done');

        return self::SUCCESS;
    }
}
