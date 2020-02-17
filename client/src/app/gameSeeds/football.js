import { Game } from '../models/game';
import { Answer } from '../models/answer';

const bills = new Answer('Bufallo Bills', ['bills']);
const dolphins = new Answer('Miami Dolphins', ['dolphins']);
const patriots = new Answer('New England Patriots', ['patriots']);
const jets = new Answer('New York Jets', ['jets']);

const ravens = new Answer('Baltimore Ravens', ['ravens']);
const bengals = new Answer('Cincinnati Bengals', ['bengals']);
const browns = new Answer('Cleveland Browns', ['browns']);
const steelers = new Answer('Pittsburgh Steelers', ['steelers']);

const texans = new Answer('Houston Texans', ['texans']);
const colts = new Answer('Indianapolis Colts', ['colts']);
const jaguars = new Answer('Jacksonville Jaguars', ['jaguars', 'jags']);
const titans = new Answer('Tennessee Titans', ['titans']);

const broncos = new Answer('Denver Broncos', ['broncos']);
const chiefs = new Answer('Kansas City Chiefs', ['chiefs']);
const chargers = new Answer('Los Angeles Chargers', ['chargers']);
const raiders = new Answer('Oakland Raiders', ['raiders']);

const cowboys = new Answer('Dallas Cowboys', ['cowboys']);
const giants = new Answer('New York Giants', ['giants']);
const eagles = new Answer('Philadelphia Eagles', ['eagles']);
const redskins = new Answer('Washington Redskins', ['redskins']);

const bears = new Answer('Chicago Bears', ['bears']);
const lions = new Answer('Detroit Lions', ['lions']);
const packers = new Answer('Green Bay Packers', ['packers']);
const vikings = new Answer('Minnesota Vikings', ['vikings']);

const falcons = new Answer('Atlanta Falcons', ['falcons']);
const panthers = new Answer('Carolina Panthers', ['panthers']);
const saints = new Answer('New Orleans Saints', ['saints']);
const bucs = new Answer('Tampa Bay Buccaneers', ['buccaneers', 'bucs']);

const cardinals = new Answer('Arizona Cardinals', ['cardinals', 'cards']);
const rams = new Answer('Los Angeles Rams', ['rams']);
const forty9ers = new Answer('San Francisco 49ers', ['49ers', 'niners']);
const seahawks = new Answer('Seattle Seahawks', ['seahawks']);

const footballTeams = new Game('NFL Teams', 'Enter NFL Team Name...', 'All National Football League Teams', 'City Names will not count towards correct answer', [bills, dolphins, patriots, jets, ravens, bengals, browns, steelers, texans, colts, jaguars, titans, broncos, chiefs, chargers, raiders, cowboys, giants, eagles, redskins, bears, lions, packers, vikings, falcons, panthers, saints, bucs, cardinals, rams, forty9ers, seahawks])

export default footballTeams;