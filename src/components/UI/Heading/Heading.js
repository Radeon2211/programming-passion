import React from 'react';
import classes from './Heading.module.scss';

const Heading = (props) => {
  const { variant, thickness, color, align, mgTop, mgBottom, children } = props;

  let heading = null;
  const headingClasses = [classes[variant]];
  if (thickness) headingClasses.push(classes[thickness]);
  if (color) headingClasses.push(classes[color]);
  if (align) headingClasses.push(classes[align]);
  if (mgTop) headingClasses.push(classes[mgTop]);
  if (mgBottom) headingClasses.push(classes[mgBottom]);

  switch (variant) {
    case 'H1':
      heading = <h1 className={headingClasses.join(' ')}>{children}</h1>;
      break;
    case 'H2':
      heading = <h2 className={headingClasses.join(' ')}>{children}</h2>;
      break;
    case 'H3':
      heading = <h3 className={headingClasses.join(' ')}>{children}</h3>;
      break;
    case 'H4':
      heading = <h4 className={headingClasses.join(' ')}>{children}</h4>;
      break;
    case 'H5':
      heading = <h5 className={headingClasses.join(' ')}>{children}</h5>;
      break;
    case 'H6':
      heading = <h6 className={headingClasses.join(' ')}>{children}</h6>;
      break;
    default:
      heading = <h6>{children}</h6>;
  }

  return heading;
};

export default Heading;
