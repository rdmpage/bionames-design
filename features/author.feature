Feature: Tell me about an author
  In order to discover more work by an author
  Users should be able to 
  See and explore a summary of an author's output
  eg publications, taxon names. 
  
  Scenario: See all articles by an author
    When I visit an author's page
    Then I should see all the articles published by them
    So that I can explore publications relevant to my interests
  
  Scenario: Group articles by Journal
    When I visit an author's page
    Then I should be able to slice and dice their publications
    So that I can find what I'm looking for, or what may interest me
    
  Scenario: See all taxon mentioned by an author
    When I visit an author's page
    Then I should see all the taxa mentioned by them in print
    So that I can see their area of expertise and explore taxa related to those I'm interested in
