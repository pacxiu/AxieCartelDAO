import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import classnames from 'classnames';
import styles from './index.module.sass';

class Tooltip extends Component {
  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  render() {
    const { id, place, children, border, getContent, effect, className } = this.props;

    const effectType = effect || 'solid';

    return (
      <ReactTooltip
        {...{ id, place, border, getContent }}
        multiline
        effect={effectType}
        className={classnames(
          styles.tooltip,
          className,
          { [styles.tooltipBorder]: border },
        )}
      >
        {children}
      </ReactTooltip>
    );
  }
}

export default Tooltip;
