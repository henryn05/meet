Feature: Specify number of events
  Scenario: When user hasn't specified number of events, default to 32
    Given the user is on the main page
    When they don't specify the number of events
    Then the app should display 32 events
  Scenario: When user has specified number of events, change number of events to said number
    Given the user is on the main page
    When they specify the number of events as 5
    Then the app should display 5 events