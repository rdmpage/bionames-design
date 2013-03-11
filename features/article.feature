Feature: Show a publication
  In order to read about a species, including its OD
  Users should be able to 
  see the text of the publication in their browser
  
  Scenario: Read a publication
    Given a publication with an accessible digital copy
    When I visit the page for a publication
    Then I should see the scans in my browser
    So I can read the text and do my work
    
  Scenario: Visit a publication behind a paywall
    Given a publication locked up behind a paywall
    When I visit the page for a publication
    Then I should see a link to where I can view the text
    So I can read the text
    
  Scenario: See all names in a publication
    When I am reading a publication with species names mentioned
    Then I should see all the names aggregated into one place
    And I should be able to click on them to visit that name page
    So I can explore species related to ones I was looking at
    
  Scenario: See the name originally described
    Given an original description
    When I'm reading that publication
    Then I should see the originally-described name
    And it should be specially-marked
    Because ODs are ultimately what Bionames is all about
  
  Scenario: View citation information
    When I'm reading a publication
    Then I should be able to copy-and-paste a citation to it
    And the citation is available in varying format styles
    So I'm encouraged to cite it in my work
  
  Scenario: Visit external resources
    Given a publication with external identifiers
    When I'm viewing that publication
    Then I should be able to click the identifiers and be taken out to their respective projects (Biostor, BHL, DOI resolver, etc)
    So that our collaborators get more traffic
    
  Scenario: Browse all pubs by the authors
    When I'm viewing a publication
    Then the authors should be listed
    And I should be able to click them to see their other pubs
    So that I can explore related works and learn something new
  
  Scenario: Browse all pubs in journal
    When I'm viewing a publication
    Then I should see the journal it was published in
    And I should be able to click on it to see its other pubs
    So that I can get a big overview of potentially related publications