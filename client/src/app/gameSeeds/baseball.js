import { Game } from '../models/game';
import { Answer } from '../models/answer';

const orioles = new Answer('Baltimore Orioles', ['orioles']);
const redsox = new Answer('Boston Red Sox', ['red sox']);
const yankees = new Answer('New York Yankees', ['yankees']);
const rays = new Answer('Tampa Bay Rays', ['rays']);
const jays = new Answer('Toronto Blue Jays', ['jays']);
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
const brewers = new Answer('Milwaukee Brewers', ['brewers', 'brew crew'])
const pirates = new Answer('Pittsburgh Pirates', ['pirates']);
const cards = new Answer('St. Louis Cardinals', ['cards', 'red birds']);
const diamondbacks = new Answer('Arizona Diamondbacks', ['diamondbacks', 'dbacks', 'd-backs']);
const rockies = new Answer('Colorado Rockies', ['rockies']);
const dodgers = new Answer('Los Angeles Dodgers', ['dodgers']);
const padres = new Answer('San Diego Padres', ['padres']);
const giants = new Answer('San Francisco Giants', ['giants'])

const baseballTeams = new Game('MLB Teams', 'Enter MLB Team Name...', 'Name Every MLB Team', 'City names will not be counted towards correct answers, only the actual team name', [orioles, redsox, yankees, rays, jays, whitesox, indians, tigers, royals, twins, astros, angels, mariners, athletics, rangers, braves, marlins, mets, philles, nationals, cubs, reds, brewers, pirates, cards, diamondbacks, rockies, dodgers, padres, giants])


export default baseballTeams;