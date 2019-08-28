import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';

const Founders = () => (
  <FullHeight start className={classnames(styles.container, styles.custom)}>
    <Container>
      <h1 className={styles.title}>Founders</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet tellus at felis consectetur auctor sit amet ac odio. Nullam dignissim eu tellus et tincidunt. Morbi sollicitudin rutrum ex, id porttitor elit finibus consequat. Maecenas sed tincidunt lacus. Vestibulum molestie semper lorem in fringilla. Nulla finibus neque sem, ut aliquet est ornare nec. Suspendisse at tempus risus. Maecenas pulvinar felis vitae nibh fermentum, feugiat hendrerit augue tempor. Suspendisse sed ultricies ipsum, egestas pellentesque orci. Integer hendrerit lorem purus, vel dapibus lorem venenatis et. Aenean congue dignissim porttitor. Fusce tincidunt quam nisl. Donec vel nisi nisl.
      </p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet tellus at felis consectetur auctor sit amet ac odio. Nullam dignissim eu tellus et tincidunt. Morbi sollicitudin rutrum ex, id porttitor elit finibus consequat. Maecenas sed tincidunt lacus. Vestibulum molestie semper lorem in fringilla. Nulla finibus neque sem, ut aliquet est ornare nec. Suspendisse at tempus risus. Maecenas pulvinar felis vitae nibh fermentum, feugiat hendrerit augue tempor. Suspendisse sed ultricies ipsum, egestas pellentesque orci. Integer hendrerit lorem purus, vel dapibus lorem venenatis et. Aenean congue dignissim porttitor. Fusce tincidunt quam nisl. Donec vel nisi nisl.
      </p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet tellus at felis consectetur auctor sit amet ac odio. Nullam dignissim eu tellus et tincidunt. Morbi sollicitudin rutrum ex, id porttitor elit finibus consequat. Maecenas sed tincidunt lacus. Vestibulum molestie semper lorem in fringilla. Nulla finibus neque sem, ut aliquet est ornare nec. Suspendisse at tempus risus. Maecenas pulvinar felis vitae nibh fermentum, feugiat hendrerit augue tempor. Suspendisse sed ultricies ipsum, egestas pellentesque orci. Integer hendrerit lorem purus, vel dapibus lorem venenatis et. Aenean congue dignissim porttitor. Fusce tincidunt quam nisl. Donec vel nisi nisl.
      </p>
    </Container>
  </FullHeight>
);

export default Founders;
