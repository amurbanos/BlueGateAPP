<?php
require 'vendor/autoload.php';

use JiraRestApi\Issue\IssueService;
use JiraRestApi\Configuration\ArrayConfiguration;
use JiraRestApi\Issue\Transition;
use JiraRestApi\JiraException;

$jiraHost = $argv[1];
$personalAccessToken = $argv[2];
$issueKey = $argv[3];

$issueService = new IssueService(
    new ArrayConfiguration(
        [
            'jiraHost' => $jiraHost,
            'useTokenBasedAuth' => true,
            'personalAccessToken' => $personalAccessToken,
        ]
   )
);

try {			
    $transition = new Transition();
    $transition->setTransitionName('Test');
    $transition->setCommentBody('Liberado para teste em homologação.');
    $issueService->transition($issueKey, $transition);
} catch (JiraRestApi\JiraException $e) {
    print_r($e->getMessage());
}
