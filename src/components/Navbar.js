import React, { useEffect, useState } from 'react';
import logo from '../img/brand/hackertunity_logo.png';
import { Link } from 'gatsby';
import SubMenu from './Navbar/SubMenu';

import { graphql, useStaticQuery } from 'gatsby';

const MenuLinksQuery = graphql`
	query MenuLinksQuery {
		site {
			siteMetadata {
				menuLinks {
					name
					path
					topLink
					subMenu {
						name
						path
					}
				}
			}
		}
	}
`;

const NavBar = () => {
	// NAV LINK DATA
	const {
		site: {
			siteMetadata: { menuLinks },
		},
	} = useStaticQuery(MenuLinksQuery);

	// console.log('>> TEST_MENU_LINKS_QUERY_DATA:', menuLinks);

	// COMPONENT STATE
	const [active, setActive] = useState(false);
	const [navBarActiveClass, setNavBarActiveClass] = useState('');

	const toggleHamburger = () => {
		setActive(!active);
	};

	useEffect(() => {
		active ? setNavBarActiveClass('is-active') : setNavBarActiveClass('');
	});

	// COMPONENT RENDER
	return (
		<nav
			className="navbar is-transparent"
			role="navigation"
			aria-label="main-navigation"
		>
			<div className="container">
				<div className="navbar-brand">
					<Link to="/" className="navbar-item" title="Logo">
						<img className="logo" src={logo} alt="Hackertunity inc." />
						Hackertunity, Inc.
					</Link>
					{/* Hamburger menu */}
					<div
						className={`navbar-burger burger ${navBarActiveClass}`}
						data-target="navMenu"
						onClick={() => toggleHamburger()}
					>
						<span />
						<span />
						<span />
					</div>
				</div>
				<div id="navMenu" className={`navbar-menu ${navBarActiveClass}`}>
					<div className="navbar-start has-text-centered">
						<ul>
							{menuLinks.map((menu, i) => (
								<SubMenu menu={menu} key={i} />
							))}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
