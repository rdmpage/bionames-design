Feature: Show a species name
  In order to learn more about a species
  Users should be able to 
  learn all the pertinent information about a name
  
  Scenario: See original description
    Given that we know the original description of a name
    When I visit the page for that name
    Then I should see the original description clearly marked
    And be able to read it with minimal effort
    Because that's the whole point of this project!
    
  Scenario: See a species with an unknown original description
    Given that we don't know the original description of a name
    When I visit the page for that name
    Then I should see clearly that we don't know the original description
    And I should se all the literature we do know about
    So that I might be able to find the OD in the existing literature
  
  Scenario: List all literature known about a name
    Given that we have multiple articles containing a name
    When I vist the page for that name
    Then I should see a list of all the literature containing that name
    And it should be ordered chronologically
    So I can attempt to find an OD if BioNames doesn't have one marked
    
  Scenario: See a classification
    When I visit the page for a name
    Then I should see it in a classification
    So I know where it lies in the tree of life, and what it might be related to
    
  Scenario: Navigate a classification
    When I visit the page for a name
    Then I should be able to click higher order taxa
    So I can browse around the tree of life
    
  Scenario: Link to other projects
    Given a name has links out to EoL, ALA, and an LSID
    When I visit the page for a name
    Then I should see a link to its taxa page in EoL
    And a link to its page in ALA
    And a link to resolve its LSID
    So that I can discover more information about this taxa on other sites
    And make Cyndy happy
  
  Scenario: Link to synonyms for this name
    Given a name that has synonyms
    When I visit the page for this name
    Then I should see links to it synonyms
    So that I can find more information about this critter