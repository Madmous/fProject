import React, { PropTypes } from 'react';

import './PageTitle.css';

const propTypes = {
  title: PropTypes.string.isRequired
};

const defaultTypes = {
  title: ''
};

export default function PageTitle(props) {
  return (
    <h1 className="PageTitle">{ props.title }</h1>
  );
}

PageTitle.defaultTypes = defaultTypes;
PageTitle.propTypes = propTypes;