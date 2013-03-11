Feature: Show a Family or higher taxon
  In order to explore the tree of life
  Users should be able to 
  see and browse the children of this taxon
  
  In order to find missing data
  Curators should be able to 
  visually see what percentage of children have ODs
  
  Scenario: See children 
    When I visit a high-level taxon page
    Then I should see all the species in that genus
    So I know what's available to me
  
  Scenario: Browse child
    When I click on a child
    Then I should be taken to that child's page
    So I can see the information about the child
    
  Scenario: Visualize missing data
    As a curator
    When I visit a high-level taxon page
    Then I should see a visual representation of how many species in each child have ODs
    So I can spot species that still need their ODs identified
  
  Scenario: See a classification
    When I visit the page for a higher-taxon
    Then I should see it in a classification
    So I know where it lies in the tree of life, and what it might be related to
    
  Scenario: Navigate a classification
    When I visit the page for a higher-taxon
    Then I should be able to click higher taxa
    So I can browse around