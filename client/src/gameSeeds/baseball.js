import { Game } from '../models/game';
import { Answer } from '../models/answer';


// const answerList = [
//   { display_value: 'Tampa Bay Rays', accepted_values: ['rays', 'devil rays'] },
//   { display_value: 'New York Yankees', accepted_values: ['yankees'] },
//   { display_value: 'Boston Red Sox', accepted_values: ['red sox'] },
//   { display_value: 'Baltimore Orioles', accepted_values: ['orioles'] },
//   { display_value: 'Toronto Blue Jays', accepted_values: ['blue jays', 'jays'] },
//   { display_value: 'Cleveland Indiand', accepted_values: ['indians'] },
//   { display_value: 'Detroit Tigers', accepted_values: ['tigers'] },
//   { display_value: 'Kansas City Royals', accepted_values: ['royals'] },
//   { display_value: 'Chicago White Sox', accepted_values: ['white sox'] },
//   { display_value: 'Minnesota Twins', accepted_values: ['twins'] },
//   { display_value: 'Houston Astros', accepted_values: ['astros', 'cheaters'] },
//   { display_value: 'Los Angeles Angels', accepted_values: ['angels'] },
//   { display_value: 'Oakland Athletics', accepted_values: ['athletics', 'a\'s'] },
//   { display_value: 'Seattle Mariners', accepted_values: ['mariners'] },
//   { display_value: 'Texas Rangers', accepted_values: ['rangers'] },
//   { display_value: 'Atlanta Braves', accepted_values: ['braves'] },
//   { display_value: 'Miami Marlins', accepted_values: ['marlins'] },
//   { display_value: 'New York Mets', accepted_values: ['mets', 'metropolitans'] },
//   { display_value: 'Philadelpia Philles', accepted_values: ['philles'] },
//   { display_value: 'Washington Nationals', accepted_values: ['nationals'] },
//   { display_value: 'Chicago Cubs', accepted_values: ['cubs'] },
//   { display_value: 'Cincinnati Reds', accepted_values: ['reds'] },
//   { display_value: 'Milwaukee Brewers', accepted_values: ['brewers'] },
//   { display_value: 'Pittsburgh Pirates', accepted_values: ['pirates'] },
//   { display_value: 'St. Louis Cardinals', accepted_values: ['cardinals', 'cards'] },
//   { display_value: 'Arizona Diamondbacks', accepted_values: ['diamondbacks'] },
//   { display_value: 'Colorado Rockies', accepted_values: ['rockies'] },
//   { display_value: 'Los Angeles Dodgers', accepted_values: ['dodgers'] },
//   { display_value: 'San Diego Padres', accepted_values: ['padres'] },
//   { display_value: 'San Francisco Giants', accepted_values: ['giants'] },
// ]

// answerList.forEach(answerItem => {
//   answerItem = new Answer(answerItem.display_value, answerItem.accepted_values)
// })

// console.log(answerList[0])



const rays = new Answer('Tampa Bay Rays', ['rays']);
const yankees = new Answer('New York Yankees', ['yankees']);
const redsox = new Answer('Boston Red Sox', ['red sox']);
const jays = new Answer('Toronto Blue Jays', ['jays']);
const orioles = new Answer('Baltimore Orioles', ['orioles']);
const whitesox = new Answer('Chicago White Sox', ['white sox']);
const indians = new Answer('Cleveland Indians', ['indians']);
const tigers = new Answer('Detroit Tigers', ['tigers']);
const royals = new Answer('Kansas City Royals', ['royals']);
const twins = new Answer('Minnesota Twins', ['twins']);
const astros = new Answer('Houston Astros', ['astros', 'cheaters']);
const angels = new Answer('Los Angeles Angels', ['angels']);
const athletics = new Answer('Oakland Athletics', ['athletics', 'a\'s']);
const mariners = new Answer('Seattle Mariners', ['mariners']);
const rangers = new Answer('Texas Rangers', ['rangers']);

const braves = new Answer('Atlanta Braves', ['braves']);
const marlins = new Answer('Miami Marlins', ['marlins']);
const mets = new Answer('New York Mets', ['mets', 'metropolitans']);
const philles = new Answer('Philadelphia Philles', ['philles']);
const nationals = new Answer('Washington Nationals', ['nationals', 'nats']);
const cubs = new Answer('Chicago Cubs', ['cubs']);
const reds = new Answer('Cincinnati Reds', ['reds']);
const pirates = new Answer('Pittsburgh Pirates', ['pirates']);
const cards = new Answer('St. Louis Cardinals', ['cards', 'red birds']);
const diamondbacks = new Answer('Arizona Diamondbacks', ['diamondbacks', 'dbacks', 'd-backs']);
const rockies = new Answer('Colorado Rockies', ['rockies']);
const dodgers = new Answer('Los Angeles Dodgers', ['dodgers']);
const padres = new Answer('San Diego Padres', ['padres']);
const giants = new Answer('San Francisco Giants', ['giants'])

const baseballTeams = new Game('MLB Teams', 'Name Every MLB Team', 'City names will not be counted towards correct answers, only the actual team name', [rays, yankees, redsox, jays, orioles, whitesox, indians, tigers, royals, twins, astros, angels, mariners, athletics, rangers, braves, marlins, mets, philles, nationals, cubs, reds, pirates, cards, diamondbacks, rockies, dodgers, padres, giants])


export default baseballTeams;