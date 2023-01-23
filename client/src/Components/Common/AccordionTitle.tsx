import React, { Component, useState, ElementType } from 'react';
import styled from 'styled-components';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Title = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  padding-right: 30px;

  margin-top: 20px;
`;

interface props {
  ATvalue?: string;
  Component?: any;
}

const AccordionTitle: React.FC<props> = ({ ATvalue, Component }) => {
  const [control, setcontrol] = useState<boolean>(true);
  return (
    <>
      <Title>
        <div className="text-base font-semibold py-4">{ATvalue}</div>
        <button onClick={() => setcontrol(!control)}>
          {control ? (
            <FontAwesomeIcon icon={faArrowUp} />
          ) : (
            <FontAwesomeIcon icon={faArrowDown} />
          )}
        </button>
      </Title>
      {control && <Component />}
    </>
  );
};

export default AccordionTitle;
