Feature: Show a genus
  In order to explore the tree of life
  Users should be able to 
  see and browse all the species in a genus
  
  In order to find missing data
  Curators should be able to 
  visually see which species do not have an OD
  
  Scenario: See species 
    When I visit a genus page
    Then I should see all the species in that genus
    So I know what's available to me
  
  Scenario: Browse species
    When I click on a species
    Then I should be taken to that species' page
    So I can see the OD and other information on the name
    
  Scenario: Visualize missing data
    As a curator
    When I visit a genus page
    Then I should see the OD or lack thereof for all species
    So I can spot species that still need their ODs identified
  
  Scenario: See a classification
    When I visit the page for a genus
    Then I should see it in a classification
    So I know where it lies in the tree of life, and what it might be related to
    
  Scenario: Navigate a classification
    When I visit the page for a genus
    Then I should be able to click higher taxa
    So I can browse around