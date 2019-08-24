import React from 'react';
import ParticlesLib from 'react-particles-js';

import classnames from 'classnames';
import styles from './index.module.sass';

const Particles = ({ className }) => (
  <div className={classnames(styles.container, className)}>
    <ParticlesLib
      params={{
        particles: {
          color: {
            value: '#fff',
          },
          opacity: {
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.2,
            },
          },
          size: {
            value: 2.5,
            random: true,
            anim: {
              enable: true,
              speed: 2,
            },
          },
          line_linked: {
            enable: false,
          },
          move: {
            enable: true,
            speed: 5,
            random: true,
            out_mode: 'out',
            attract: {
              enable: true,
              rotateX: 2000,
            },
          },
        },
      }}
    />
  </div>
);

export default Particles;
