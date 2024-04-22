Feature: Show/hide an event's details
  Scenario: When the details of an event are hidden by default
    Given the user is on the event details page
    When the user has not clicked the details button
    Then details are hidden by default
  Scenario: When user clicks button to show details
    Given an event has its details hidden
    When the user clicks the details button
    Then details are shown
  Scenario: When user clicks button to hide details
    Given an event has its details shown
    When the user clicks the details button
    Then details are hidden