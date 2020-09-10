import React from "react";

export default function Home() {
	return (
		<div className="home">
			<p>
				Dungeons and Dragons is a fantasy tabletop role-playing game
				that's been around since 1974. It's one of my all-time favorite
				games. I love gathering a group of friends and create this
				amazing imaginary adventure together.
			</p>
			<p>
				Many people get discouraged at the idea of playing this
				fantastic game because it honestly has one of the steepest
				learning curves with just creating a character. You have to use
				math and there's a extensive time commitment to learning the
				rules.
			</p>
			<p>
				With all that in mind, I made this this web-app to streamline
				the most difficult part of Dungeons and Dragons for newer
				players. And I love this game with all my heart.
			</p>
			<p>
				This version uses the 5th edition SRD. This current version does
				not have multi-classing as an option.
			</p>

			<footer>
				<p>
					Art assets are courtesy of{" "}
					<a href="https://www.melissapalacios.com/" target="blank">
						Melissa Palacios
					</a>
				</p>
				<p>
					<a
						href="https://www.behance.net/gallery/100402839/RPG-Weapon-and-Armor-05?tracking_source=project_owner_other_projects"
						target="blank"
					>
						Icons
					</a>{" "}
					from Alexander Zahorulko{" "}
				</p>
			</footer>
		</div>
	);
}
