Feature: User must be able to create an account and log in
   In order to use saving deposits app
   As a user
   I must be able to create an account and log in

    Scenario: Login
    Given I am an email registered regular user
    When I login
    Then I must see saving deposits page