import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import AnchorExternal from 'components/AnchorExternal';

const Manifesto = () => (
  <FullHeight start className={classnames(styles.container, styles.page)}>
    <Container>
      <h1>Manifesto</h1>
      <p>As we all know, many third-party developers help and build many tools for Axie players to improve playability and also make some aspects easier for the players. This is a list, made by Axie DAO, of over 25 different tools for Axie players: <AnchorExternal href="https://tiny.cc/axiecartel.">https://tiny.cc/axiecartel.</AnchorExternal>
      </p>
      <p><b>Axie Cartel DAO</b> was created to systematize and unite the actions of Axie Infinity players in order to maximize the benefits that we can bring to the Lunacia universe, as a community. The main purpose is to act as seedfund incubator for promising, user-generated content initiatives within Lunacia.</p>
      <p>In the current system, players who are not developers do not have too many ways to help the Axie game grow. <b>Axie Cartel DAO</b> wants to give these players the opportunity to contribute, team up, and with common power increase the bonuses for creators / third-party developers and Influencers of Lunacia. As a DAO, we believe that all tools that affect the quality of the game should be public and free for all, to avoid unfair advantages between players.</p>
      <ul className={styles.listDashed}><u>In summary, the <b>Axie Cartel DAO</b> will answer to these concerns:</u>
        <li>community doesn’t have power on what is being developed</li>
        <li>developers have advantage upon non-dev users</li>
        <li>investors (that are non-dev) have limited abilities to help the game grow</li>
        <li>developers don’t have many incentives to give their tools to all people in the community</li>
      </ul>

      <h2>FUTURE of Axie Cartel DAO</h2>
      <p>For example Members of Axie Cartel DAO can team up and create/fund:</p>
      <ul className={styles.listDashed}><b>1. Axie Merchant`s Guild for Axies and Lands</b>
        <li>Complete teams with high-end moves for sale</li>
        <li>Top Tier Mystic / Origin / MEOs Axies</li>
        <li>Curated shop with only the best, Top Tier Axies</li>
        <li>Curated estates, only prime location(s) in Lunacia</li>
        <li>Discounts and other benefits for DAO members</li>
      </ul>
      <p className={styles.listParagraph}>This can prepare Axie Cartel DAO Members to act as FUND MANAGERS for NFT tokens in Lunacia in the future. Someday, hedge funds managers will realize that not having crypto collectibles in their portfolio is a poor choice. They will seek for people with similar minds, but in the NFT world. *This should be us telling them what to buy (and when to sell), why, and for how long and so on.</p>
      <ul className={styles.listCreation}>
        <li><b>2. Games based on Lunacia SDK</b> and all NFTs from Axie Infinity game but with whole different mechanics. The goal can be to build better games from Axie itself, using their assets.</li>
        <li><b>3. Buyback undervalued Axies and floor price Axies acting as a Market Maker</b> for Axie Infinity pets and lands. This can bring more liquidity to the Axie market and can prevent it from big dumps in the price of lands & Axies. All buys and sells will be voted by the Guild via Proposals to the DAO. All DAO members will be able to take part in making such decisions.</li>
        <li><b>4. Tools that improve the efficiency in the game.</b> Tools that will make  game play easier and  more  benficial for players. This is not about bots and botting the future Axie gameplay. This point is about regular, non-dev Axie players that want to have vote on what tools will be developed by the 3th party developers.</li>
        <li><b>5. New Axies for streamers and Influencers.</b> DAO can act similar to Coco Cute Devil and incentivises the best new streamers and NFT / Crypto influencers by giving them free Axie as a warm invitation to the Axie game.</li>
        <li><b>6. Meme Factory</b> where Guild can pay in DAI or Axies for the best Axie related memes that get the best traction on the web (Reddit, Medium, Twitter, DLive, Steemit, etc.)</li>
        <li><b>7. Custom bounty for Axie community members</b> if you complete tasks that will bring more hype to the Axie game or add more clarity to gameplay like guides or infographic you will get a prize from DAO. For example “10 DAI Bounty for creating simple guide: How to breed pure Axie with little budget?”</li>
        <li><b>8. Buyback LUNA tokens from everyone that willing to sell.</b> Constantly advertise the possible of selling LUNA to Axie Cartel DAO. Selling Axies for LUNA tokens to people that buy land during land sale but don`t play much since then.</li>
      </ul>

      <h2>TYPES of Axie Cartel DAO Members & Votes Distribution:</h2>
      <ul className={styles.listMembers}>
        <li>
          <b>Axie Cartel DAO Summoner</b>
          <i>ExHuman</i>
          <ul>
            <li>work contribution</li>
            <li>0 DAI = 500.000 votes</li>
          </ul>
        </li>
        <li>
          <b>Council of Elders</b>
          <i>Developers that will get grants for creating tools/games within Lunacia.</i>
          <ul>
            <li>work contribution</li>
            <li>0 DAI = min. 100.000 votes</li>
          </ul>
        </li>
        <li>
          <b>High Priests</b>
          <i>Generous citizens of Lunacia who will remain forever in the story of the beginnings of The Lunacia Empire.</i>
          <ul>
            <li>min. 10 DAI pledge</li>
            <li>10 DAI = 1 vote</li>
          </ul>
        </li>
        <li>
          <b>Citizens of Lunacia</b>
          <i>The first inhabitants of Lunacia. Worthy representatives of the guild`s values.</i>
          <ul>
            <li>min. 10 DAI pledge</li>
            <li>2 DAI = 1 vote</li>
          </ul>
        </li>
      </ul>

      <h2>RULES of the Axie Cartel DAO Guild Bank:</h2>
      <ul className={classnames(styles.listDashed, styles.listRules)}>
        <li>Everyone who lock more than 100 DAI in the Axie Cartel DAO guild bank for more than year will take part in Mystic Axie giveaway event in December 2020.</li>
        <li>All DAI that will be locked in Axie Cartel DAO will be returned to the Axie Cartel DAO members in January 2021.</li>
        <li>Axie Cartel DAO will use the #DeFi Compound tools to get the +10-15% APR return to fund Axie DAO operations.</li>
        <li>All funding and spends of DAI from the Guild Bank will need to get more than 51% of YES votes during the 1 weeks long Voting Period.</li>
        <li>Every Axie Cartel DAO member need to have at least 1 complete team of 3 Axies and be in the Axie Infinity Discord chat.</li>
      </ul>
    </Container>
  </FullHeight>
);

export default Manifesto;
