<?php
require 'vendor/autoload.php';

use JiraRestApi\Issue\IssueService;
use JiraRestApi\Issue\Transition;
use JiraRestApi\JiraException;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$issueKey = 'TEST-879';

print_r($argv);
exit;

$issueService = new IssueService(new ArrayConfiguration(
          [
               'jiraHost' => 'https://jira.aisolutions.tec.br',
               'useTokenBasedAuth' => true,
               'personalAccessToken' => 'your-token-here',
          ]
   ));

try {			
    $transition = new Transition();
    $transition->setTransitionName('Resolved');
    $transition->setCommentBody('performing the transition via REST API.');

    $issueService->transition($issueKey, $transition);
} catch (JiraRestApi\JiraException $e) {
    $this->assertTrue(FALSE, 'add Comment Failed : ' . $e->getMessage());
}
