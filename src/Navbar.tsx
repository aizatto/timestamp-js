/**
 * https://reactstrap.github.io/components/navbar/
 */
import React, { useState } from 'react';
import {
  Collapse,
  Nav,
  Navbar as BootstrapNavbar,
  NavbarBrand,
  NavLink,
  NavItem,
  NavbarToggler,
} from 'reactstrap';

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <BootstrapNavbar color="dark" dark expand="md">
      <NavbarBrand href="https://www.aizatto.com">aizatto.com</NavbarBrand>
      <NavbarToggler onClick={() => setCollapsed(!collapsed)} />
      <Collapse isOpen={collapsed} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="https://www.aizatto.com/">aizatto.com</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://booktools.app/">Book Tools</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://www.deepthoughtapp.com/">Deep Thought</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/aizatto/timestamp-js">GitHub</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://www.linkedin.com/in/aizatto">LinkedIn</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </BootstrapNavbar>
  );
}
