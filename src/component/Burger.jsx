import React from 'react';
import { bool, func } from 'prop-types';
import styled from 'styled-components';

import '../sass/header/burger.scss'

const StyledBurger = styled.button`
  div {
    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger aria-label={"Menu button"} open={open} onClick={() => setOpen(!open)} className="burger">
      <div /><div /><div />
    </StyledBurger>
  )
}
Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};

export default Burger;