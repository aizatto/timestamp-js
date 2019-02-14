/**
 * https://reactstrap.github.io/components/navbar/
 */
import React, { Component } from 'react';
import {
  Collapse,
  Nav,
  Navbar as BootstrapNavbar,
  NavbarBrand,
  NavLink,
  NavItem,
  NavbarToggler,
} from 'reactstrap';

class Navbar extends Component {

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <BootstrapNavbar color="dark" dark expand="md">
        <NavbarBrand href="https://www.aizatto.com">aizatto.com</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="https://www.aizatto.com/">aizatto.com</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.deepthoughtapp.com/">Deep Thought</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/aizatto/timestamp-js">GitHub</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.linkedin.com/in/aizatto">Linkedin</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </BootstrapNavbar>
    );
  }
}

export default Navbar;
