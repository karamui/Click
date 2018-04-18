import React from "react";
import "./Header.css";

const Header = props => (
	<div className="header">
		<h1>Clicky Corgi</h1>
		<div className="spacer"></div>
		<h3>Instructions</h3>
		<p>Click on any corgi to begin the game. Click on a new corgi each time to earn points, but be careful! Clicking on the same corgi twice will end the game.</p>

		<div className="spacer"></div>
	  	<h2 className="emphasis">{props.message}</h2>

	  	<div className="spacer"></div>
	  	<h4><b>Current Score:</b> {props.score}</h4>
	  	<h4><b>Top Score:</b> {props.topscore}</h4>
  	</div>
);

export default Header;