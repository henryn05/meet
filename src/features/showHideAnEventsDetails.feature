Feature: Show/hide an event's details
  Scenario: When the details of an event are hidden by default
    Given the user is on the event details page
    When the app displays a list of events
    Then the details are hidden by default
  Scenario: When the user clicks on button to show the details
    Given an event has its details hidden
    When the user clicks on the details button
    Then the details are shown
  Scenario: When the user clicks on button to hide the details
    Given an event has its details shown
    When the user clicks on the details button
    Then the details are hidden