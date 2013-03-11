Feature: Browse articles in a journal
  In order to get a big overview of publications 
  Users should be able to 
  browse articles by journal
  
  Scenario: See all the articles published in a journal
    When I visit a journal page
    Then I should see all the articles published in it
    So that I can explore publications relevant to my interests
    
  Scenario: Refine the articles list
    When I visit a journal page
    Then I should be able to refine the list of articles by date and so forth
    So that I can reduce the number of things on-screen to just what I may be interested in
    
  Scenario: Visualize publicaiton trends
    When I visit a journal page
    Then I should be able to see the publication trends through time
    So that I have a rough idea of whether this journal is  relevant to what I'm looking for
    