import { Box, Button, Grid, Typography, styled } from "@mui/material"
import { useState } from "react"

type ICounterNumberProps = {
	count: number
}

export const shouldForwardProp = <CustomProps extends Record<string, unknown>>(
	props: Array<keyof CustomProps>,
	prop: PropertyKey
): boolean => !props.includes(prop as string)

const CounterNumber = styled(Typography, {
	shouldForwardProp: (prop) =>
		shouldForwardProp<ICounterNumberProps>(["count"], prop),
})<ICounterNumberProps>(({ count }) => ({
	color: count % 3 === 0 ? "red" : "blue",
	fontSize: 300 + (count % 100),
}))

const CounterButton = styled(Button, {
	shouldForwardProp: (prop) =>
		shouldForwardProp<ICounterNumberProps>(["count"], prop),
})<ICounterNumberProps>(({ count }) => ({
	color: count % 3 === 0 ? "white" : "black",
	backgroundColor: count % 3 === 0 ? "purple" : "orange",
	"&:hover": {
		backgroundColor: count % 3 === 0 ? "lightpink" : "LightGoldenRodYellow",
	},
}))

const FunCounter = () => {
	const [count, setCount] = useState<number>(0)
	const [resetText, setResetText] = useState<string>("Reset Me")

	const handleCounterClick = () => {
		setCount(count + 1)
	}

	const handleAddTen = () => {
		setCount(count + 10)
	}

	const handleReset = () => {
		setCount(0)
	}

	const handleChangeResetText = (text: string) => {
		setResetText(text)
	}

	return (
		<Grid container component={Box} sx={{ height: "100%", width: "100%" }}>
			<Grid
				container
				item
				justifyContent="center"
				alignItems="center"
				xs={12}
				columnSpacing={2}>
				<Grid item>
					<CounterButton
						onClick={handleCounterClick}
						variant={"contained"}
						count={count}>
						{count === 69 ? "Nice" : "Add me"}
					</CounterButton>
				</Grid>
				<Grid item>
					<CounterButton
						onClick={handleReset}
						variant={"contained"}
						count={count}
						onMouseOver={() => handleChangeResetText("Please don't")}
						onMouseLeave={() => handleChangeResetText("Reset Me")}>
						{resetText}
					</CounterButton>
				</Grid>
				<Grid item>
					<CounterButton
						onClick={handleAddTen}
						variant={"contained"}
						count={count}>
						{count === 69 ? "Nice" : "Add 10"}
					</CounterButton>
				</Grid>
			</Grid>
			<Grid container item justifyContent="center" alignItems="center" xs={12}>
				{count === 69 ? (
					<CounterNumber count={count}>{count}</CounterNumber>
				) : null}
				<CounterNumber count={count}>{count}</CounterNumber>
				{count === 69 ? (
					<CounterNumber count={count}>{count}</CounterNumber>
				) : null}
			</Grid>
			<Grid
				container
				item
				justifyContent="center"
				alignItems="center"
				xs={12}
				columnSpacing={2}>
				<Grid item>
					<CounterButton
						onClick={handleCounterClick}
						variant={"contained"}
						count={count}>
						{count === 69 ? "Nice" : "Add me"}
					</CounterButton>
				</Grid>
				<Grid item>
					<CounterButton
						onClick={handleReset}
						variant={"contained"}
						count={count}
						onMouseOver={() => handleChangeResetText("Please don't")}
						onMouseLeave={() => handleChangeResetText("Reset Me")}>
						{resetText}
					</CounterButton>
				</Grid>
				<Grid item>
					<CounterButton
						onClick={handleAddTen}
						variant={"contained"}
						count={count}>
						{count === 69 ? "Nice" : "Add 10"}
					</CounterButton>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default FunCounter
