import * as React from 'react';
import Icon from '../index';
import { ReactNode } from 'react';

interface IMessageProps {
  content: string | ReactNode,
  duration?: number,
  onClose?: () => void,
}

const Message: React.FunctionComponent<IMessageProps> = (props) => {
  const { duration, ...rest } = props;

  return (
    <div>
      Message
    </div>
  );
};

Message.defaultProps = {
  duration: 2,
};
