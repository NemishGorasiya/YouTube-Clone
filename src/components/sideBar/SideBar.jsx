import PropTypes from "prop-types";
import { Fragment, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { AuthContext } from "../../context/AuthContext";
import { SideBarLinks } from "../../utils/constant";
import SignInButton from "../SignInButton";
import SubscriptionList from "./SubscriptionList";
import {
	Drawer,
	DrawerHeader,
	ListItem,
	ListItemButton,
	ListItemIcon,
	NavBarList,
	NavBarListTitle,
	NavLinkTypography,
	SideBarLinksWrapper,
	SignInSection,
	StyledNavLink,
} from "./SideBarStyledComponents";

const SideBar = ({ open, toggleDrawer }) => {
	const { isLoggedIn } = useContext(AuthContext);

	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	return (
		<Drawer
			open={open}
			variant={isLargeScreen ? "permanent" : "temporary"}
			onClose={() => {
				toggleDrawer(false);
			}}
		>
			<DrawerHeader />
			<SideBarLinksWrapper>
				{SideBarLinks.map(
					(sideBarSection, idx) =>
						(!sideBarSection.isProtected || isLoggedIn) && (
							<Fragment key={idx}>
								<NavBarList $open={open}>
									<NavBarListTitle $open={open}>
										{sideBarSection.title}
										{sideBarSection.titleIcon}
									</NavBarListTitle>
									{sideBarSection.links.map((link, idx) => (
										<StyledNavLink to={link.link} key={idx}>
											<ListItem key={idx}>
												<ListItemButton $open={open}>
													<ListItemIcon>{link.icon}</ListItemIcon>
													<ListItemText>
														<NavLinkTypography
															variant="body2"
															noWrap
															$open={open}
														>
															{link.label}
														</NavLinkTypography>
													</ListItemText>
												</ListItemButton>
											</ListItem>
										</StyledNavLink>
									))}
								</NavBarList>
								<Divider />
							</Fragment>
						)
				)}
				{isLoggedIn ? (
					<SubscriptionList open={open} />
				) : (
					open && (
						<>
							<SignInSection>
								<Typography variant="body1">
									Sign in to like videos, comment, and subscribe.
								</Typography>
								<SignInButton />
							</SignInSection>
							<Divider />
						</>
					)
				)}
			</SideBarLinksWrapper>
		</Drawer>
	);
};

SideBar.propTypes = {
	open: PropTypes.bool,
	toggleDrawer: PropTypes.func,
};

export default SideBar;
