import { Game } from '../models/game';
import { Answer } from '../models/answer';

const washington = new Answer('George Washington', ['washington']);
const bigAdams = new Answer('John Adams', ['adams']);
const jefferson = new Answer('Thomas Jefferson', ['jefferson']);
const madison = new Answer('James Madison', ['madison']);
const monroe = new Answer('James Monroe', ['monroe']);
const littleAdams = new Answer('John Quincy Adams', ['adams']);
const jackson = new Answer('Andrew Jackson', ['jackson']);
const buren = new Answer('Martin Van Buren', ['van buren', 'vanburen']);
const whHarrison = new Answer('William Henry Harrison', ['harrison']);
const tyler = new Answer('John Tyler', ['tyler']);
const polk = new Answer('James K. Polk', ['polk', 'napoleon of the south'])
const taylor = new Answer('Zachary Taylor', ['taylor']);
const fillmore = new Answer('Millard Fillmore', ['fillmore']);
const pierce = new Answer('Franklin Pierce', ['pierce']);
const buchanan = new Answer('James Buchanan', ['buchanan']);
const lincoln = new Answer('Abraham Lincoln', ['lincoln']);
const aJohnson = new Answer('Andrew Johnson', ['johnson']);
const grant = new Answer('Ulysses S. Grant', ['grant']);
const hayes = new Answer('Rutherford B. Hayes', ['hayes']);
const garfield = new Answer('James Garfield', ['garfield']);
const authur = new Answer('Chester A. Arthur', ['arthur']);
const cleveland = new Answer('Grover Cleveland', ['cleveland']);
const bHarrison = new Answer('Benjamin Harrison', ['harrison']);
const cleveland2 = new Answer('Grover Cleveland', ['cleveland']);
const mckinley = new Answer('William Mckinley', ['mckinley']);
const tRoosevelt = new Answer('Theodore Roosevelt', ['roosevelt']);
const taft = new Answer('William Howard Taft', ['taft']);
const wilson = new Answer('Woodrow Wilson', ['wilson']);
const harding = new Answer('Warren G. Harding', ['harding']);
const coolidge = new Answer('Calvin Coolidge', ['coolidge']);
const hoover = new Answer('Herbert Hoover', ['hoover']);
const fdRoosevelt = new Answer('Franklin D. Roosevelt', ['roosevelt']);
const truman = new Answer('Harry S. Truman', ['truman']);
const eisenhower = new Answer('Dwight D. Eisenhower', ['eisenhower']);
const kennedy = new Answer('John F. Kennedy', ['kennedy']);
const lbJohnson = new Answer('Lyndon B. Johnson', ['johnson']);
const nixon = new Answer('Richard Nixon', ['nixon'])
const ford = new Answer('Gerald Ford', ['ford']);
const carter = new Answer('Jimmy Carter', ['carter']);
const reagan = new Answer('Ronald Reagan', ['reagan']);
const bush_41 = new Answer('George H.W. Bush', ['bush']);
const clinton = new Answer('Bill Clinton', ['clinton']);
const bush_43 = new Answer('George W. Bush', ['bush']);
const obama = new Answer('Barrack Obama', ['obama']);
const trump = new Answer('Donald Trump', ['trump']);

const presidentNames = new Game('U.S. Presidents', 'Enter President\'s Name...', 'All of the United States Presidents', 'If two presidents share last names, they both will count! First names do not count towards correct answers.', [washington, bigAdams, jefferson, madison, monroe, littleAdams, jackson, buren, whHarrison, tyler, polk, taylor, pierce, fillmore, buchanan, lincoln, aJohnson, grant, hayes, garfield, authur, cleveland, bHarrison, cleveland2, mckinley, tRoosevelt, taft, wilson, harding, coolidge, hoover, fdRoosevelt, truman, eisenhower, kennedy, lbJohnson, nixon, ford, carter, reagan, bush_41, clinton, bush_43, obama, trump])

export default presidentNames;