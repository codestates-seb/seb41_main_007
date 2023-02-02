import React, { useState } from 'react';
import styled from 'styled-components';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession } from 'CustomHook/useSession';
import useBooleanInput from 'CustomHook/useBooleaninput';

const Title = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  padding-right: 30px;
`;

interface props {
  ATvalue?: string;
  Component?: any;
  Open?: boolean;
}

const AccordionTitle: React.FC<props> = ({ ATvalue, Component, Open }) => {
  const [isControl, onisControl] = useBooleanInput(Open || false);

  const { session, loading } = useSession();
  if (loading) return <></>;
  return (
    <>
      <Title>
        <div className="text-base font-semibold py-4">{ATvalue}</div>
        <button onClick={() => onisControl()}>
          {isControl ? (
            <FontAwesomeIcon icon={faArrowUp} />
          ) : (
            <FontAwesomeIcon icon={faArrowDown} />
          )}
        </button>
      </Title>
      {isControl && <Component session={session} />}
    </>
  );
};

export default AccordionTitle;
