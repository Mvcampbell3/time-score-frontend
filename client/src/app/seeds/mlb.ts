const mlb_game = {
  title: 'MLB Teams',
  instructions: 'Only the names of the teams will count towards correct answers, not the place for which they play',
  description: 'There are 30 MLB teams, how many can you come up with in 60 seconds?',
  input_placeholder: 'Team Name',
  plays: 0,
  total_score: 0,
  username: 'mvcampbell3',
  type: 'sports',
  answers: [
    // AL East
    { display_text: 'Baltimore Orioles', accepted_answers: ['orioles'] },
    { display_text: 'Boston Red Sox', accepted_answers: ['red sox'] },
    { display_text: 'New York Yankess', accepted_answers: ['yankees'] },
    { display_text: 'Tampa Bay Rays', accepted_answers: ['rays'] },
    { display_text: 'Toronto Blue Jays', accepted_answers: ['blue jays', 'jays'] },
    // AL Central
    { display_text: 'Chicago White Sox', accepted_answers: ['white sox'] },
    { display_text: 'Cleveland Indians', accepted_answers: ['indians'] },
    { display_text: 'Detroit Tigers', accepted_answers: ['tigers'] },
    { display_text: 'Kansas City Royals', accepted_answers: ['royals'] },
    { display_text: 'Minnesota Twins', accepted_answers: ['twins'] },
    // AL West
    { display_text: 'Houston Astros', accepted_answers: ['astros', 'cheaters'] },
    { display_text: 'Los Angeles Angels', accepted_answers: ['angels'] },
    { display_text: 'Oakland Athletics', accepted_answers: ['athletics', "a's"] },
    { display_text: 'Seatle Mariners', accepted_answers: ['mariners'] },
    { display_text: 'Texas Rangers', accepted_answers: ['rangers'] },
    // NL East
    { display_text: 'Atlanta Braves', accepted_answers: ['braves'] },
    { display_text: 'Miami Marlins', accepted_answers: ['marlins'] },
    { display_text: 'New York Mets', accepted_answers: ['mets'] },
    { display_text: 'Philadelphia Phillies', accepted_answers: ['phillies'] },
    { display_text: 'Washington Nationals', accepted_answers: ['nationals', 'nats'] },
    // NL Central
    { display_text: 'Chicago Cubs', accepted_answers: ['cubs'] },
    { display_text: 'Cincinnati Reds', accepted_answers: ['reds'] },
    { display_text: 'Milwaukee Brewers', accepted_answers: ['brewers'] },
    { display_text: 'Pittsburgh Pirates', accepted_answers: ['pirates'] },
    { display_text: 'St. Louis Cardinals', accepted_answers: ['cards', 'cardinals'] },
    // NL West
    { display_text: 'Arizona Diamondbacks', accepted_answers: ['diamondbacks', "d'backs"] },
    { display_text: 'Colorado Rockies', accepted_answers: ['rockies'] },
    { display_text: 'Los Angeles Dodgers', accepted_answers: ['dodgers'] },
    { display_text: 'San Diego Padres', accepted_answers: ['padres'] },
    { display_text: 'San Fransico Giants', accepted_answers: ['giants'] },
  ]
}

export default mlb_game;