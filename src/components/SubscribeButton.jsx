import { useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { httpRequest } from "../services/services";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonRemoveAlt1OutlinedIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";
import { Menu, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { SubscriptionListContext } from "../context/SubscriptionListContext";
import toast from "react-hot-toast";
import {
	DoSubscribeButton,
	MenuItem,
	ModalContent,
	SubscribeButtonSkeleton,
	SubscribedButton,
	UserActionButton,
	UserActionButtonWrapper,
} from "./SubscribeButtonStyledComponents";
import StyledModal from "./StyledModal";

const SubscribeButton = ({
	channelId,
	channelName,
	subscriptionId: subscriptionIdProp,
}) => {
	const { addChannel, removeChannel } = useContext(SubscriptionListContext);
	const { isLoggedIn } = useContext(AuthContext);

	const [subscriptionStatus, setSubscriptionStatus] = useState({
		isSubscribed: !!subscriptionIdProp,
		isLoading: subscriptionIdProp || !isLoggedIn ? false : true,
	});
	const [subscriptionId, setSubscriptionId] = useState(subscriptionIdProp);
	const [anchorEl, setAnchorEl] = useState(null);
	const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);

	const { isSubscribed, isLoading } = subscriptionStatus || {};
	const isOpenMenu = Boolean(anchorEl);

	const openMenu = (event) => {
		event.preventDefault();
		setAnchorEl(event.currentTarget);
	};

	const closeMenu = (event) => {
		event.preventDefault();
		setAnchorEl(null);
	};

	const closeConfirmationModal = (event) => {
		event.preventDefault();
		setIsOpenConfirmationModal(false);
	};

	const openConfirmationModal = (event) => {
		event.preventDefault();
		setIsOpenConfirmationModal(true);
		setAnchorEl(null);
	};

	const unsubscribeToChannel = async (event) => {
		event.preventDefault();
		try {
			const queryParams = {
				id: subscriptionId,
			};
			const res = await httpRequest({
				url: "/subscriptions",
				method: "DELETE",
				queryParams,
				returnEntireResponseWithStatusCode: true,
			});
			if (res.status === 204) {
				removeChannel(subscriptionId);
				setSubscriptionStatus((prevState) => ({
					...prevState,
					isSubscribed: false,
				}));
				setIsOpenConfirmationModal(false);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const subscribeToChannel = async (event) => {
		event.preventDefault();
		try {
			const queryParams = {
				part: "snippet",
			};
			const data = {
				snippet: {
					resourceId: {
						channelId,
					},
				},
			};
			const res = await httpRequest({
				url: "/subscriptions",
				method: "POST",
				queryParams,
				data,
			});
			if (res) {
				const { id: subscriptionId } = res;
				addChannel(subscriptionId);
				setSubscriptionStatus((prevState) => ({
					...prevState,
					isSubscribed: true,
				}));
				setAnchorEl(null);
				setIsOpenConfirmationModal(false);
			} else {
				toast.error("Something went wrong while subscribing to channel");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getSubscriptionStatus = useCallback(
		async ({ abortController }) => {
			try {
				const queryParams = {
					part: "snippet",
					forChannelId: channelId,
					mine: true,
				};
				const res = await httpRequest({
					url: "/subscriptions",
					queryParams,
					abortController,
				});
				if (res) {
					const { items = [] } = res;
					if (items.length > 0) {
						const { id = "" } = items[0];
						setSubscriptionId(id);
					}
					setSubscriptionStatus({
						isSubscribed: items.length > 0,
						isLoading: false,
					});
				}
			} catch (error) {
				console.error(error);
			}
		},
		[channelId]
	);

	useEffect(() => {
		const abortController = new AbortController();
		if (!subscriptionIdProp && isLoggedIn) {
			getSubscriptionStatus({ abortController });
		}
		return () => {
			abortController.abort();
		};
	}, [getSubscriptionStatus, isLoggedIn, subscriptionIdProp]);

	return isLoading ? (
		<SubscribeButtonSkeleton
			animation="wave"
			variant="circular"
			height={36}
			width={100}
		/>
	) : isSubscribed ? (
		<>
			<SubscribedButton endIcon={<KeyboardArrowDownIcon />} onClick={openMenu}>
				Subscribed
			</SubscribedButton>
			<Menu
				open={isOpenMenu}
				onClose={closeMenu}
				anchorEl={anchorEl}
				transformOrigin={{ horizontal: "left", vertical: "top" }}
				anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
			>
				<MenuItem onClick={openConfirmationModal}>
					<PersonRemoveAlt1OutlinedIcon /> Unsubscribe
				</MenuItem>
			</Menu>
			<StyledModal
				open={isOpenConfirmationModal}
				handleClose={closeConfirmationModal}
			>
				<ModalContent>
					<Typography variant="subtitle1">
						Unsubscribe from {channelName}?
					</Typography>
					<UserActionButtonWrapper>
						<UserActionButton onClick={closeConfirmationModal}>
							Cancel
						</UserActionButton>
						<UserActionButton
							$textColor="#3EA6FF"
							onClick={unsubscribeToChannel}
						>
							Unsubscribe
						</UserActionButton>
					</UserActionButtonWrapper>
				</ModalContent>
			</StyledModal>
		</>
	) : (
		<DoSubscribeButton
			variant="contained"
			onClick={subscribeToChannel}
			disabled={!isLoggedIn}
		>
			Subscribe
		</DoSubscribeButton>
	);
};

SubscribeButton.propTypes = {
	channelId: PropTypes.string,
	channelName: PropTypes.string,
	subscriptionId: PropTypes.string,
};

export default SubscribeButton;
