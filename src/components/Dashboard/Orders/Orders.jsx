import {
	Box,
	Flex,
	Text,
	Divider,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { OrderContext } from "../../../context/OrderProvider";
import { WatchlistContext } from "../../../context/WatchlistProvider"; //

const Orders = () => {
	const { orders } = useContext(OrderContext);
	const [errorMessage, setErrorMessage] = useState("");
	const { setWatchlist, addToWatchlist } = useContext(WatchlistContext);

	function formatDate(isoString) {
		const date = new Date(isoString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");

		return `${year}-${month}-${day}`;
	}
	const addStock = (symbol) => {
		addToWatchlist(symbol)
			.then((data) => {
				console.log("data after adding stocks", data.stocks);

				if (data.message === "No watchlist found for this user") {
					setWatchlist([]);
				} else {
					setWatchlist(data.stocks);
				}
			})
			.catch((error) => {
				if (error.status === 400) {
					setErrorMessage("Invalid Credentials");
				} else {
					setErrorMessage(
						error.message || "An unexpected error occurred."
					);
					if (errorMessage) {
						console.log(errorMessage);
					}
				}
			});
	};

	return (
		<Box
			width={{
				base: "100%",
				sm: "100%",
				md: "100%",
				lg: "25%",
				xl: "25%",
			}}
			borderColor={"dashboardPrimary"}
			borderWidth={"2px"}
			borderRadius={"10px"}
		>
			<Flex bg={"dashboardSecondary"} borderTopRadius={"10px"}>
				<Box width={"50%"}>
					<Text
						m={0}
						width={"100%"}
						height={"100%"}
						pl={3}
						pt={2}
						pb={1}
						fontWeight={"bold"}
						fontSize={"18px"}
					>
						{" "}
						Recent Orders
					</Text>
				</Box>
			</Flex>
			<Divider p={0} m={0} />
			<Box
				bg="white"
				w="100%"
				h="475px"
				overflowY="auto"
				borderRadius={"10px"}
				border={"2x"}
				borderColor={"#F1D7D7"}
			>
				<Table
					sx={{
						"tbody tr:nth-of-type(odd)": {
							bg: "dashboardAccentColor",
						},
					}}
				>
					<Thead position="sticky" top={0} zIndex={1}>
						<Tr>
							<Th p={0} textAlign={"center"} pb={2} pl={2}>
								Symbol
							</Th>
							<Th p={0} textAlign={"center"} pb={2}>
								Type
							</Th>
							<Th p={0} textAlign={"center"} pb={2}>
								Quantity
							</Th>
							<Th p={0} textAlign={"center"} pb={2}>
								Price
							</Th>
							<Th p={0} textAlign={"center"} pb={2}>
								Status
							</Th>
							<Th p={0} textAlign={"center"} pb={2}>
								Date
							</Th>
							<Th p={0} textAlign={"center"} pb={2}></Th>
						</Tr>
					</Thead>
					{orders.length === 0 ? (
						<Flex
							height={"400"}
							width={"400%"}
							justifyContent={"center"}
							alignItems={"center"}
						>
							No Order yet
						</Flex>
					) : (
						<Tbody>
							{orders.map((o, index) => (
								<Tr key={index}>
									<Td
										p={1}
										textAlign={"center"}
										color={"blue"}
									>
										{o.stockSymbol}
									</Td>
									<Td p={1} textAlign={"center"}>
										{o.orderType}/{o.tradeType}
									</Td>
									<Td p={1} textAlign={"center"}>
										{o.quantity}
									</Td>
									<Td p={1} textAlign={"center"}>
										${o.price.toFixed(2)}
									</Td>
									<Td p={1} textAlign={"center"}>
										{o.status}
									</Td>
									<Td p={1} textAlign={"center"}>
										{formatDate(o.createdAt)}
									</Td>
									<Td p={1} textAlign={"center"}>
										<IoIosAddCircleOutline
											size={"18"}
											onClick={() => {
												addStock(o.stockSymbol);
											}}
										/>
									</Td>
								</Tr>
							))}
						</Tbody>
					)}
				</Table>
			</Box>
		</Box>
	);
};
export default Orders;
