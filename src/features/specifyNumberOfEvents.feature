Feature: Specify number of events
  Scenario: When user hasn't specified number of events, default to 32
    Given the user doesn't specify the number of events
    When the user is on the main page
    Then the app should display 32 events
  Scenario: When user has specified number of events, change number of events to said number
    Given the user specifies the number of events
    When the user is on the main page
    Then the app should display the specified number of events