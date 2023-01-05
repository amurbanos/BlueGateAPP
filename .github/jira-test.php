<?php
require 'vendor/autoload.php';

use JiraRestApi\Issue\IssueService;
use JiraRestApi\Issue\Transition;
use JiraRestApi\JiraException;

$issueKey = 'TEST-879';

try {			
    $transition = new Transition();
    $transition->setTransitionName('Resolved');
    $transition->setCommentBody('performing the transition via REST API.');

    $issueService = new IssueService();

    $issueService->transition($issueKey, $transition);
} catch (JiraRestApi\JiraException $e) {
    $this->assertTrue(FALSE, 'add Comment Failed : ' . $e->getMessage());
}
