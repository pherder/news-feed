<?php

namespace App\Console\Commands;

use App\Services\ArticleFetcher\AnotherFakeArticleFetcher;
use App\Services\ArticleFetcher\ArticleFetcherService;
use App\Services\ArticleFetcher\FakeArticleFetcher;
use Illuminate\Console\Command;

class FetchArticles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fetch-articles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    public function handle(): void
    {
        $fetchers = [
            app(FakeArticleFetcher::class),
            app(AnotherFakeArticleFetcher::class),
        ];

        $fetcherService = new ArticleFetcherService($fetchers);
        $count = $fetcherService->fetchAll();

        $this->info(sprintf('All articles fetched successfully! (%s)', $count));
    }
}
